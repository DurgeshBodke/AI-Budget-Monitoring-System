const Department = require("../models/Department");

exports.addDepartment = async (req, res) => {
  try {
    const {
      departmentId,
      departmentName,
      departmentCode,
      departmentHead,
      status,
    } = req.body;

    const existingDepartment = await Department.findOne({
      $or: [
        { departmentId },
        { departmentName },
        { departmentCode },
      ],
    });

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department already exists",
      });
    }

    const department = await Department.create({
      departmentId,
      departmentName,
      departmentCode,
      departmentHead,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Department Added Successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllDepartments = async (req, res) => {
    try {

        const departments = await Department.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: departments.length,
            departments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.getDepartmentById = async (req, res) => {
    try {

        const department = await Department.findOne({
            departmentId: req.params.id
        });

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            department
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.updateDepartment = async (req, res) => {
    try {

        const department = await Department.findOneAndUpdate(
            { departmentId: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Department Updated Successfully",
            department
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.deleteDepartment = async (req, res) => {
    try {

        const department = await Department.findOneAndDelete({
            departmentId: req.params.id
        });

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Department Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};