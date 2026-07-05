const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    }

});

const fileFilter = (req, file, cb) => {

    const allowed = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (allowed.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(new Error("Only PDF, JPG, JPEG and PNG allowed"));

    }

};

module.exports = multer({

    storage,

    fileFilter

});