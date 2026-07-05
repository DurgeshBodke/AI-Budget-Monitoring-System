const Budget = require("../models/Budget");
const Department = require("../models/Department");
const { validationResult } = require("express-validator");

exports.createBudget = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const {
            budgetId,
            financialYear,
            allocationType,
            quarter,
            departmentId,
            allocatedAmount,
            allocationDate,
            remarks
        } = req.body;

        const department = await Department.findOne({ departmentId });

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        const existingBudget = await Budget.findOne({ budgetId });

        if (existingBudget) {
            return res.status(400).json({
                success: false,
                message: "Budget ID already exists"
            });
        }

        const budget = await Budget.create({

            budgetId,
            financialYear,
            allocationType,
            quarter,
            departmentId,
            department: department._id,

            allocatedAmount,
            utilizedAmount: 0,
            remainingAmount: allocatedAmount,
            utilizationPercentage: 0,

            allocationDate,
            remarks

        });

        res.status(201).json({

            success: true,
            message: "Budget Created Successfully",
            budget

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Get All Budgets
exports.getAllBudgets = async (req, res) => {
    try {

        const budgets = await Budget.find()
            .populate("department", "departmentId departmentName");

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

// Get Budget By ID
exports.getBudgetById = async (req, res) => {
    try {

        const budget = await Budget.findById(req.params.id)
            .populate("department", "departmentId departmentName");

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found"
            });
        }

        res.status(200).json({
            success: true,
            budget
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Budget
exports.updateBudget = async (req, res) => {

    try {

        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found"
            });
        }

        Object.assign(budget, req.body);

        budget.remainingAmount =
            budget.allocatedAmount - budget.utilizedAmount;

        budget.utilizationPercentage =
            budget.allocatedAmount > 0
                ? Number(
                      (
                          (budget.utilizedAmount /
                              budget.allocatedAmount) *
                          100
                      ).toFixed(2)
                  )
                : 0;

        await budget.save();

        res.status(200).json({
            success: true,
            message: "Budget Updated Successfully",
            budget
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Budget
exports.deleteBudget = async (req, res) => {

    try {

        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: "Budget not found"
            });
        }

        await budget.deleteOne();

        res.status(200).json({
            success: true,
            message: "Budget Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};