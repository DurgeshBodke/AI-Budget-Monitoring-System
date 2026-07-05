const express = require("express");
const upload = require("../middleware/uploadMiddleware");
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

router.post(
    "/",
    upload.single("document"),
    expenseValidation,
    createExpense
);

router.get("/", getAllExpenses);

router.get("/:id", getExpenseById);

router.delete("/:id", deleteExpense);

module.exports = router;