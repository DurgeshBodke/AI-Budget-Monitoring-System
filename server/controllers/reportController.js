const Budget = require("../models/Budget");
const Department = require("../models/Department");
const Expense = require("../models/Expense");
const Alert = require("../models/Alert");

// ==========================================
// Report Summary
// ==========================================

exports.getReportSummary = async (req, res) => {

    try {

        const totalDepartments = await Department.countDocuments();

        const totalBudgets = await Budget.countDocuments();

        const totalExpenses = await Expense.countDocuments();

        const totalAlerts = await Alert.countDocuments();

        res.status(200).json({

            success: true,

            totalDepartments,

            totalBudgets,

            totalExpenses,

            totalAlerts

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// Budget Report
// ==========================================

exports.getBudgetReport = async (req, res) => {

    try {

        const budgets = await Budget.find()
            .populate("department", "departmentName");

        res.status(200).json({

            success: true,

            count: budgets.length,

            budgets

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// Department Report
// ==========================================

exports.getDepartmentReport = async (req, res) => {

    try {

        const departments = await Department.find();

        res.status(200).json({

            success: true,

            count: departments.length,

            departments

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// Expense Report
// ==========================================

exports.getExpenseReport = async (req, res) => {

    try {

        const expenses = await Expense.find()
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: expenses.length,

            expenses

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// Alert Report
// ==========================================

exports.getAlertReport = async (req, res) => {

    try {

        const alerts = await Alert.find()
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: alerts.length,

            alerts

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};