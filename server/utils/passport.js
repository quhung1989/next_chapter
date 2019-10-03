const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose')
const User = require('../users/userModel');

const jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = 'banshee is a cute dog';

module.exports = passport => {
  passport.use(new JWTStrategy(jwtOpts, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
      .then(user => {
        if(user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.error(err));
  }));
}