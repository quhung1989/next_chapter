import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
  let type = 'button';
  if (props.type) {
    type = props.type;
  }
  return (
    <button
      type={type}
      onClick={props.clicked} 
      className={
        [
          classes.Button,
          classes[props.buttonClass]
        ]
        .join(' ')
      }
    >
      {props.children}
    </button>
  );
};

export default button;