const { body } = require("express-validator");

exports.expenseValidation = [

    body("expenseId")
        .notEmpty()
        .withMessage("Expense ID is required"),

    body("budgetId")
        .notEmpty()
        .withMessage("Budget ID is required"),

    body("departmentId")
        .notEmpty()
        .withMessage("Department ID is required"),

    body("category")
        .notEmpty()
        .withMessage("Category is required"),

    body("amount")
        .isNumeric()
        .withMessage("Amount must be a number")
        .custom(value => value > 0)
        .withMessage("Amount must be greater than zero"),

    body("expenseDate")
        .notEmpty()
        .withMessage("Expense Date is required"),

    body("description")
        .notEmpty()
        .withMessage("Description is required")

];