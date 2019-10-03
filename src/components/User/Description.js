import React, { Component } from 'react';
import Button from '../../components/UI/Button';
import Input from '../UI/Input'
import { inputChanger } from '../../utils/inputChanger'
import axios from 'axios'
import classes from './Description.module.css'

class Description extends Component {
	state = {
		profile: {
			description: {
				eleType: 'textarea',
				eleConfig: {
					placeholder: 'Description'
				},
				initValue: '',
				value: '',
				validation: {
					required: true,
					type: 'general'
				},
				valid: false,
			},
		},
		editing: false,
	}

	componentDidMount() {
		if (this.props.username) {
			this.getUserDescription(this.props.username)
		}
	}

	getUserDescription = (username) => {
		let profileState = { ...this.state.profile }

		axios.get('/api/users/get-user-data', {
			params: {
				username: username,
				requests: ['description']
			}
		})
			.then(res => {
				profileState.description.value = res.data.description
				profileState.description.initValue = res.data.description
				this.setState({ profile: profileState })
			})
			.catch(err => console.error(err))
	}

	toggleEdit = () => {
		const editingState = this.state.editing
		const profileState = { ...this.state.profile }
		profileState.description.value = profileState.description.initValue
		this.setState({
			profile: profileState,
			editing: !editingState
		})
	}

	submitEdit = () => {
		const data = {
			username: this.props.username,
			data: [
				{
					key: 'description',
					value: this.state.profile.description.value
				}
			]
		}

		axios.post('/api/users/post-user-data', data)
			.then(res => this.getUserDescription(this.props.username))
			.then(() => this.setState({ editing: false }))
			.catch(err => {
				console.error(err)
			})
	}

	render() {
		let buttons
		let content
		let description
		let descriptionState = this.state.profile.description

		if (this.state.editing) {
			description = (
				<Input
					classProp={classes.DescriptionInput}
					eleType={'textarea'}
					eleConfig={descriptionState.eleConfig}
					invalid={!descriptionState.valid}
					value={descriptionState.value}
					changed={event => {
						this.setState({
							profile: inputChanger(event, 'description', this.state.profile, descriptionState.validation.type)
						})
					}}
				/>
			)
			buttons = (
				<div>
					<Button clicked={this.submitEdit}>
						Edit
					</Button>
					<Button clicked={this.toggleEdit}>
						Cancel
					</Button>
				</div>
			)
		} else {
			description = (
				<div>
					{descriptionState.value}
				</div>
			)
			buttons = (
				<div>
					<Button clicked={this.toggleEdit}>
						Edit
					</Button>
				</div>
			)
		}

		content = (
			<div>
				<div className={classes.Description}>
					<div className={classes.DescriptionTitle}>Description: </div>
					{description}
				</div>
				{buttons}
			</div>
		)

		return (
			<div>
				{content}
			</div>
		);
	}
}

export default Description;