const orderModel = require("../Models/OrderModel");
const userController = require("../Controllers/User.Controller");
//get (Admin)
let getAllOrders = async (req, res) => {
  let AllOrders = await orderModel.find({});
  if (!AllOrders) {
    return res.status(200).json({ msg: "No Orders exists" });
  }
  return res.status(200).json({ data: AllOrders });
};

//getById //to Show My Order (user)
let getOrderByID = (req, res) => {};

//add (user)
let addOrder = (req, res) => {
 

  let order = req.body;
  console.log(order);
  order.date = new Date();

  let newOrder = new orderModel(order);

  newOrder  
    .save()
    .then(() => {
      userController.deleteUserCart(order.userID)
      return res
        .status(200)
        .json({ msg: "Added Successfully", data: newOrder });
    })
    .catch(() => {
      return res.status(400).json({ msg: "Bad Request" });
    });
};

//update (Admin)>>(Edit State of order)
let updateOrder = async (req, res) => {
  let id = req.params.id;

  let foundOrder = await orderModel.findByIdAndUpdate(id, req.body, {
    returnOriginal: false,
  });
  console.log(foundOrder);
  if (!foundOrder) {
    return res.status(404).json({ msg: "NotFound" });
  }
  return res
    .status(200)
    .json({ msg: "Updated Successfully", data: foundOrder });
};

//delete
let deleteOrderByAdmin = async (req, res) => {
  let id = req.params.id;

  let foundOrder = await orderModel.findByIdAndDelete(id);
  // console.log(foundOrder);
  if (!foundOrder) {
    return res.status(404).json({ msg: "NotFound" });
  }
  return res
    .status(200)
    .json({ msg: "Deleted Successfully", data: foundOrder });
};

let deleteOrderByUser = async (req, res) => {
  let id = req.params.id;

  let foundOrder = await orderModel.findOne({ _id: id });
  console.log(req.body.userID);
  if (!foundOrder) {
    return res.status(404).json({ msg: "NotFound" });
  } else if (
    foundOrder.state != "pending" ||
    foundOrder.userID != req.body.userID
  ) {
    return res.status(404).json({ msg: "Access denied" });
  }

  let deleteOrder = await orderModel.findByIdAndDelete(id);
  // console.log(foundOrder);
  if (!deleteOrder) {
    return res.status(404).json({ msg: "NotFound" });
  }
  return res
    .status(200)
    .json({ msg: "Deleted Successfully", data: deleteOrder });
};

module.exports = {
  getAllOrders,
  getOrderByID,
  addOrder,
  updateOrder,
  deleteOrderByAdmin,
  deleteOrderByUser,
};
