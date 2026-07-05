const Alert = require("../models/Alert");
const Expense = require("../models/Expense");

async function generateAlertId() {

    const lastAlert = await Alert.findOne().sort({ createdAt: -1 });

    if (!lastAlert) {
        return "ALT001";
    }

    const lastNumber = parseInt(lastAlert.alertId.replace("ALT", ""));

    return "ALT" + String(lastNumber + 1).padStart(3, "0");
}

exports.monitorBudget = async (budget, expense) => {

    // Overspending
    if (budget.utilizedAmount > budget.allocatedAmount) {

        await Alert.create({

            alertId: await generateAlertId(),

            budgetId: budget.budgetId,

            departmentId: budget.departmentId,

            alertType: "Overspending",

            severity: "Critical",

            message: "Budget allocation exceeded."

        });

    }

    // Budget Exhaustion
    if (budget.utilizationPercentage >= 90) {

        await Alert.create({

            alertId: await generateAlertId(),

            budgetId: budget.budgetId,

            departmentId: budget.departmentId,

            alertType: "Budget Exhaustion",

            severity: "High",

            message: "Budget utilization crossed 90%."

        });

    }

    // Under Utilization
    if (budget.utilizationPercentage < 40) {

        await Alert.create({

            alertId: await generateAlertId(),

            budgetId: budget.budgetId,

            departmentId: budget.departmentId,

            alertType: "Under Utilization",

            severity: "Medium",

            message: "Budget utilization is below expected."

        });

    }

    // Spending Spike
    const totalExpenses = await Expense.countDocuments({
        budgetId: budget.budgetId
    });

    if (
        totalExpenses >= 3 &&
        expense.amount > budget.allocatedAmount * 0.25
    ) {

        await Alert.create({

            alertId: await generateAlertId(),

            budgetId: budget.budgetId,

            departmentId: budget.departmentId,

            alertType: "Spending Spike",

            severity: "High",

            message: "Unusually large expense detected."

        });

    }

};