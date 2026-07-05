const express = require("express");

const router = express.Router();

const {
    getAllAlerts,
    getAlertById,
    updateAlert,
    deleteAlert
} = require("../controllers/alertController");

router.get("/", getAllAlerts);

router.get("/:id", getAlertById);

router.put("/:id", updateAlert);

router.delete("/:id", deleteAlert);

module.exports = router;