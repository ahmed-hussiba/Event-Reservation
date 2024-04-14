const express = require("express");
const router = express.Router();

const EventController = require("../Controllers/Event.Controller");
const AdminPermissionMW = require("../MiddleWares/AdminPermissionMW");
const multer = require("multer");
const path = require("path");
const extensions = require("../Utils/Constants");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images/Event-Images"));
  },

  filename: function (req, file, cb) {
    /// favicon.a.png
    n = file.originalname.split(".")[1];
    extensions.setExtensions(n);
    console.log(n);
    console.log(`img=${file.originalname}`);

    cb(null,"newEvent."+n);
  },
});

const upload = multer({ storage });

router.get("/", EventController.GetAllEvents);
router.get("/promoted", EventController.GetPromotedEvents);
router.get("/:id", EventController.GetEventByID);
router.get("/category/:name", EventController.GetEventByCategoryName);


// router.post('/',AdminPermissionMW,EventController.AddEvent);

router.post("/", upload.single("image"), EventController.AddEvent);
router.put("/:id", AdminPermissionMW, EventController.UpdateEvent);
router.delete("/:id", AdminPermissionMW, EventController.DeleteEventByID);

module.exports = router;
