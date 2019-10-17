import React, { Component } from "react";
import Button from "../../UI/Button";
import classes from "./AddComment.module.css";
import Input from "../../UI/Input";
import { inputChanger } from "../../../utils/inputChanger";

class AddComment extends Component {
   state = {
      comment: {
         text: {
            eleType: "input",
            eleConfig: {
               type: "text",
               placeholder: "Comment",
            },
            value: "",
            validation: {
               required: true,
               type: "general",
            },
            valid: false,
         },
      },
   };

   render() {
      let comment;
      let commentState = this.state.comment.text;

      if (this.props.username) {
         comment = (
            <form>
               <div className={classes.AddCommentTitle}>Add a Comment!</div>
               <Input
                  eleType={commentState.eleType}
                  eleConfig={commentState.eleConfig}
                  invalid={!commentState.valid}
                  value={commentState.value}
                  changed={(event) => {
                     this.setState({
                        comment: inputChanger(
                           event,
                           "text",
                           this.state.comment,
                           commentState.validation.type
                        ),
                     });
                  }}
               />
               <Button clicked={() => this.addComment()} type={"submit"}>
                  Submit
               </Button>
            </form>
         );
      } else {
         comment = (
            <div className={classes.AddCommentTitle}>
               Please log in to enter a comment!
            </div>
         );
      }

      return <div className={classes.AddComment}>{comment}</div>;
   }

   addComment = () => {
      if (this.props.username) {
         const comment = this.state.comment;
         let newState = JSON.parse(JSON.stringify(this.state.comment));
         newState.value = "";
         this.setState({ comment: newState });
         this.props.addComment(comment);
      }
   };
}

export default AddComment;
