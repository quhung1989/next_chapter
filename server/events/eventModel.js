const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String},
  latitude: { type: String},
  longitude: { type: String},
  place_id: {type: String},
  date: {type: Date},
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  posted: { type: Date, default: Date.now, required: true },
  author: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
