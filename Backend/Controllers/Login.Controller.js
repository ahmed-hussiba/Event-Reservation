const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

let Login = async (req, res) => {
  //todo
  //Validation
  //token


  //1)req.body
  user = req.body;
  user.email = user.email.toLowerCase();

  //-- check admin or user

  //2)check db
  let foundUser = await userModel
    .findOne()
    .or([{ email: user.email.toLowerCase() }, { username: user.username }]);
  if (!foundUser) {
    return res.status(404).json({ message: "wrong Email or password" });
  }


  let userEmail = foundUser.email;
  // console.log(user.password);
  // console.log(foundUser.password);
  let passwordCheck = await bcrypt.compare(user.password, foundUser.password);

  if (!passwordCheck)
    return res.status(404).json({ message: "wrong Email or password" });

  const token = await JWT.sign(
    {
      userID: foundUser._id,
      userName: foundUser.username,
      imageURL: foundUser.imageURL,
      userEmail: foundUser.email,
    },
    "private"
  );

  res.header("x-auth-token", "Bearer " + token);
  // console.log(res.header());
  return res.status(200).json({ message: "login success" });
  // return res.send("login Success");
};

module.exports = { Login };
