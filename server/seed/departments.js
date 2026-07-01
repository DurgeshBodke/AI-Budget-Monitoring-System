const xlsx = require("xlsx");
const path = require("path");

const Department = require("../models/Department");

const importDepartments = async () => {

    const workbook = xlsx.readFile(
        path.join(__dirname, "../../dataset/GovernmentBudgetData.xlsx")
    );

    const sheet = workbook.Sheets["Departments"];

    const departments = xlsx.utils.sheet_to_json(sheet);

    for (const department of departments) {

        const exists = await Department.findOne({
            departmentId: department.DepartmentID
        });

        if (!exists) {

            await Department.create({

                departmentId: department.DepartmentID,
                departmentName: department.DepartmentName,
                departmentCode: department.DepartmentCode,
                departmentHead: department.DepartmentHead,
                status: department.Status

            });

            console.log(`${department.DepartmentID} Imported`);

        } else {

            console.log(`${department.DepartmentID} Already Exists`);

        }

    }

};

module.exports = importDepartments;