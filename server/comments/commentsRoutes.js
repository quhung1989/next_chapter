const express = require('express');
const router = express.Router();
const comment = require('./commentsController')

router.post('/post-comment/:id', comment.postComment);

router.get('/get-comments/:id', comment.getComments);

router.delete('/delete-comment/:id', comment.deleteComment);

module.exports = router;