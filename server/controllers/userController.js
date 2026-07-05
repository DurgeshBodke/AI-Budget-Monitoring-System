const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get All Users
exports.getUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Create User
exports.createUser = async (req, res) => {

    try {

        const {
            userId,
            name,
            email,
            phone,
            password,
            role,
            departmentId
        } = req.body;

        const existing = await User.findOne({
            $or: [
                { userId },
                { email }
            ]
        });

        if (existing) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            userId,
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            departmentId

        });

        res.status(201).json({

            success: true,
            message: "User Created Successfully",
            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Delete User
exports.deleteUser = async (req, res) => {

    try {

        const user = await User.findOneAndDelete({
            userId: req.params.id
        });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.status(200).json({

            success: true,
            message: "User Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};