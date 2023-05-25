import { Schema, model } from "mongoose";
import { fieldTypes } from "./userModel";

// User Schema
const blogPostSchema = new Schema(
  {
    postImage: String,
    postTitle: fieldTypes,
    postBody: fieldTypes,
    comments: { ...fieldTypes, required: true },
  },
  { timestamps: true }
);
