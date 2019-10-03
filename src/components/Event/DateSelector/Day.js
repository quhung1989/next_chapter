import React from 'react';
import classes from './Day.module.css';

const day = (props) => {
  if (props.fullDate == null) {
    return <div className={classes.EmptyStateDay}></div>
  }
  const DATE = props.fullDate.getDate();
  let selectedDate; 
  if (props.selectedDate !== null) {
    selectedDate = props.selectedDate.getDate();
  }
  
  let className = classes.Day;

  if (DATE === selectedDate) {
    className = classes.Selected;
  }

  return (
    <button className={className} onClick={() => props.dayClicked(DATE)}>
      {DATE}
    </button>
  );
};

export default day;