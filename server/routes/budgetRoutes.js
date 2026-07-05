const express = require("express");

const router = express.Router();

const {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget
} = require("../controllers/budgetController");

const {
    budgetValidation
} = require("../validators/budgetValidator");

router.post("/", budgetValidation, createBudget);

router.get("/", getAllBudgets);

router.get("/:id", getBudgetById);

router.put("/:id", budgetValidation, updateBudget);

router.delete("/:id", deleteBudget);

module.exports = router;