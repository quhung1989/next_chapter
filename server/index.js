require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport')
const userRoutes = require('./users/usersRoutes');
const eventRoutes = require('./events/eventsRoutes');
const commentRoutes = require('./comments/commentsRoutes');

app.use(cors());
mongoose.connect(`mongodb://localhost:${process.env.MONGODB_PORT}/${process.env.MONGO_DATABASE}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
require('./utils/passport')(passport);

app.use(express.static('dist'));

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/comments', commentRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log('Express server started!');
});
