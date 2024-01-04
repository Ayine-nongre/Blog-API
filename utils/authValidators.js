import { body, validationResult } from "express-validator";
import { User } from "../model/user.js";
import { validatorResult } from "../middleware/validator.js";

export const signupValidator = [
    body('username')
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Username must be 3 characters or more")
    .custom(async (username, { req }) => {
        const user = await User.findOne({ where: { username : username }})
        if (user) return (new Error("User with this username already exists"))
    }),
    body('email')
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email must be a valid email")
    .custom(async (email, { req }) => {
        const user = await User.findOne({ where: { email : email }})
        if (user) return (new Error("User with this email already exists"))
    }),
    body('password')
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Length of password should be 5 or more"),
    body('confirmPassword')
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Length of password should be 5 or more"),
    body('name')
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be 3 characters or more long"),
    validatorResult
]

export const loginValidator = [
    body('username')
    .notEmpty()
    .withMessage("Username cannot be empty"),
    body('password')
    .notEmpty()
    .withMessage("Password cannot be empty"),
    validatorResult
]