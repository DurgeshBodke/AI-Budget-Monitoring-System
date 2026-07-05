const bcrypt = require("bcryptjs");
const xlsx = require("xlsx");
const path = require("path");

const User = require("../models/User");
const Department = require("../models/Department");

const importUsers = async () => {

    const workbook = xlsx.readFile(
        path.join(__dirname, "../../dataset/GovernmentBudgetData.xlsx")
    );

    const sheet = workbook.Sheets["Users"];

    const users = xlsx.utils.sheet_to_json(sheet);

    for (const item of users) {

        const department = await Department.findOne({
            departmentId: item.DepartmentID
        });

        if (!department) {
            console.log(`Department ${item.DepartmentID} not found`);
            continue;
        }

        const exists = await User.findOne({
            userId: item.UserID
        });

        if (exists) {
            console.log(`${item.UserID} Already Exists`);
            continue;
        }

        const hashedPassword = await bcrypt.hash(item.Password, 10);

        await User.create({

            userId: item.UserID,

            name: item.Name,

            email: item.Email,

            phone: item.Phone,

            password: hashedPassword,

            role: item.Role,

            departmentId: item.DepartmentID,

            isActive: item.IsActive

        });

        console.log(`${item.UserID} Imported`);

    }

};

module.exports = importUsers;