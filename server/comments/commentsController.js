const Event = require('../events/eventModel');
const Comment = require('./commentModel');
const User = require('../users/userModel');

const commentController = {}

commentController.postComment = (req, res) => {
  Event.findById(req.params.id, (error, event) => {
    if(error) {
      console.log(error, 'event');
      res.send(error);
    }
    User.findOne({username: req.body.username}, (error, user) => {
      let newComment;
      if (error) {
        console.log(error);

      } 
      if (user) {
        newComment = new Comment({
          author: {
            id: user.id,
            username: req.body.username
          },
          text: req.body.comment,
          posted: Date.now(),
        });
      }
      newComment.save((error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }
      });
      event.comments.push(newComment);
      event.save();
      res.end();
    })
  });
}

commentController.getComments = (req, res) => {
  Event.findById(req.params.id).populate('comments').exec((error, event) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    }
    const comments = event.comments;
    res.send({comments});
  });
}

commentController.deleteComment = (req, res) => {
  Comment.findOneAndDelete(req.params.id, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    }
    res.status(200).end();
  })
}

module.exports = commentController