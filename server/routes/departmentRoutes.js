const express = require("express");

const router = express.Router();

const {
    addDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} = require("../controllers/departmentController");

const { departmentValidation } = require("../validators/departmentValidator");
router.post("/", departmentValidation, addDepartment);

router.get("/", getAllDepartments);

router.get("/:id", getDepartmentById);

router.put("/:id", updateDepartment);

router.delete("/:id", deleteDepartment);

module.exports = router;