import {body, param} from "express-validator";

export const registerValidator = [
    body("fullname")
    .trim()
    .notEmpty()
    .withMessage("fullname is required"),

    body("emailid")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("enter valid email"),

    body("mobileno")
    .trim()
    .notEmpty()
    .withMessage("mobileno is required")
    .isLength({min:10 , max:10})
    .withMessage("Mobile number must be 10 digit"),

    body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({min:6})
    .withMessage("password must be at least 6 character"),

    body("referralid")
    .optional()
    .trim()
]

export const verifyEmailValidator = [
        param("token")
        .notEmpty()
        .withMessage("verification token is required")
]

export const loginValidator = [
    body("emailid")
    .trim()
    .notEmpty()
    .withMessage("emailis is required")
    .isEmail()
    .withMessage("enter valid emailid"),

    body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({min:6})
    .withMessage("password must be at least  6 letter")
]

export const forgotpasswordValidator = [
        body("emailid")
        .notEmpty()
        .withMessage("Emailid is required")
        .isEmail()
        .withMessage("enter valid email")
]

export const resetpasswordValidator = [
    param("token")
    .notEmpty()
    .withMessage("resetpassword token is required"),

    body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({min : 6})
    .withMessage("password at least minimium 6 character")

]

