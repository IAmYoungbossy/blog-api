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
    heroSlides: {
      type: Boolean,
      required: true,
      default: false,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "regUser" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

blogPostSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

blogPostSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const BlogPostModel = model("blogPost", blogPostSchema);

export default BlogPostModel;
