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