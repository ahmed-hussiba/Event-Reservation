const mongoose = require("mongoose")
const validate = require("validator")

const webInfoSchema = new mongoose.Schema({

    email:{type:String,required:true,validate:v=>{ return validators.isEmail(v)}},
    phone:{type:Number, pattern: "^(011|012|015)\d{8}$"},
    reviews: {type:[String]},
    description: {type:String}
    
})

module.exports = mongoose.model("WebInfo", webInfoSchema);