import { body } from "express-validator";

const validateInputFields = [
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

export default validateInputFields;
