const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  author: {
    id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  text: String,
  // profileImg: {
  //   type: mongoose.Schema.Types.String,
  //   ref: 'User',
  // },
  posted: {
    type: Date,
  }
});

module.exports = mongoose.model('Comment', commentSchema);
