const mongoose = require("mongoose");
const validators = require("validator");
const JWT = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  _id: { type: Number , required:true},
  email: {
    type: String,
    required: true,
    validate: (v) => {
      return validators.isEmail(v);
    },
  },
  password: {
    type: String,
    required: true,
    validate: (v) => {
      return validators.isStrongPassword(v);
    },
  },
  gender: { required: true, type: String, enum: ["F", "M"] },
  username: {
    required: true,
    type: String,
    minLength: 5,
    maxLength: 50,
    trim: true,
  },
  imageURL: { type: String, required: true, pattern: "^(.+)(.jpg|.png|.jpeg|.avif)$" }, 
  city: { required: true, type: String },
  country: { required: true, type: String },
  favourites: { type: [{ eventId: Number, name: String }] },
  cart: {
    type: [
      {
        eventId: Number,
        eventName: String,
        ticketLevel: { type: String, enum: ["golden", "silver", "platinum"] },
        quantity: Number,
        ticketPrice: Number,
      },
    ],
  },
});

// userSchema.methods.genToken = function(){
//     console.log(this.username);
//     const token =  JWT.sign({userID:this._id,userName:this.username},"private");
//     return token;
// }

// userSchema.method("genToken",()=>{
//     console.log(this.username);
//     const token =  JWT.sign({userID:this._id,userName:this.username},"private");
//     return token;
// })

module.exports = mongoose.model("users", userSchema);
