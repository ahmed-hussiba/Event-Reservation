const reviewModel = require("../Models/ReviewModel");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

let GetReviews = async (req, res) => {
  let reviewsWithImgs = [];
  let reviews = await reviewModel.find({}).limit(10);
  for (let review of reviews) {
    let imgUrl = review.imageURl;
    let imgPath = path.join(__dirname, "../images/User-Profile-Images", imgUrl);
    if (imgPath) {
      const data = fs.readFileSync(imgPath);
      const imgBuffer = Buffer.from(data).toString("base64");

      let ReviewWithImg = {
        review: review,
        imgBuffer: imgBuffer,
      };
      reviewsWithImgs.push(ReviewWithImg);
    }
  }
  if (reviews.length > 0) {
    return res.status(200).json({ reviewsWithImgs });
  }
  return res.status(200).json({ message: "no reviews" });
};

let AddReview = async (req, res) => {
  const data = req.header("x-auth-token");

  console.log("data " + data)

  let decodedData = JWT.verify(data, "private");

  req.body.imageURl = decodedData["imageURL"];

  req.body.username = decodedData["userName"];

  console.log(req.body);
  let newReview = new reviewModel(req.body);

  newReview
    .save()
    .then(() => {
      return res
        .status(201)
        .json({ message: "Addedd Successfully", data: newReview });
    })
    .catch(() => {
      return res.status(400).json({ message: "Bad Request" });
    });
};

module.exports = { GetReviews, AddReview };
