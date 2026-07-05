const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
{
    alertId:{
        type:String,
        required:true,
        unique:true
    },

    budgetId:{
        type:String,
        required:true
    },

    departmentId:{
        type:String,
        required:true
    },

    alertType:{
        type:String,
        enum:[
            "Overspending",
            "Under Utilization",
            "Spending Spike",
            "Budget Exhaustion"
        ],
        required:true
    },

    severity:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High",
            "Critical"
        ],
        required:true
    },

    message:{
        type:String,
        required:true
    },

   status:{
        type:String,
        enum:["Open","Resolved"],
        default:"Open"
    },
},
{
    timestamps:true
});

module.exports = mongoose.model("Alert",alertSchema);