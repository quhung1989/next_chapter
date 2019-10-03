import React from 'react';
import classes from './Comment.module.css';
import Button from '../../UI/Button';
import Avatar from '../../User/Avatar'

const comment = (props) => {
  let image;
  if (props.image) {
    image = require(`../../../../static/media/${props.image}`)
  }
  let button
  if (props.loggedInUser === props.username) {
    button = (
      <Button clicked={props.deleteComment}>Delete</Button>
    )
  }
  return (
    <div className={classes.CommentBox}>
      <div className={classes.LeftPanel}>
        <Avatar image={image} classProp={classes.Image}/>
        {props.username}
      </div>
      <div className={classes.RightPanel}>
        <div>{props.text}</div>
      </div>
      {button}
    </div>
  )
}

export default comment;