import React, {Component} from 'react';
import classes from './Month.module.css';
import Weekday from './Weekday';
import Day from './Day';

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const WEEK_LENGTH = 7;

class Month extends Component {
  render() {
    const WEEKDAYS_MARKUP = WEEKDAYS.map((weekday) => {
      return (
        <Weekday
          key={weekday}
          title={this.abbreviateWeekday(weekday)}
          label={weekday}/>
      );
    });

    const WEEKS = this.getWeeksForMonth(this.props.currentMonth, this.props.currentYear);

    const WEEKS_MARKUP = WEEKS.map((week, index) => {
      return (
        <div role='row' className={classes.Week} key={index}>
          {week.map(this.renderWeek)}
        </div>
      );
    });

    return (
      <React.Fragment>
        <div className={classes.Weekdays}>
          {WEEKDAYS_MARKUP}
        </div>
        {WEEKS_MARKUP}
      </React.Fragment>
    );
  }

//FUNCTIONS
  abbreviateWeekday = (weekday) => {
    return weekday.substring(0, 2);
  }

  getWeeksForMonth = (month, year) => {
    const FIRST_OF_MONTH = new Date(year, month, 1);
    const FIRST_DAY_OF_WEEK = FIRST_OF_MONTH.getDay();
    const WEEKS =[[]];

    let currentWeek = WEEKS[0];
    let currentDate = FIRST_OF_MONTH;

    for (let i = 0; i < FIRST_DAY_OF_WEEK; i++) {
      currentWeek.push(null);
    }

    while (currentDate.getMonth() === month) {
      if (currentWeek.length === WEEK_LENGTH) {
        currentWeek = [];
        WEEKS.push(currentWeek);
      }

      currentWeek.push(currentDate);
      currentDate = new Date(year, month, currentDate.getDate() + 1);
    }

    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }

    return WEEKS;
  }

  renderWeek = (fullDate, dayIndex) => {
    if (fullDate === null) {
      return <Day key={dayIndex}/>;
    }

    return (
      <Day
        key={dayIndex}
        fullDate={fullDate}
        dayClicked={this.props.dayClicked}
        selectedDate={this.props.selectedDate}/>
    );
  }
}

export default Month;