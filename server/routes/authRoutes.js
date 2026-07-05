const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

const {
    registerValidation
} = require("../validators/userValidator");

router.post("/register", registerValidation, register);

router.post("/login", login);

module.exports = router;