const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/User.Controller");
const AdminPermissionMW = require("../MiddleWares/AdminPermissionMW");
const UserPermissionMW = require("../MiddleWares/UserPermissionMW");
const multer = require("multer");
const path = require("path");
const extensions = require("../Utils/Constants");

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

router.get("/", AdminPermissionMW, UserController.getAllUsers);
router.get("/:id", UserController.getUser);
router.get("/:id/cart", UserController.getUserCart);

router.post("/", UserController.addUser);
router.post("/:id/cart", UserPermissionMW, UserController.addToUserCart);

router.put("/:id", upload.single("image"), UserController.updateUser);
router.put("/:id/cart", UserController.deleteFromUserCart);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
