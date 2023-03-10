import { body } from "express-validator";

export const customerOnboardingValidator = [
  body("email", "Email Should be an email").isEmail(),
  body("password", "Password required").isLength({
    min: 1,
  }),
  body("first_name", "First Name required").isLength({
    min: 2,
  }),
  body("last_name", "Last Name required").isLength({
    min: 2,
  }),
  body("phone_number", "Phone number required").isLength({
    min: 10,
  }),
];
