const Event = require('./eventModel');
const axios = require('axios');
const Comment = require('../comments/commentModel');

const eventController = {}

eventController.createEvent = (req, res) => {
  let newEvent;
  const EVENT_LOCATION = req.body.location.replace(/\s/g, '+');
  const KEY = process.env.GEOCODER_API_KEY;
  
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: EVENT_LOCATION,
      key: KEY,
    }
  })
  .then((response) => {
    newEvent = new Event({
      title: req.body.title,
      description: req.body.description,
      time: req.body.time,
      date: req.body.date,
      author: req.body.author,
      latitude: response.data.results[0].geometry.location.lat,
      longitude: response.data.results[0].geometry.location.lng,
      location: response.data.results[0].formatted_address,
      place_id: response.data.results[0].place_id,
    });
    Event.create(newEvent, (err) => {
      if (err) {
        console.log(`err: `, err);
        res.status(500).json(err);
      } else {
        res.status(200).end();
      }
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
}

eventController.updateEvent = (req, res) => {
  const EVENT_LOCATION = req.body.location.replace(/\s/g, '+');
  const KEY = process.env.GEOCODER_API_KEY;
  const eventId = req.params.id

  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: EVENT_LOCATION,
      key: KEY,
    }
  })
  .then(response => {
    Event.findById(eventId, (err, event) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
      event.title = req.body.title;
      event.description = req.body.description;
      event.latitude = response.data.results[0].geometry.location.lat
      event.longitude = response.data.results[0].geometry.location.lng
      event.location = response.data.results[0].formatted_address
      event.place_id = response.data.results[0].place_id
      event.date = req.body.date;
      event.save((err) => {
        if (err) {
          console.error(err)
          res.status(500).json(err)
        } else {
          res.status(200).end()
        }
      });
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
  
}

eventController.deleteEvent = (req, res) => {
  Event.findById((req.params.id), (err, event) => {
    if (err) {
      console.log('err: ', err);
      res.status(500).json(err);
    }
    event.comments.forEach((comment) => {
      Comment.findOneAndDelete(comment, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        }
      });
    });
    event.remove();
    res.end();
  });
}

eventController.showAllEvents = (req, res) => {
  Event.find({}, (err, data) => {
    if (err) {
      console.log(`err: `, err);
      res.status(500).json(err);
    }
    res.json(data);
  });
}

eventController.showFullEvent = (req, res) => {
  Event.findById(req.params.id).populate('comments').exec((err, data) => {
    if (err) {
      res.status(500).json(err);
    }
    res.json(data);
  });
}

module.exports = eventController;