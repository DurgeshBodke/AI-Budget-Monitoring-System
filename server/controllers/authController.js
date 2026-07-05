const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                success: false,
                errors: errors.array()
            });

        }

        const {
            userId,
            name,
            email,
            phone,
            password,
            role,
            departmentId
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
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
            message: "User Registered Successfully",
            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                userId: user.userId,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};