import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary'
import LoginRegister from '../../User/LoginRegister'
import ForgotPassword from '../../User/ForgotPassword'

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }  
  let loginOrForgot
  if (!props.username) {
    props.showLogIn ?
    loginOrForgot = <LoginRegister
      showDrawer={props.show}
      toggleShowLogIn={props.toggleShowLogIn}
      registerClicked={props.registerClicked}
    />
      :
    loginOrForgot = <ForgotPassword toggleShowLogIn={props.toggleShowLogIn}/>
  } 

  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.toggleDrawer}/>
      <div className={attachedClasses.join(' ')}>
        <Logo height="8%" onClick={props.toggleDrawer}/>
        <nav>
          <NavigationItems
            loginRegisterClicked={props.loginRegisterClicked}
            toggleDrawer={props.toggleDrawer}
            showDrawer={props.show}
            username={props.username}
            profileClicked={props.profileClicked}/>
        </nav>
        {loginOrForgot}
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;