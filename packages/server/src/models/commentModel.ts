import { fieldTypes } from "./userModel";
import { Schema, model } from "mongoose";

// Comment Schema
const commentSchema = new Schema(
  {
    comment: fieldTypes,
    commentAuthor: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const CommentModel = model("comment", commentSchema);

export default CommentModel;
