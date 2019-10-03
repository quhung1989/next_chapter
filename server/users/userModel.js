const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: {type: String, unique: true, required: true},
  profileImg: {type: String},
  isAdmin: { type: Boolean, default: false },
  description: { type: String },
  location: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
