import React, {Component} from 'react';
import classes from './DateSelector.module.css';
import Month from './Month';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const CURRENT_MONTH = new Date().getMonth();
const CURRENT_YEAR = new Date().getFullYear();

class DateSelector extends Component {
  state = {
    selectedDate: null,
  }

  componentWillMount() {
    if (this.props.selectedDate) {
      this.setState({selectedDate: this.props.selectedDate})
    }
  }

  render() {
    const MONTH = (
      <div className={classes.Month}>
        <Month
          selectedDate={this.state.selectedDate}
          dayClicked={this.dayClickedHandler}
          currentYear={CURRENT_YEAR}
          currentMonth={CURRENT_MONTH}/>
      </div>
    );
    return (
      <div>
        <div className={classes.Container}>
          <div className={classes.Title}>
            {MONTHS[CURRENT_MONTH]}
          </div>
          {MONTH}
        </div>
      </div>
    );
  }

  dayClickedHandler = (day) => {
    this.setState({selectedDate: new Date(CURRENT_YEAR, CURRENT_MONTH, day)}, () => this.props.dateSelectedHandler(this.state.selectedDate));
  }
}

export default DateSelector;