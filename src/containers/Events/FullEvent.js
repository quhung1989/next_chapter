import React, {Component} from 'react';
import axios from 'axios';
import Button from '../../components/UI/Button';
import classes from './FullEvent.module.css';
import Comments from '../../components/Event/Comments/Comments';
import EditEvent from '../../components/Event/EditEvent';
import { connect } from 'react-redux';
import locationIcon from '../../assets/location.png'
import dateIcon from '../../assets/date.png'
import timeIcon from '../../assets/time.png'

class FullEvent extends Component {
  state = {
    loadedEvent: null,
    comments: null,
    editing: false,
    deleting: false,
  }

  render () {
    let event;
    let comments;
    let eventLocation;
    let url;
    let map;
    let date;
    let time;
    let buttons;
    
    if (this.state.loadedEvent && (this.props.username === this.state.loadedEvent.author)) {
      this.state.deleting ? buttons = (
        <div>
          <p>Are you sure you want to delete?</p>
          <div>
            <Button clicked={this.deleteHandler}>
              Yes
            </Button>
            <Button clicked={this.deletePromptHandler}>
              No
            </Button>    
          </div>
        </div>
      ) :
      buttons = (
        <div>
          <Button clicked={this.editHandler}>
            Edit
          </Button>
          <Button clicked={this.deletePromptHandler}>
            Delete
          </Button>        
        </div>
      )
    }

    if (this.state.loadedEvent) {
      eventLocation = this.state.loadedEvent.location.replace(/\s/g, '+');
      url = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${eventLocation}`;
      
      if (this.state.loadedEvent.date) {
        const DATE_OBJECT = new Date(this.state.loadedEvent.date);
        date = DATE_OBJECT.toLocaleDateString();
        time = DATE_OBJECT.toLocaleTimeString('en-US');
      } else {
        date = 'TBD';
        time = 'TBD';
      }

      this.state.editing ? (
        event = (
          <div className={classes.Container}>
            <EditEvent
              event={this.state.loadedEvent}
              editCancelHandler={this.editHandler}
              editStateHandler={this.editStateHandler}/>
          </div>
        )
      ) : event = (
        <div className={classes.Container}>
          <div className={classes.FullEvent}>
            <div className={classes.Title}>
              {this.state.loadedEvent.title}
            </div>
            <div className={classes.Description}>
              {this.state.loadedEvent.description}
            </div>
            <div className={classes.Location}>
              <img className={classes.Icon} src={locationIcon} alt='location icon'/>
              {this.state.loadedEvent.location}
            </div>
            <div className={classes.Time}>
              <img className={classes.Icon} src={timeIcon} alt='time icon'/>
              {time}
            </div>
            <div className={classes.Date}>
              <img className={classes.Icon} src={dateIcon} alt='date icon'/>
              {date}
            </div>
            {buttons}
          </div>
        </div>
      );

      comments = (
        <div>
          <Comments
            eventId={this.state.loadedEvent._id}
            comments={this.state.loadedEvent.comments}
            username={this.props.username}
          />
        </div>
      );
      map = (
        <iframe
          className={classes.Map}
          src={url}
          title='Event Location on Map'>
        </iframe>
      );
    }

    return (
      <div>
        {event}
        <div className={classes.MapDiv}>
          {map}
        </div>
        {comments}
      </div>
      );
  }
  
  componentWillMount () {
    if (this.props.match.params.id) {
      if (!this.state.loadedEvent || this.state.loadedEvent.id !== this.props.match.params.id) {
        this.loadEventData();
      }
    }
  }

  loadEventData = () => {
    axios.get('/api/events/get-full-event/' + this.props.match.params.id)
    .then((res) => {
      this.setState({loadedEvent: res.data})
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteHandler = () => {
    axios.delete('/api/events/delete-event/' + this.state.loadedEvent._id)
    .then(this.setState({loadedEvent: null}))
    .then(this.props.history.replace('/'))
    .catch((err) => {
      console.log(err);
    });
  }

  editHandler = () => {
    this.setState({editing: !this.state.editing});
  }

  deletePromptHandler = () => {
    this.setState({deleting: !this.state.deleting});
  }

  editStateHandler = () => {
    this.loadEventData();
    this.setState({editing: !this.state.editing});
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin
  };
};

export default connect(mapStateToProps)(FullEvent);