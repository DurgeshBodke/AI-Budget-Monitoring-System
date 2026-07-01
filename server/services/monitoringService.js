const Alert = require("../models/Alert");

let alertCounter = 1;

const generateAlertId = () => {
    return "ALT" + String(alertCounter++).padStart(3, "0");
};

exports.monitorBudget = async (budget, expense) => {

console.log("===== Monitoring Service Called =====");
console.log("Budget Utilized:", budget.utilizedAmount);
console.log("Budget Allocated:", budget.allocatedAmount);
console.log("Utilization %:", budget.utilizationPercentage);

    // Overspending
    if (budget.utilizedAmount > budget.allocatedAmount) {

        await Alert.create({

            alertId: generateAlertId(),

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

            alertId: generateAlertId(),

            budgetId: budget.budgetId,

            departmentId: budget.departmentId,

            alertType: "Budget Exhaustion",

            severity: "High",

            message: "Budget utilization crossed 90%."

        });

    }

};