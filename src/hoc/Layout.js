import React, { Component } from 'react';
import Auxiliary from '../hoc/Auxiliary'
import Toolbar from '../components/Navigation/Toolbar';
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer';
import LoginRegister from '../components/User/LoginRegister';
import Modal from '../components/UI/Modal';
import Events from '../containers/Events/Events';
import NewEvent from '../components/Event/NewEvent';
import { Route, Switch, withRouter } from 'react-router-dom';
import FullEvent from '../containers/Events/FullEvent';
import Register from '../components/User/Register';
import ForgotPassword from '../components/User/ForgotPassword';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';
import UserProfile from '../containers/User/UserProfile';
import UserSettings from '../components/User/UserSettings';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	}

	logInClicked = () => {
		if (!this.props.username) {
			this.props.toggleModal()
			this.props.toggleShowLogIn()
		}
	}

	profileClickedHandler = () => {
		this.props.history.push(`/users/${this.props.username}`)
		if (this.props.showDrawer) {
			this.props.toggleDrawer()
		}
	}

	registerClickedHandler = (event) => {
		event.preventDefault();
		this.toggleDrawerModal();
		this.props.history.push('/register');
	}

	logoRoute = () => {
		this.props.history.push('/');
	}

	toggleDrawerModal = () => {
		if (this.props.showModal) {
			this.props.toggleModal()
		} else {
			this.props.toggleDrawer()
		}
	}

	render() {
		// eslint-disable-next-line
		let loginOrForgot;
		this.props.showLogIn
			?
			loginOrForgot = <LoginRegister
				forgotPasswordClicked={this.props.toggleShowLogIn}
				registerClicked={this.registerClickedHandler}
				toggleDrawerModal={this.toggleDrawerModal} />
			:
			loginOrForgot = <ForgotPassword forgotPasswordClicked={this.props.toggleShowLogIn} />

		return (
			<Auxiliary>
				<Toolbar
					username={this.props.username}
					toggleShowLogIn={this.props.toggleShowLogIn}
					toggleDrawer={this.props.toggleDrawer}
					toggleModal={this.props.toggleModal}
					profileClicked={this.profileClickedHandler}
					logoClicked={this.logoRoute} />
				<Modal
					show={this.props.showModal}
					modalClose={this.props.toggleModal}
					update={this.props.showLogIn}
					cancelClicked={this.props.toggleShowLogIn}
				>
					{
						this.props.showLogIn
							?
							<LoginRegister
								toggleShowLogIn={this.props.toggleShowLogIn}
								registerClicked={this.registerClickedHandler} />
							:
							<ForgotPassword
								toggleShowLogIn={this.props.toggleShowLogIn}
								username={this.props.username} />
					}
				</Modal>
				<SideDrawer
					showLogIn={this.props.showLogIn}
					registerClicked={this.state.registerClickedHandler}
					toggleDrawer={this.props.toggleDrawer}
					show={this.props.showDrawer}
					toggleShowLogIn={this.props.toggleShowLogIn}
					username={this.props.username}
					profileClicked={this.profileClickedHandler}
				/>
				<main>
					{this.props.children}
				</main>
				<Switch>
					<Route path='/' exact component={Events} />
					<Route path='/new-event' exact component={NewEvent} />
					<Route path='/events/:id' component={FullEvent} />
					<Route path='/register' exact component={Register} />

					<Route path='/users/:username' exact component={UserProfile} />

					<Route
						path='/users/:username/settings' exact
						render={props => <UserSettings {...props} username={this.props.username} />}
					/>
				</Switch>
			</Auxiliary >
		);
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.auth.username,
		showModal: state.misc.showModal,
		isAuthenticated: state.auth.isAuthenticated,
		showDrawer: state.misc.showDrawer,
		showLogIn: state.misc.showLogIn,

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleModal: () => {
			dispatch({
				type: actionTypes.TOGGLE_MODAL,
			})
		},
		toggleDrawer: () => {
			dispatch({
				type: actionTypes.TOGGLE_DRAWER,
			})
		},
		toggleShowLogIn: () => {
			dispatch({
				type: actionTypes.TOGGLE_SHOW_LOGIN,
			})
		},
		loggedOut: () => {
			dispatch({
				type: actionTypes.LOGGED_OUT,
			})
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));