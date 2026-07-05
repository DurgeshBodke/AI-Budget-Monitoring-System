const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");

const importDepartments = require("./departments");
const importBudgets = require("./budgets");
const importUsers = require("./users");
const importExpenses = require("./expenses");
const importAlerts = require("./alerts");

const startImport = async () => {

    try {

        await connectDB();

        console.log("Connected to MongoDB");

        console.log("----------------");

        await importDepartments();

        await importBudgets();

        await importUsers();

        await importExpenses();

        await importAlerts();

        console.log("----------------");

        console.log("Import Completed");

        process.exit();

    }
    catch(err){

        console.log(err);

        process.exit(1);

    }

}

startImport();
