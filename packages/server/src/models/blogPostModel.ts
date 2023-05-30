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
    category: {
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
    postAuthor: {
      ref: "regUser",
      required: true,
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      required: true,
      default: "Unpublished",
      enum: ["Published", "Unpublished"],
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "regUser" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true }
);

blogPostSchema.virtual("like-count").get(function () {
  return this.likes.length;
});

blogPostSchema.virtual("comment-count").get(function () {
  return this.comments.length;
});

const BlogPostModel = model("blogPost", blogPostSchema);

export default BlogPostModel;
