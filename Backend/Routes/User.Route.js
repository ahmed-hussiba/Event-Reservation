const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/User.Controller");
const AdminPermissionMW = require("../MiddleWares/AdminPermissionMW");
const UserPermissionMW = require("../MiddleWares/UserPermissionMW");


router.get("/", AdminPermissionMW, UserController.getAllUsers);
router.get("/:id", UserController.getUser);
router.get("/:id/cart", UserController.getUserCart);


router.post("/", UserController.addUser);
router.post("/:id/cart", UserPermissionMW, UserController.addToUserCart);


router.put("/:id", UserPermissionMW, UserController.updateUser);
router.put("/:id/cart", UserController.deleteFromUserCart);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
