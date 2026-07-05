const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/alerts", require("./routes/alertRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/users", require("./routes/userRoutes"));  
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test Route
app.use((req, res, next) => {

    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    next();

});
app.get("/", (req, res) => {
    res.send("AI Budget Monitoring System Backend is Running...");
});

module.exports = app;