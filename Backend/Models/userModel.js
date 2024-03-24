const mongoose = require('mongoose')
const validators = require('validator')
const userSchema = new mongoose.Schema({
    _id:{type:Number,required:true},
    email:{type:String,required:true,validate:v=>{ return validators.isEmail(v)}},
    password:{type:String,required:true,validate:v=>{ return validators.isStrongPassword(v)}},
    gender:{required:true,type:String,enum:['F','M']},
    username:{required:true,type:String,minLength:5,maxLength:50,trim:true},
    imageURl:{type:String,required:true,pattern:"^(.+)(\.jpg|\.png)$"},
    city: {required:true,type:String},
    country: {required:true,type:String},
    favourites:{type:[{eventId:Number,name:String}]},
    cart:{type:[{eventId:Number,eventName:String,ticketLevel:String,quantity:Number,ticketPrice:Number}]}
}) 

module.exports = mongoose.model("users",userSchema);