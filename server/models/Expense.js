const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        expenseId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        budgetId: {
            type: String,
            required: true
        },

        budget: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Budget",
            required: true
        },

        departmentId: {
            type: String,
            required: true
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        expenseDate: {
            type: Date,
            required: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        supportingDocument: {
            type: String,
            default: ""
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        },

        paymentMode: {
            type: String,
            enum: ["Cash", "Bank Transfer", "Cheque", "UPI", "NEFT"],
            default: "Bank Transfer"
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Expense", expenseSchema);