const express = require("express");
const router = express.Router();
const reviewController = require("../Controllers/Review.controller");
const UserPermissionMW = require("../MiddleWares/UserPermissionMW");

router.get("/", reviewController.GetReviews);

router.post("/", reviewController.AddReview); //user

module.exports = router;
