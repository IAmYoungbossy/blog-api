import { body } from "express-validator";

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

export default formValidation;
