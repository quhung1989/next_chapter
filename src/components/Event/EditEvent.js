import React, {Component} from 'react';
import Button from '../UI/Button';
import classes from './EditEvent.module.css';
import axios from 'axios';
import DateSelector from './DateSelector/DateSelector';

class EditEvent extends Component {
  state = {
    title: null,
    description: null,
    location: null,
    time: null,
    id: null,
    date: null,
  }

  UNSAFE_componentWillMount() {
    const DATE_OBJECT = new Date(this.props.event.date);
    let timeString = DATE_OBJECT.toString();
    timeString = timeString.substring(16, 21);
    this.setState({
      title: this.props.event.title,
      description: this.props.event.description,
      location: this.props.event.location,
      date: DATE_OBJECT,
      id: this.props.event._id,
      time: timeString,
    });
  }

  confirmEditHandler = () => {
    let dateString = this.state.date.toString();
    dateString = dateString.replace(/\d{2}:\d{2}/, this.state.time);
    const DATE_OBJECT = new Date(dateString);
    const EVENT = {
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      date: DATE_OBJECT,
      id: this.state.id,
    };
    axios.put(`/api/events/update/${EVENT.id}`, EVENT)
    .then(res => {
      if (res.status === 200) {
        this.props.editStateHandler()
      }
    })
    .catch(error => console.log(error));
  }

  cancelEditHandler = () => {
    this.props.editCancelHandler();
  }

  render() {
    return (
      <div className={classes.EditEvent}>
        <h1 className={classes.PageTitle}>Edit Event</h1>
        <div>
            <input
              type="text"
              onChange={(event) => {
                this.setState({title: event.target.value});
                }
              }
              name="title"
              value={this.state.title}/>
          </div>
  
          <div>
            <input
              type="text"
              onChange={(event) => {
                this.setState({description: event.target.value});
              }}
              name="description"
              value={this.state.description}/>
          </div>
  
          <div>
            <input
              type="text"
              onChange={(event) => {
                this.setState({location: event.target.value});
              }}
              name="location"
              value={this.state.location}/>
          </div>
  
          <div>
            <input
              type="time"
              onChange={(event) => {
                this.setState({time: event.target.value});
              }}
              name="time"
              value={this.state.time}/>
          </div>
          <DateSelector
            selectedDate={this.state.date}
            dateSelectedHandler={this.dateSelectedHandler}/>
        <Button clicked={this.confirmEditHandler} type={'submit'}>
          Confirm Edit
        </Button>
        <Button clicked={this.cancelEditHandler}>
          Cancel
        </Button>
      </div>
    );
  }

  dateSelectedHandler = (date) => {
    this.setState({date: date});
  }
};

export default EditEvent;