const User = require("../models/User");
const Department = require("../models/Department");
const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const Alert = require("../models/Alert");

exports.getDashboardSummary = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalDepartments = await Department.countDocuments();

        const totalBudgets = await Budget.countDocuments();

        const totalExpenses = await Expense.countDocuments();

        const totalAlerts = await Alert.countDocuments();

        const totalAllocated = await Budget.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$allocatedAmount" }
                }
            }
        ]);

        const totalUtilized = await Budget.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$utilizedAmount" }
                }
            }
        ]);

        const totalRemaining = await Budget.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$remainingAmount" }
                }
            }
        ]);

        const recentExpenses = await Expense.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const recentAlerts = await Alert.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({

            success: true,

            dashboard: {

                totalUsers,

                totalDepartments,

                totalBudgets,

                totalExpenses,

                totalAlerts,

                totalAllocated:
                    totalAllocated.length
                        ? totalAllocated[0].total
                        : 0,

                totalUtilized:
                    totalUtilized.length
                        ? totalUtilized[0].total
                        : 0,

                totalRemaining:
                    totalRemaining.length
                        ? totalRemaining[0].total
                        : 0,

                recentExpenses,

                recentAlerts

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};