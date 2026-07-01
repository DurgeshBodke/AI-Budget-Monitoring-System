const { body } = require("express-validator");

exports.registerValidation = [
    body("userId")
        .notEmpty()
        .withMessage("User ID is required"),

    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Enter a valid email"),

    body("phone")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone must be 10 digits"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("role")
        .notEmpty()
        .withMessage("Role is required")
];