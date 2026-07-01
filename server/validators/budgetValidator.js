const { body } = require("express-validator");

exports.budgetValidation = [

    body("budgetId")
        .notEmpty()
        .withMessage("Budget ID is required"),

    body("financialYear")
        .notEmpty()
        .withMessage("Financial Year is required"),

    body("allocationType")
        .isIn(["Annual", "Quarterly"])
        .withMessage("Allocation Type must be Annual or Quarterly"),

    body("departmentId")
        .notEmpty()
        .withMessage("Department ID is required"),

    body("allocatedAmount")
        .isNumeric()
        .withMessage("Allocated Amount must be a number")

];