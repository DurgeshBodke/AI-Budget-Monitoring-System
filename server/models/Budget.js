const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
    {
        budgetId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        financialYear: {
            type: String,
            required: true
        },

        allocationType: {
            type: String,
            enum: ["Annual", "Quarterly"],
            required: true
        },

        quarter: {
            type: String,
            enum: ["Q1", "Q2", "Q3", "Q4", null],
            default: null
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

        allocatedAmount: {
            type: Number,
            required: true,
            min: 0
        },

        utilizedAmount: {
            type: Number,
            default: 0
        },

        remainingAmount: {
            type: Number,
            required: true
        },

        utilizationPercentage: {
            type: Number,
            default: 0
        },
        
        allocationDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["Active", "Closed"],
            default: "Active"
        },

        remarks: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Budget", budgetSchema);