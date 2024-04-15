const express = require("express");
const router = express.Router();
const userController = require("../Controllers/Register.Controller");
const multer = require("multer");
const path = require("path");
const extensions = require("../Utils/Constants");

// let finalName;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images/User-Profile-Images"));
  },

  filename: function (req, file, cb) {
    /// favicon.a.png
    n = file.originalname.split(".")[1];
    // console.log("imagggge");
    // console.log(file.originalname);
    // console.log("imagggge");
    extensions.setExtensions(n);
    cb(null, "newUser." + n);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), userController.Register);
module.exports = router;
