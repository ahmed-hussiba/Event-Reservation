const reviewModel = require('../Models/ReviewModel')
const JWT = require('jsonwebtoken');
 
let GetReviews = async (req,res)=>{
    let reviews = reviewModel.find({}).limit(10);
    if(reviews.length>0)
    {
        return res.status(200).json({reviews});   
    }
    return res.status(200).json({message:"no reviews"});
}

let AddReview = async (req,res)=>{
    review = req.body;
    let newReview = new reviewModel()
}

module.exports = {GetReviews,AddReview}