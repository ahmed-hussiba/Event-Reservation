const mongoose = require("mongoose")
const validate = require("validator")

const ReviewSchema = new mongoose.Schema({
    body:{type:String,minLength:10,maxLength:50},
    username:{type:String},
    imageURl:{type:String}
})

module.exports = mongoose.model("WebInfo", ReviewSchema);