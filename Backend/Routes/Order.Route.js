const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/Order.Controller");
const UserPermissionMW = require("../MiddleWares/UserPermissionMW");
const AdminPermissionMW = require("../MiddleWares/AdminPermissionMW");

router.get("/", OrderController.getAllOrders); //admin

router.get("/:id", OrderController.getOrderByID); //user

router.post("/", UserPermissionMW, OrderController.addOrder); //user

router.put("/:id", AdminPermissionMW, OrderController.updateOrder);

router.delete(
  "/admin/:id",
  AdminPermissionMW,
  OrderController.deleteOrderByAdmin
);
router.delete("/user/:id", UserPermissionMW, OrderController.deleteOrderByUser);

module.exports = router;
