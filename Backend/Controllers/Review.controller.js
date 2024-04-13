const reviewModel = require('../Models/ReviewModel')
const JWT = require('jsonwebtoken');
 
let GetReviews = async (req,res)=>{
    let reviews = await reviewModel.find({}).limit(10);

    console.log(reviews);
    if(reviews.length>0)
    {
        return res.status(200).json({reviews});   
    }
    return res.status(200).json({message:"no reviews"});
}

let AddReview = async (req,res)=>{
    
    const data = req.header("x-auth-token");

    console.log("dataaaaaaaaaaaaaaaaaaaaaaaa:",data);
    let decodedData = JWT.verify(data, "private")

    req.body.imageURl = decodedData["imageURL"];

    req.body.userName = decodedData["userName"];

    
    let newReview = new reviewModel(req.body);

    newReview.save().then(()=> {
        return res.status(201).json({message: "Addedd Successfully", data: newReview});

    })
    .catch(() => {
        return res.status(400).json({message: "Bad Request"});
        
    })

}

module.exports = {GetReviews,AddReview}