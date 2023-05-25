import { fieldTypes } from "./userModel";
import { Schema, model } from "mongoose";

// User Schema
const blogPostSchema = new Schema(
  {
    postImage: String,
    postBody: fieldTypes,
    postTitle: fieldTypes,
    tags: [
      "Creative",
      "Lifestyle",
      "Motivation",
      "Responsive",
      "Inspiration",
    ],
    categories: {
      type: String,
      required: true,
      enum: [
        "Books",
        "Sports",
        "Adventure",
        "Technologies",
        "Entertainment",
      ],
    },
    status: {
      type: String,
      required: true,
      default: "Unpublished",
      enum: ["Published", "Unpublished"],
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const BlogPostModel = model("blogPost", blogPostSchema);

export default BlogPostModel;
