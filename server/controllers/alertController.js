const Alert = require("../models/Alert");

// Get All Alerts
exports.getAllAlerts = async (req, res) => {
    try {

        const alerts = await Alert.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: alerts.length,
            alerts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Alert By ID
exports.getAlertById = async (req, res) => {
    try {

        const alert = await Alert.findById(req.params.id);

        if (!alert) {
            return res.status(404).json({
                success: false,
                message: "Alert not found"
            });
        }

        res.status(200).json({
            success: true,
            alert
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Alert
exports.updateAlert = async (req, res) => {
    try {

        const alert = await Alert.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!alert) {
            return res.status(404).json({
                success: false,
                message: "Alert not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Alert Updated Successfully",
            alert
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Alert
exports.deleteAlert = async (req, res) => {
    try {

        const alert = await Alert.findById(req.params.id);

        if (!alert) {
            return res.status(404).json({
                success: false,
                message: "Alert not found"
            });
        }

        await alert.deleteOne();

        res.status(200).json({
            success: true,
            message: "Alert Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};