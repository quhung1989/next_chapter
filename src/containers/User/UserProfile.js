import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import classes from './UserProfile.module.css';
import Avatar from '../../components/User/Avatar'
import Input from '../../components/UI/Input'
import Loading from '../../components/UI/Loading'
import Description from '../../components/User/Description'

class UserProfile extends Component {
	state = {
		profileImg: undefined,
		selectedFile: null,
		username: undefined,
		description: undefined,
		loading: true,
		image: null,
	}

	componentDidMount() {
		const pathname = this.props.location.pathname
		const username = pathname.match(/(?<=\/users\/)([a-zA-Z0-9]*)/g)
		this.getUserInfo(username)
	}

	getUserInfo = (username) => {
		axios.get(`/api/users/get-user-info/${username}`)
			.then(res => {
				this.setState({
					loading: true,
					username: res.data.username,
					profileImg: res.data.profileImg,
					description: res.data.description
				})
			})
			.then(() => this.setState({ loading: false }))
			.catch(err => {
				console.log(err)
			})
	}

	getUserImage = (username) => {
		axios.get(`/api/users/get-user-image/${username}`)
			.then(res => {
				this.setState({
					profileImg: res.data
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	fileSelectedHandler = (event) => {
		event.preventDefault()
		const selectedFile = event.target.files[0]

		this.setState({
			loading: true,
			profileImg: undefined,
		})

		if (selectedFile) {
			const formData = new FormData();
			formData.append('image', selectedFile);
			formData.append('username', this.props.username);

			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			}

			axios.post('/api/users/upload-image', formData, config)
				.then((res) => {
					this.setState({ profileImg: res.data }, () => {
						this.setState({ loading: false })
					})
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	editDescriptionHandler = () => {

	}

	render() {
		let username
		let profileImg
		let uploadImage
		let imagePath
		let description

		if (this.state.profileImg) {
			imagePath = this.state.profileImg
			description = (
				<Description
					username={this.state.username}
					editDescriptionHandler={this.editDescriptionHandler}
				/>
			)
		}

		const chooseImage = (
			<div className={classes.ChooseImage}>
				<label htmlFor='imageupload'>
					<div>
						Choose an Image
			 </div>
				</label>
				<Input
					id='imageupload'
					eleType='image'
					onChange={this.fileSelectedHandler}
					classProp={classes.InputImage}
				/>
			</div>
		)

		if (this.state.loading) {
			profileImg = <Loading />
		} else {
			let image = require(`../../../static/media/${imagePath}`)
			if (image) {
				profileImg = <Avatar image={image} classProp={classes.ProfileImage} />
			}

		}

		uploadImage = (
			<div className={classes.ImageInfo}>
				{profileImg}
				{chooseImage}
			</div>
		)

		const userInfo = (
			<div className={classes.UserInfo}>
				<div>
					{username}
				</div>
				<div>
					{description}
				</div>
			</div>
		)

		return (
			<div className={classes.Container}>
				<div className={classes.UserCard}>
					{uploadImage}
					{userInfo}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.auth.username,
		isAdmin: state.auth.isAdmin
	};
};

export default connect(mapStateToProps)(UserProfile);