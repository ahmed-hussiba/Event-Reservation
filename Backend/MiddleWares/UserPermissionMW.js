const jwt = require("jsonwebtoken");

///reg or login >>x-auth-token has data   //user or admin   >>email(jwt)
//check user or admin

//if user >>>next
//else

module.exports = (req, res, nxt) => {
  const token = req.header("x-auth-token");
  if (!token) {
    //redirect login or reg
    return res.status(301).json({ msg: "Can't add without login" });
  }
  console.log("MW1");

  const data = jwt.verify(token, "private");
  console.log(data);
  if (data.userEmail.includes("@admin.com")) {
    return res.status(404).json({ msg: "Access Denied" });
  }

  req.body.userID = data.userID;
  // console.log("MW2");
  // console.log(req.body);

  nxt();
  // console.log("MW3");
};

// module.exports = UserPermissionMW;
