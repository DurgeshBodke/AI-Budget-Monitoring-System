const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");

const importDepartments = require("./departments");
const importBudgets = require("./budgets");

const startImport = async () => {

    try {

        await connectDB();

        console.log("Connected to MongoDB");
        console.log("---------------------------");

        await importDepartments();

        console.log("---------------------------");

        await importBudgets();

        console.log("---------------------------");

        console.log("Data Import Completed");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }

};

startImport();