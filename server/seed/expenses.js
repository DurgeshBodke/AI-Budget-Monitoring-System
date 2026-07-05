const xlsx = require("xlsx");
const path = require("path");

const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const Department = require("../models/Department");

const importExpenses = async () => {

    const workbook = xlsx.readFile(
        path.join(__dirname, "../../dataset/GovernmentBudgetData.xlsx")
    );

    const sheet = workbook.Sheets["Expenses"];

    const expenses = xlsx.utils.sheet_to_json(sheet);

    for (const item of expenses) {

        const budget = await Budget.findOne({
            budgetId: item.BudgetID
        });

        const department = await Department.findOne({
            departmentId: item.DepartmentID
        });

        if (!budget || !department) {

            console.log(`${item.ExpenseID} Skipped`);

            continue;

        }

        const exists = await Expense.findOne({

            expenseId: item.ExpenseID

        });

        if (exists) {

            console.log(`${item.ExpenseID} Already Exists`);

            continue;

        }

        await Expense.create({

            expenseId: item.ExpenseID,

            budgetId: item.BudgetID,

            budget: budget._id,

            departmentId: item.DepartmentID,

            department: department._id,

            category: item.Category,

            amount: item.Amount,

            expenseDate: item.ExpenseDate,

            description: item.Description,

            supportingDocument: item.SupportingDocument,

            status: item.Status,

            paymentMode: item.PaymentMode

        });

        console.log(`${item.ExpenseID} Imported`);

    }

};

module.exports = importExpenses;