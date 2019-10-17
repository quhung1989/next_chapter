import React, { Component } from "react";
import classes from "./Comments.module.css";
import Comment from "./Comment";
import axios from "axios";
import AddComment from "../Comments/AddComment";

class Comments extends Component {
   state = {
      eventId: null,
      comments: [],
      username: "",
      commenters: [
         {
            username: "name",
            image: "nam.png",
         },
      ],
   };

   render() {
      let comments = [];
      const commentsArray = this.state.comments;

      let addComments = (
         <AddComment
            username={this.props.username}
            addComment={this.addCommentHandler}
         />
      );

      for (let i = commentsArray.length - 1; i >= 0; i--) {
         const username = commentsArray[i].author.username;
         const comment = this.state.commenters.find((commenter) =>
            this.findCommenter(commenter, username)
         );
         let image;
         if (comment) {
            image = comment.image;
         }

         comments.push(
            <Comment
               username={username}
               loggedInUser={this.props.username}
               text={commentsArray[i].text}
               deleteComment={() => this.deleteComment(commentsArray[i]._id)}
               image={image}
               // image={commentsArray[i].profileImg}
               key={commentsArray[i]._id}
            />
         );
      }

      return (
         <div className={classes.Comments}>
            {addComments}
            {comments}
         </div>
      );
   }

   UNSAFE_componentWillMount() {
      this.setState({ eventId: this.props.eventId }, () => this.loadComments());
   }

   deleteComment = (id) => {
      axios
         .delete(`/api/comments/delete-comment/${id}`)
         .then(this.loadComments())
         .catch((err) => console.log(err));
   };

   loadComments = () => {
      axios
         .get(`/api/comments/get-comments/${this.state.eventId}`)
         .then((res) => {
            this.setState({ comments: res.data.comments });
         })
         .then(() => {
            this.addCommenters();
         })
         .catch((err) => {
            console.log(err);
         });
   };

   addCommentHandler = (comment) => {
      // eslint-disable-next-line
      event.preventDefault();
      let username = this.props.username;
      let text = comment.text.value;
      if (username && text) {
         const COMMENT = {
            username: username,
            comment: text,
         };
         axios
            .post(`/api/comments/post-comment/${this.props.eventId}`, COMMENT)
            .then(() => this.loadComments())
            .catch((err) => console.log(err));
      }
   };

   getCommenterImage = (username) => {
      let commenter = {};
      axios
         .get(`/api/users/get-user-image/${username}`)
         .then((res) => {
            if (res.data) {
               commenter.username = username;
               commenter.image = res.data;
               const commenters = [...this.state.comments];
               commenters.push(commenter);
               this.setState({ commenters: commenters });
            }
         })
         .catch((err) => console.log(err));
   };

   addCommenters = () => {
      let commentsArray = this.state.comments;
      const commenters = this.state.commenters;

      for (let i = commentsArray.length - 1; i >= 0; i--) {
         let indexed;
         let username = commentsArray[i].author.username;

         for (let i = 0; i < commenters.length; i++) {
            if (commenters[i].username === username) {
               indexed = true;
            }
         }

         if (!indexed) {
            this.getCommenterImage(username);
         }
      }
   };

   findCommenter = (commenter, username) => {
      return commenter.username === username;
   };
}

export default Comments;
