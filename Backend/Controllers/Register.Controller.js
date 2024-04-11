const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const extensions = require("../Utils/Constants");
const { log } = require("console");

let Register = async (req, res) => {
  user = JSON.parse(req.body.data);

  user.email = user.email.toLowerCase();
  //2)check db
  // let foundUser;
  // try {
    let foundUser = await userModel
      .findOne()
      .or([{ email: user.email.toLowerCase() }, { username: user.username }]);

  // } catch (err) {
  //   console.log("ERROR CAUGHT REGISTER CONTROLLER FOUND USER");
  //   console.log(err);
  // }
  let oldPath = path.join(
    __dirname,
    "../images/User-Profile-Images/newUser." + extensions.getExtension()
  );
  let newPath = path.join(
    __dirname,
    "../images/User-Profile-Images/" +
    user.username +
    "." +
    extensions.getExtension()
  );

  //3)if found
  if (foundUser) {
    fs.unlink(oldPath, (err) => {
      console.log(err);
    });
    return res.status(200).json({ message: "already registered" });
  }

  //4) if not found
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  ///
  //Saving IN DB

  let latestID = await userModel.findOne().sort({_id:-1});
  console.log(latestID);
  let newId = 1;
  
  if (latestID) {
    newId = +latestID._id + 1;
  }

  user._id = newId;
  console.log(newId);

  user.imageURL = user.username + "." + extensions.getExtension();
  let newUser = new userModel(user);
  newUser
    .save()
    .then(async () => {
      const token = JWT.sign(
        {
          userID: newUser._id,
          userName: newUser.username,
          imageURL: newUser.imageURL,
          userEmail: newUser.email,
        },
        "private"
      );

      // console.log(token);
      res.header("x-auth-token","Bearer " + token);

      fs.rename(oldPath, newPath, (err) => {
        console.log(err);
      });

      return res
        .status(201)
        .json({ message: "Registered Successfully", data: newUser });
    })
    .catch((err) => {
      fs.unlink(oldPath, (err) => {
        console.log(err);
      });
      console.log("ERROR CAUGHT REGISTER CONTROLLER SAVING USER");
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    });
};

module.exports = { Register };
