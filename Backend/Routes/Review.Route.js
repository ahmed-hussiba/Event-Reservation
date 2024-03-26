const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/Review.controller')

router.get('/',reviewController.GetReviews)

router.post('/',reviewController.AddReview)

module.exports = router;