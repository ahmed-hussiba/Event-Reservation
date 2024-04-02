const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const  path  = require("path");
const  extensions = require("../Utils/Constants");



let Register = async (req, res) => {
  //todo
  //Validation
  //token

  //1)req.body
  // console.log(req.body);
  console.log("req con");
  // console.log(req.file.path);
  user = JSON.parse(req.body.data)
  // req.file.path = "A7aaaaaaaa";
  // console.log(req.file.path);

  let oldPath = path.join(__dirname,"../User-Profile-Images/newUser." + extensions.getExtension())
  let newPath = path.join(__dirname,"../User-Profile-Images/"+ user.username+"." + extensions.getExtension())

  fs.rename(oldPath, newPath,  (err)=> {
    console.log(err);
  })

  user.imageURL  = req.file.path; 

  // console.log(__dirname);
  
  user.email = user.email.toLowerCase();
  //2)check db
  let foundUser = await userModel
    .findOne()
    .or([{ email: user.email.toLowerCase() }, { username: user.username }]);
  //3)if found
  if (foundUser) {
    return res.status(200).json({ message: "already registered" });
  }
  //4) if not found
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  ///
  //Saving IN DB

  // UploadPhoto(user.username);

  // console.log(user.imageURL);

  let newUser = new userModel(user);
  newUser
    .save()
    .then(async () => {
      const token = await JWT.sign(
        {
          userID: newUser._id,
          userName: newUser.username,
          imageURL: newUser.imageURL,
          userEmail: newUser.email,
        },
        "private"
      );
      // const token = newUser.genToken
      // console.log(token);

      res.header("x-auth-token", token);

      // console.log(res.header);

      return res
        .status(201)
        .json({ message: "Registered Successfully", data: newUser });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    });
};

module.exports = { Register };
