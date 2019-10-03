import React, { Component } from 'react';
import axios from 'axios';
import Button from '../UI/Button';
import classes from './NewEvent.module.css';
import Loading from '../UI/Loading';
import DateSelector from './DateSelector/DateSelector';
import { connect } from 'react-redux';

class NewEvent extends Component {
  state = {
    title: null,
    description: null,
    location: null,
    time: null,
    loading: false,
    date: null,
  }

  newEventHandler = () => {
    this.setState({loading: true});
    let dateString = this.state.date.toString();
    dateString = dateString.replace(/\d{2}:\d{2}/, this.state.time);
    const DATE_OBJECT = new Date(dateString);
    const EVENT = {
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      date: DATE_OBJECT,
      author: this.props.username
    };
    axios.post('/api/events/new-event', EVENT)
    .then((res) => {
      this.setState({loading: false});
      this.props.history.push('/');
    })
    .catch((err) => {
      console.log(err)
      this.setState({loading: false});
    });
  }

  render() {
    let content;
    content = (
      <div className={classes.Container}>
        <div className={classes.NewEvent}>
          <h1 className={classes.PageTitle}>
            Create a New Event
          </h1>
          <div>
            <input
              type="text"
              onChange={(event) => {
                this.setState({title: event.target.value});
                }
              }
              name="title"
              placeholder='Title'/>
          </div>

          <div>
            <input
              type="text"
              onChange={(event) => {
                this.setState({description: event.target.value});
              }}
              name="description"
              placeholder='Description'/>
          </div>

          <div>
            <input
              type="text"
              onChange={(event) => {
                this.setState({location: event.target.value});
              }}
              name="location"
              placeholder='Location'/>
          </div>

          <div>
            <input
              type="time"
              onChange={(event) => {
                this.setState({time: event.target.value});
              }}
              name="time"
              placeholder='Time'/>
          </div>
          <DateSelector dateSelectedHandler={this.dateSelectedHandler}/>
          <Button clicked={this.newEventHandler} type={'submit'}>
            Create Event
          </Button>
        </div>
      </div>
    );
    if (this.state.loading) {
      content = <Loading/>;
    }
    
    return (
      <div>
        {content}
      </div>
    );
  }

  dateSelectedHandler = (date) => {
    this.setState({date: date});
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(NewEvent);
