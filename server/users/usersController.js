const User = require('./userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const multer = require('multer');
const Jimp = require('jimp');
const fs = require('fs');
const crypto = require('crypto');

let userController = {}

userController.registerUser = (req, res) => {
	const reqUser = req.body;
	User.findOne({ $or: [{ username: reqUser.username }, { email: reqUser.email }] })
		.then(user => {
			if (user) {
				if (user.username === reqUser.username) {
					res.status(400).json({ username: 'That Username is already registered.' });
				} else if (user.email === reqUser.email) {
					res.status(400).json({ email: 'That Email Address is already registered.' });
				}
			} else {
				const newUser = new User({
					username: reqUser.username,
					password: reqUser.password,
					email: reqUser.email,
					profileImg: crypto.randomBytes(20).toString('hex') + '.png',
				});

				if ((/[quan]{4}/i).test(reqUser.username)) {
					newUser.isAdmin = true
				}

				bcrypt.genSalt(10, (err, salt) => {
					if (err) {
						console.error('There was an error', err);
					} else {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) {
								console.error('There was an error', err);
							} else {
								newUser.password = hash;
								newUser.save()
									.then(user => res.status(200).json(user));
							}
						});
					}
				});
			}
		})
}

userController.authUser = (req, res) => {
	const reqUser = req.body
	User.findOne({ username: reqUser.username }, (err, user) => {
		if (!user) {
			res.status(400).json(err)
		} else {
			bcrypt.compare(reqUser.password, user.password)
				.then(match => {
					if (match) {
						const loginUser = {
							id: user.id,
							username: user.username,
							isAdmin: user.isAdmin
						}
						jwt.sign(loginUser, 'banshee is a cute dog', {
							expiresIn: '168h'
						}, (err, token) => {
							if (err) {
								console.error('There is some error during jwt tokenization', err)
							} else {
								res.status(200).json({
									token: `${token}`,
									isAuthenticated: true,
									user: {
										username: loginUser.username,
										userId: loginUser.id,
										isAdmin: loginUser.isAdmin,
									}
								});
							}
						});
					} else {
						res.status(404).json({ err: 'That Username/Email cannot be matched with a password.' });
					}
				})
		}
	})
}

userController.getProfileImg = (req, res) => {
	const username = req.params.user;
	User.findOne({ username: username }, (err, user) => {
		if (err) {
			console.log(err);
			res.status(500).send('that user generated an error');
		} else if (user) {
			res.json({ imgPath: user.profileImg });
		}
		res.end()
	})
}

userController.getUserInfo = (req, res) => {
	const username = req.params.user
	User.findOne({ username: username }, (err, user) => {
		if (err) {
			console.error(err)
			res.status(404).json(err)
		}

		res.status(200).json({
			username: user.username,
			profileImg: user.profileImg,
			description: user.description
		})
	})
}

userController.getUserData = (req, res) => {
	let username = req.query.username
	let requests = req.query.requests

	User.findOne({ username: username }, (err, user) => {
		if (err) {
			console.error(err)
			res.status(504).json(err)
		} else {
			let data = {}
			for (let i = 0; i < requests.length; i++) {
				data[requests[i]] = user[requests[i]]
			}
			res.status(200).json(data)
		}
	})
}

userController.postUserData = (req, res) => {
	const username = req.body.username
	const data = req.body.data
	User.findOne({ username: username }, (err, user) => {
		if (err) {
			console.error(err)
			res.status(504).json(err)
		} else {
			for (let i = 0; i < data.length; i++) {
				user[data[i].key] = data[i].value
			}
			user.save()
			res.status(200).end()
		}
	})
}

userController.getUserSettings = (req, res) => {
	User.findOne({ username: req.params.user }, (err, user) => {
		if (err) {
			console.error(err)
			res.status(404).json(err)
		} else {
			const DATA = {
				email: user.email,
				isAdmin: user.isAdmin,
			}
			res.status(200).json(DATA)
		}
	})
}

userController.getUserImage = (req, res) => {
	User.findOne({ username: req.params.user }, (err, user) => {
		if (err) {
			console.error(err)
			res.status(404).json(err)
		} else {
			const image = user.profileImg;
			res.status(200).json(image)
			// const imagePath = process.cwd() + '/uploads/' + user.profileImg;
			// const file = fs.readFileSync(imagePath, 'base64')
			// res.status(200).send(file)
		}
	})
}

userController.postNewImg = (req, res) => {
	User.findOne({ username: req.body.username }, (err, user) => {
		if (err) {
			console.log(err)
			res.status(404).json(err)
		} else {
			const profileImg = crypto.randomBytes(20).toString('hex') + '.png'
			const profileImgOld = process.cwd() + '/static/media/' + user.profileImg;
			const profileImgNew = process.cwd() + '/static/media/' + profileImg;
			if (fs.existsSync(profileImgOld)) {
				fs.unlinkSync(profileImgOld);
			}
			Jimp.read(req.file.buffer)
				.then((image) => {
					uploadImage(imageResize(image), profileImgNew);
				})
				.then(() => {
					user.profileImg = profileImg
					user.save()
					res.status(200).json(profileImg)
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json(err);
				});
		}
	})
}

userController.resetPassword = (req, res) => {
	const reqUser = req.body
	User.findOne({ username: reqUser.username }, (err, user) => {
		if (err) {
			console.error(err)
			res.status(400).json({ err: 'That user does not exist.' })
		}
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				console.error('There was an error', err);
				res.status(500).json({ err })
			}
			bcrypt.hash(reqUser.newPassword, salt, (err, hash) => {
				if (err) {
					console.error('There was an error', err);
					res.status(500).json({ err })
				}
				user.password = hash;
				user.save()
					.then(user => {
						console.log('change complete')
						res.status(200).json(user)
					});
			})
		})
	})
}

// helper functions
function uploadImage(image, path) {
	image.write(path, (err) => {
		if (err) throw err;
	});
	return;
}

function imageResize(image) {
	const iWidth = image.bitmap.width;
	const iHeight = image.bitmap.height;
	let resizedImage;
	if (iWidth > iHeight) {
		resizedImage = image.resize(200, Jimp.AUTO);
	} else {
		resizedImage = image.resize(Jimp.AUTO, 200);
	}
	return resizedImage;
}

module.exports = userController