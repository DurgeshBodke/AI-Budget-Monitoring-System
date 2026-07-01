const express = require("express");

const router = express.Router();

const { createBudget } = require("../controllers/budgetController");

const { budgetValidation } = require("../validators/budgetValidator");

router.post("/", budgetValidation, createBudget);

module.exports = router;