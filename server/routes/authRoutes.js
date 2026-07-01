const express = require("express");

const router = express.Router();

const { register } = require("../controllers/authController");

const { registerValidation } = require("../validators/userValidator");

router.post("/register", registerValidation, register);

module.exports = router;