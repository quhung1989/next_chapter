import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => {
  let onClickProp
  if (props.showDrawer) {
    onClickProp=props.toggleDrawer
  } else {
    if (props.onClick) {
      onClickProp=props.onClick
    }
  }
  
  return (
    <NavLink
      to={props.link}
      exact={props.exact}
      className={classes.NavLink}
      onClick={onClickProp}
    >
      {props.children}
    </NavLink>
  )
}

export default navigationItem;
