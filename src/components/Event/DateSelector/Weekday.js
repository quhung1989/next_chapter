import React from 'react';
import classes from './Weekday.module.css';

const weekday = (props) => {
  return (
    <div name={props.label} className={classes.Weekday}>
      {props.title}
    </div>
  );
};

export default weekday;