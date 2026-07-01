const { body } = require("express-validator");

exports.departmentValidation = [

    body("departmentId")
        .notEmpty()
        .withMessage("Department ID is required"),

    body("departmentName")
        .notEmpty()
        .withMessage("Department Name is required"),

    body("departmentCode")
        .notEmpty()
        .withMessage("Department Code is required"),

    body("departmentHead")
        .optional()
        .isString()
        .withMessage("Department Head must be text"),

    body("status")
        .optional()
        .isIn(["Active", "Inactive"])
        .withMessage("Status must be Active or Inactive")

];