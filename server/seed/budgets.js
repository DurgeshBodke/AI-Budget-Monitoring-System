const xlsx = require("xlsx");
const path = require("path");

const Budget = require("../models/Budget");
const Department = require("../models/Department");

const importBudgets = async () => {

    const workbook = xlsx.readFile(
        path.join(__dirname, "../../dataset/GovernmentBudgetData.xlsx")
    );

    const sheet = workbook.Sheets["Budgets"];

    const budgets = xlsx.utils.sheet_to_json(sheet);
    console.log(budgets);

    for (const item of budgets) {

        const department = await Department.findOne({
            departmentId: item.DepartmentID
        });

        if (!department) {
            console.log(`Department ${item.DepartmentID} not found`);
            continue;
        }

        const exists = await Budget.findOne({
            budgetId: item.BudgetID
        });

        if (exists) {
            console.log(`${item.BudgetID} Already Exists`);
            continue;
        }

        await Budget.create({

            budgetId: item.BudgetID,

            financialYear: item.FinancialYear,

            allocationType: item.AllocationType || "Annual",

            quarter: null,

            departmentId: item.DepartmentID,

            department: department._id,

            allocatedAmount: item.AllocatedBudget,

            utilizedAmount: 0,

            remainingAmount: item.AllocatedBudget,

            utilizationPercentage: 0,

            status: item.Status,

            remarks: "Imported from Government Budget Dataset"

        });

        console.log(`${item.BudgetID} Imported`);

    }

};

module.exports = importBudgets;