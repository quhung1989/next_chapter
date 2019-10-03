import React from 'react';
import classes from './Avatar.module.css'

const avatar = (props) => {
  let image
  let imageClass = []

  imageClass.push(props.classProp)

  if (props.image) {
    image = props.image
    if (props.small) {
      imageClass.push(classes.SmallAvatar)
    } else {
      imageClass.push(classes.Avatar)
    }
  } else {
    return null
  }

  return (
    <img
      className={imageClass.join(' ')}
      src={image}
      alt={'avatar'}/>
  );
};

export default avatar;