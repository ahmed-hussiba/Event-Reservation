const mongoose = require('mongoose')
const validators = require('validator')
/////////
const adminSchema = new mongoose.Schema({
    _id:{type:Number,required:true},
    email:{type:String,required:true, pattern: "^[a-zA-Z0-9._%+-]+@admin.com$"},
    password:{type:String,required:true,validate:v=>{ return validators.isStrongPassword(v)}},
   
}) 

module.exports = mongoose.model("Admin",adminSchema);