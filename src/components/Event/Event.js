import React from 'react';
import classes from './Event.module.css';
import locationIcon from '../../assets/location.png'
import dateIcon from '../../assets/date.png'

const event = (props) => {
  let date;

  if (props.date) {
    date = new Date(props.date).toLocaleDateString();
  } else {
    date = 'TBD';
  }

  return (
    <article>
      <div className={classes.Event} onClick={props.clicked} role="presentation">
        <div className={classes.Title}>
          {props.title}
        </div>
        <div className={classes.Description}>
          {props.description}
        </div>
        <div className={classes.Location}>
          <img className={classes.Icon} src={locationIcon} alt='location icon'/>
          {props.location}
        </div>
        <div className={classes.Date}>
          <img className={classes.Icon} src={dateIcon} alt='date icon'/>
          {date}
        </div>
      </div>
    </article>
  )
}

export default event;
