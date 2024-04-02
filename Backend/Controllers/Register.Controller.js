const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const extensions = require("../Utils/Constants");



let Register = async (req, res) => {
  user = JSON.parse(req.body.data)
  user.imageURL = req.file.path;


  user.email = user.email.toLowerCase();
  //2)check db
  let foundUser = await userModel
    .findOne()
    .or([{ email: user.email.toLowerCase() }, { username: user.username }]);


  let oldPath = path.join(__dirname, "../User-Profile-Images/newUser." + extensions.getExtension())
  let newPath = path.join(__dirname, "../User-Profile-Images/" + user.username + "." + extensions.getExtension())

  //3)if found
  if (foundUser) {
    fs.unlink(oldPath, (err) => {
      console.log(err);
    })
    return res.status(200).json({ message: "already registered" });
  }



  //4) if not found
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  ///
  //Saving IN DB


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


      res.header("x-auth-token", token);

      fs.rename(oldPath, newPath, (err) => {
        console.log(err);
      })
      return res
        .status(201)
        .json({ message: "Registered Successfully", data: newUser });
    })
    .catch((err) => {

      fs.unlink(oldPath, (err) => {
        console.log(err);
      })
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    });
};

module.exports = { Register };
