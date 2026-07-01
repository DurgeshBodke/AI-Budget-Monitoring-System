const express = require("express");

const router = express.Router();

const {
    createExpense,
    getAllExpenses,
    getExpenseById,
    deleteExpense
} = require("../controllers/expenseController");

const {
    expenseValidation
} = require("../validators/expenseValidator");

router.post("/", expenseValidation, createExpense);

router.get("/", getAllExpenses);

router.get("/:id", getExpenseById);

router.delete("/:id", deleteExpense);

module.exports = router;