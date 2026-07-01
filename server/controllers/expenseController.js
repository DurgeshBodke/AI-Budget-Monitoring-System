const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const Department = require("../models/Department");
const { validationResult } = require("express-validator");
const { monitorBudget } = require("../services/monitoringService");

// =========================================
// Create Expense
// =========================================

exports.createExpense = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const {
            expenseId,
            budgetId,
            departmentId,
            category,
            amount,
            paymentMode,
            expenseDate,
            description,
            supportingDocument,
            status
        } = req.body;

        // Check Budget
        const budget = await Budget.findOne({ budgetId });

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found"
            });
        }

        // Check Department
        const department = await Department.findOne({ departmentId });

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        // Duplicate Expense Check
        const existingExpense = await Expense.findOne({ expenseId });

        if (existingExpense) {
            return res.status(400).json({
                success: false,
                message: "Expense ID already exists"
            });
        }

        // Create Expense
        const expense = await Expense.create({

            expenseId,

            budgetId,
            budget: budget._id,

            departmentId,
            department: department._id,

            category,

            amount,

            paymentMode,

            expenseDate,

            description,

            supportingDocument,

            status

        });

        // ===============================
        // Update Budget
        // ===============================

        budget.utilizedAmount += Number(amount);

        budget.remainingAmount =
            budget.allocatedAmount - budget.utilizedAmount;

        budget.utilizationPercentage =
            (budget.utilizedAmount / budget.allocatedAmount) * 100;

        await budget.save();
        await monitorBudget(budget, expense);

        // ===============================

        res.status(201).json({

            success: true,

            message: "Expense Added Successfully",

            expense,

            updatedBudget: {

                budgetId: budget.budgetId,

                allocatedAmount: budget.allocatedAmount,

                utilizedAmount: budget.utilizedAmount,

                remainingAmount: budget.remainingAmount,

                utilizationPercentage:
                    budget.utilizationPercentage.toFixed(2)

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};

// =========================================
// Get All Expenses
// =========================================

exports.getAllExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find()

            .populate("budget", "budgetId financialYear")

            .populate("department", "departmentName");

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

// =========================================
// Get Single Expense
// =========================================

exports.getExpenseById = async (req, res) => {

    try {

        const expense = await Expense.findOne({

            expenseId: req.params.id

        })

            .populate("budget")

            .populate("department");

        if (!expense) {

            return res.status(404).json({

                success: false,

                message: "Expense not found"

            });

        }

        res.status(200).json({

            success: true,

            expense

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================================
// Delete Expense
// =========================================

exports.deleteExpense = async (req, res) => {

    try {

        const expense = await Expense.findOne({

            expenseId: req.params.id

        });

        if (!expense) {

            return res.status(404).json({

                success: false,

                message: "Expense not found"

            });

        }

        // Restore Budget

        const budget = await Budget.findOne({

            budgetId: expense.budgetId

        });

        if (budget) {

            budget.utilizedAmount -= expense.amount;

            budget.remainingAmount =
                budget.allocatedAmount - budget.utilizedAmount;

            budget.utilizationPercentage =
                (budget.utilizedAmount /
                    budget.allocatedAmount) * 100;

            await budget.save();

        }

        await expense.deleteOne();

        res.status(200).json({

            success: true,

            message: "Expense Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};