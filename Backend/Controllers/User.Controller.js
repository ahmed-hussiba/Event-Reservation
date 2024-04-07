const userModel = require("../Models/userModel");
const path = require("path");
const fs = require("fs");

let getAllUsers = async (req, res) => {
  let users = await userModel.find({});

  if (users) {
    return res.status(200).json({ users });
  }

  return res.status(404).json({ message: "No Users" });
};

let getUser = async (req, res) => {
  let id = req.params.id;
  let user = await userModel.findOne({ _id: id });

  if (user) {
    let imgUrl = user.imageURL;
    let imgPath = path.join(__dirname, "../images/User-Profile-Images", imgUrl);
    let resObj;
    // res.sendFile(path.join(__dirname, "../User-Profile-Images", imgUrl));
    const data = fs.readFileSync(imgPath);
    if (!data) {
      return res.status(200).json({ user });
    }
    const img = Buffer.from(data).toString("base64");
    resObj = {
      user: user,
      imageUser: img,
    };
    //console.log("res", resObj);

    return res.status(200).json({ resObj });
  }

  return res.status(404).json({ message: "User Not Found" });
};

let updateUser = async (req, res) => {
  let newUser = req.body;
  let id = req.params.id;

  ///DON'T UPDATE PASSWORD

  if (newUser.password)
    return res.status(401).json({ message: "can't update password" });

  let updatedUser = await userModel.findOneAndUpdate({ _id: id }, newUser, {
    new: true,
  });

  if (updatedUser) {
    return res.status(200).json({ updatedUser });
  }

  return res.status(404).json({ message: "Bad Request" });
};

let deleteUser = async (req, res) => {
  let id = req.params.id;

  try {
    userModel.findOneAndDelete({ _id: id }, user);
    return res.status(200).json({ message: "User Deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Bad Request" });
  }
};

let addUser = async (req, res) => {
  let newUser = req.body;
  //
  ///Validation ?
  //
  let createdUser = new userModel(newUser);

  createdUser
    .save()
    .then(() => {
      return res.status(201).json({ createdUser });
    })
    .catch((e) => {
      console.log(e);
      return res.status(400);
    });
};

let getUserCart = async (req, res) => {
  let id = req.params.id; 

  let user = await userModel.findOne({ _id: id });

  if (user) {
    let cart = user.cart;
    return res.status(200).json({ cart });
  }

  return res.status(404);
};

let addToUserCart = async (req, res) => {
  let id = req.params.id;
  console.log(id+"****************************");

  let newCartObj = req.body;
  console.log("-------------");
  console.log(newCartObj);
  console.log("id:", id);
  let isValid = validateCartObj(newCartObj);
  if (!isValid) return res.status(400).json({ message: "Bad Request" });
  console.log(id+"****************************");
  let user = await userModel.findOneAndUpdate(
    { _id: id },
    { $push: { cart: newCartObj } },
    { new: true }
  );

  if (user) {
    return res.status(200).json({ user });
  }

  return res.status(404).json({ message: "Not Found" });
};

let deleteFromUserCart = async (req, res) => {
  let id = req.params.id;
  let deletedCartObj = req.body;

  let user = await userModel.findOneAndUpdate(
    { _id: id },
    { $pull: { cart: deletedCartObj } },
    { new: true }
  );

  if (user) {
    return res.status(200).json({ deletedCartObj });
  }

  return res.status(400).json({ message: "Not Found" });
};

function validateCartObj(obj) {
  if (isNaN(+obj.eventId) || isNaN(+obj.quantity) || isNaN(+obj.ticketPrice))
    return false;

  return true;
}

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  addToUserCart,
  getUserCart,
  deleteFromUserCart,
};
