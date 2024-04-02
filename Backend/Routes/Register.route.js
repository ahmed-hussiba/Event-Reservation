const express = require("express");
const router = express.Router();
const userController = require("../Controllers/Register.Controller");
const multer = require("multer");
const path = require("path");
const extensions = require("../Utils/Constants")


// let finalName;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../User-Profile-Images"));
  },

  filename: function (req, file, cb) {
    /// favicon.a.png
      n = file.originalname.split(".")[1];
      extensions.setExtensions(n);
    cb(null, "newUser." + n);
  },
});

const upload = multer({ storage });
// upload.single("image");

router.post("/", upload.single("image"), userController.Register);

// router.post("/", upload.single("image"), (req, res) => {
//   res.json({ msg: "added" });
// });

module.exports = router;
