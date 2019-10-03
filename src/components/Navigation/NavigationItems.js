import React, { Component } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem';
import DropDown from '../UI/DropDown'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index'

class NavigationItems extends Component {

  state = {
    showDropDown: false,
    account: {
      profile: {
        title: 'My Profile',
        props: {
          link: `/users/${this.props.username}`,
        }
      },
      settings: {
        title: 'Settings',
        props: {
          link: `/users/${this.props.username}/settings`,
        }
      },
      logout: {
        title: 'Logout',
        props: {
          link: '/',
          onClick: this.props.logOut,
        }
      }
    }
  }

  render() {
    let logInOrUser;
    let logInOrUserClass
  
    this.props.showDrawer
    ?
    logInOrUserClass = classes.SideDrawer
    :
    logInOrUserClass = classes.LoginRegister

    if (this.props.username) {
      logInOrUser = (
        <DropDown
          clicked={this.toggleDropDown}
          show={this.props.dropDown}
          options={this.state.account}
          username={this.props.username}
          showDrawer={this.props.showDrawer}
          onClickFunc={this.onClickFunc}
          toggleDropDown={this.props.toggleDropDown}/>
      )
    } else if (!this.props.showDrawer) {
      logInOrUser = (
        <div
          className={logInOrUserClass}
          onClick={this.props.toggleModal}>
          Log In/Register
        </div>
      )
    }
    
    return (
    <ul className={classes.NavigationItems}>
      <li className={classes.NavigationItem}>
      <NavigationItem link='/' exact 
        toggleDrawer={this.props.toggleDrawer} 
        showDrawer={this.props.showDrawer}
      >
        Events
      </NavigationItem>
      </li>
      <li className={classes.NavigationItem}>
      <NavigationItem link='/new-event' exact 
        toggleDrawer={this.props.toggleDrawer}
        showDrawer={this.props.showDrawer}
      >
        New Event
      </NavigationItem>
      </li>
      {logInOrUser}
    </ul>
    )
  }

  onClickFunc = (func) => {
    this.props.toggleDropDown()
    this.props.toggleDrawer()
    if (func) {
      func()
    }
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    showModal: state.misc.showModal,
    isAuthenticated: state.auth.isAuthenticated,
    showDrawer: state.misc.showDrawer,
    showLogIn: state.misc.showLogIn,
    dropDown: state.misc.dropDown,
    user: state.auth.user,
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
    toggleDropDown: () => {
      dispatch({
        type: actionTypes.TOGGLE_SHOW_DROPDOWN,
      })
    },
    loggedOut: () => {
      dispatch({
        type: actionTypes.LOGGED_OUT,
      })
    },
    logOut: () => {
      dispatch(actions.logOut())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems)
