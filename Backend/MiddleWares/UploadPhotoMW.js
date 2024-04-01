const multer = require("multer");
const path = require("path");

module.exports = (req, res, nxt) => {
  let finalName;
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../User-Profile-Images"));
    },

    filename: function (req, file, cb) {
      /// favicon.a.png
      n = file.originalname.split(".")[1];
      finalName = name + "." + n;
      cb(null, finalName);
    },
  });

  const upload = multer({ storage });
  upload.single("image");

  //   req.body.imageURL = finalName;

  nxt();
};
