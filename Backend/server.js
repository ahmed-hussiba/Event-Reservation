const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config()
const PORT = process.env.PORT;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// model = require('./Models/userModel')

mongoose.connect("mongodb://localhost:27017/EventReservation")
.then(()=>
{
    app.listen(PORT,()=>{console.log("listening on port http://localhost:"+PORT);})
})
.catch(()=>
{
    console.log("error in connection");
})