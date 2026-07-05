const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");

const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

const recalculateBudgets = async () => {

    try {

        await connectDB();

        console.log("MongoDB Connected");

        const budgets = await Budget.find();

        for (const budget of budgets) {

            const approvedExpenses = await Expense.find({

                budgetId: budget.budgetId,

                status: "Approved"

            });

            const utilized = approvedExpenses.reduce(

                (total, expense) => total + expense.amount,

                0

            );

            budget.utilizedAmount = utilized;

            budget.remainingAmount =

                budget.allocatedAmount - utilized;

            budget.utilizationPercentage =

                budget.allocatedAmount > 0

                    ? Number(

                          (

                              (utilized /

                                  budget.allocatedAmount) *

                              100

                          ).toFixed(2)

                      )

                    : 0;

            await budget.save();

            console.log(

                `${budget.budgetId} Updated -> Utilized: ${utilized}`

            );

        }

        console.log("--------------------------------");

        console.log("All Budgets Recalculated Successfully");

        process.exit();

    } catch (err) {

        console.log(err);

        process.exit(1);

    }

};

recalculateBudgets();