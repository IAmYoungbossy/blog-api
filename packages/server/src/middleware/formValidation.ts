import { body } from "express-validator";
import { validateTag } from "../utils/validateTags";
import { validatecategory } from "../utils/validateCategories";

// Form validation for user regisitration
const formValidation = [
  body("avatar")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .withMessage("Include a valid image path")
    .escape(),

  body("password")
    .trim()
    .isStrongPassword()
    .withMessage("Please select a strong password")
    .escape(),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please Use a valid email address")
    .escape(),

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name field must not be empty")
    .escape(),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name field must not be empty")
    .escape(),
];

// Form validation for user profile update
export const updateFormValidation = [
  body("avatar")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .withMessage("Include a valid image path")
    .escape(),

  body("password")
    .optional({ checkFalsy: true })
    .trim()
    .isStrongPassword()
    .withMessage("Please select a strong password")
    .escape(),

  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please Use a valid email address")
    .escape(),

  body("firstName")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("First name field must not be empty")
    .escape(),

  body("lastName")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Last name field must not be empty")
    .escape(),
];

// Form validation for updating blog post
export const updateBlogPostFormValidation = [
  body("tags")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Select at least a tag")
    .custom(validateTag)
    .withMessage("Select at least a tag from the tag list")
    .escape(),

  body("postBody")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 50 })
    .withMessage("Minimum post character is 50")
    .escape(),

  body("postTitle")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10 })
    .withMessage("Minimum post tile character is 10")
    .escape(),

  body("postImage")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Must include an image")
    .escape(),

  body("category")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Pick at least one category")
    .custom(validatecategory)
    .withMessage("Select at least a tag from the tag list")
    .escape(),
];

// Form validation for creating blog post
export const blogPostFormValidation = [
  body("tags")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Select at least a tag")
    .custom(validateTag)
    .withMessage("Select at least a tag from the tag list")
    .escape(),

  body("postBody")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 50 })
    .withMessage("Minimum post character is 50")
    .escape(),

  body("postTitle")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10 })
    .withMessage("Minimum post tile character is 10")
    .escape(),

  body("postImage")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Must include an image")
    .escape(),

  body("category")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Pick at least one category")
    .custom(validatecategory)
    .withMessage("Select at least a tag from the tag list")
    .escape(),
];

export const commentFormValidation = [
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Type your thought in the comment box")
    .escape(),
];

export default formValidation;
