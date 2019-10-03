const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
// const passport = require('passport')
const user = require('./usersController')

// register
router.post('/register', user.registerUser);

// log in route
router.post('/login', user.authUser)

// get profile image
router.get('/get-profile-image/:user', user.getProfileImg);

// get user info
router.get('/get-user-info/:user', user.getUserInfo)

// get user data
router.get('/get-user-data', user.getUserData)

// post user data
router.post('/post-user-data', user.postUserData)

// get user settings
router.get('/get-user-settings/:user', user.getUserSettings)

// get user settings
router.get('/get-user-image/:user', user.getUserImage)

// post new profile image
router.post(
	'/upload-image',
	upload.single('image'),
	// passport.authenticate('jwt',{ session: false }),
	user.postNewImg
)

// reset password
router.post('/reset-password', user.resetPassword)

module.exports = router;
