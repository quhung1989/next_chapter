import React, { Component } from 'react';
import Button from '../../UI/Button';
import classes from './AddComment.module.css';
import Input from '../../UI/Input';
import { inputChanger } from '../../../utils/inputChanger';

class AddComment extends Component {
	state = {
		comment: {
			eleType: 'input',
			eleConfig: {
				type: 'text',
				placeholder: 'Comment',
			},
			value: '',
			validation: {
				required: true,
				type: 'general',
			},
			valid: false,
		}
	}

	render() {
		let comment = this.state.comment;
		let inputs;

		if (this.props.username) {
			inputs = (
				<form>
					<div className={classes.AddCommentTitle}>Add a Comment!</div>
					<Input
						eleType={comment.eleType}
						value={comment.value}
						invalid={!comment.valid}
						changed={(event) => {
							this.setState({ comment: inputChanger(event, 'comment', this.state, comment.validation.type) });
						}}
						eleConfig={comment.eleConfig}
					/>
					<Button clicked={(() => this.addComment())} type={'submit'}>
						Submit
          </Button>
				</form>
			)
		} else {
			inputs = (
				<div className={classes.AddCommentTitle}>Please log in to enter a comment!</div>
			)
		}

		return (
			<div className={classes.AddComment}>
				{inputs}
			</div>
		)
	}

	addComment = () => {
		if (this.props.username) {
			const comment = this.state.comment;
			let newState = JSON.parse(JSON.stringify(this.state.comment));
			newState.value = '';
			this.setState({ comment: newState });
			this.props.addComment(comment);
		}
	}
}

export default AddComment;