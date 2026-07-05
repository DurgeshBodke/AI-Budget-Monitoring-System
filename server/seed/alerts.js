const xlsx = require("xlsx");
const path = require("path");

const Alert = require("../models/Alert");
const Budget = require("../models/Budget");
const Department = require("../models/Department");

const importAlerts = async () => {

    const workbook = xlsx.readFile(
        path.join(__dirname, "../../dataset/GovernmentBudgetData.xlsx")
    );

    const sheet = workbook.Sheets["Alerts"];

    const alerts = xlsx.utils.sheet_to_json(sheet);

    for (const item of alerts) {

        const budget = await Budget.findOne({
            budgetId: item.BudgetID
        });

        const department = await Department.findOne({
            departmentId: item.DepartmentID
        });

        if (!budget || !department) {

            console.log(`${item.AlertID} Skipped`);

            continue;

        }

        const exists = await Alert.findOne({

            alertId: item.AlertID

        });

        if (exists) {

            console.log(`${item.AlertID} Already Exists`);

            continue;

        }

        await Alert.create({

            alertId: item.AlertID,

            budgetId: item.BudgetID,

            budget: budget._id,

            departmentId: item.DepartmentID,

            department: department._id,

            alertType: item.AlertType,

            severity: item.Severity,

            message: item.Message,

            status: item.Status

        });

        console.log(`${item.AlertID} Imported`);

    }

};

module.exports = importAlerts;