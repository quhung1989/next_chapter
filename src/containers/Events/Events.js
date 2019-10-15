import React, { Component } from 'react';
import axios from 'axios';
import Event from '../../components/Event/Event';
import classes from './Events.module.css';
// import withErrorHandler from '../../hoc/withErrorHandler';
import Loading from '../../components/UI/Loading';
import { connect } from 'react-redux';

class Events extends Component {
  state = {
    events: [],
    error: false,
    loading: false,
    selectedEvent: null,
  }

  UNSAFE_componentWillMount() {
    this.loadEventsData();
  }

  // componentDidUpdate() {
  //   this.loadEventsData();
  // }

  loadEventsData () {
    this.setState({loading: true});
    axios.get('/api/events/get-events')
    .then((response) => {
      this.setState({
        events: response.data,
        loading: false,
      });
    })
    .catch((error) => {
      this.setState({
        error: true,
        loading: false,
      });
    });
  }

  eventClickedHandler = (id) => {
    //this.setState({selectedEvent: id});
    this.props.history.push({
      pathname: '/events/' + id
    })
  }

  render() {
    let events;
    if (this.state.error) {
      events = <p style={{textAlign: 'center'}}>Oops! Something went wrong!</p>;
    } else if (this.state.loading) {
      events = <Loading />;
    } else if (!this.state.selectedEvent && this.state.events.length > 0) {
      events = this.state.events.map(event => {
        return (
          <Event
            title={event.title}
            description={event.description}
            location={event.location}
            time={event.time}
            date={event.date}
            clicked={() => this.eventClickedHandler(event._id)}
            key={event._id}/>
        );
      });
    } else (
      events = <h3>Please create an event.</h3>
    )

    return (
      <div>
        <section className={classes.Events}>
          {events}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Events);
