const jwt = require("jsonwebtoken");

module.exports = (req, res, nxt) => {
  const token = req.header("x-auth-token");
  if (!token) {
    //redirect login or reg
    return res.status(301).json({ msg: "Can't Take Action without login" });
  }

  const data = jwt.verify(token, "private");
  if (!data.userEmail.includes("@admin.com")) {
    return res.status(404).json({ msg: "Access Denied" });
  }
  nxt();
  
};
