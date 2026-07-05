const express = require("express");

const router = express.Router();

const {

    getReportSummary,

    getBudgetReport,

    getDepartmentReport,

    getExpenseReport,

    getAlertReport

} = require("../controllers/reportController");

router.get("/", getReportSummary);

router.get("/budgets", getBudgetReport);

router.get("/departments", getDepartmentReport);

router.get("/expenses", getExpenseReport);

router.get("/alerts", getAlertReport);

module.exports = router;