const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');
 
let Register = async (req,res)=>{
    //todo
    //Validation
    //token

    //1)req.body
    user = req.body;
    user.email = user.email.toLowerCase();
    console.log(user.imageURL);
    //2)check db
    let foundUser = await userModel.findOne().or([{email:user.email.toLowerCase()},{username:user.username}]);
    //3)if found
    if(foundUser)
    {
        return res.status(200).json({message:"already registered"});
    }
    //4) if not found
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    let newUser = new userModel(user);
    newUser.save().then(async ()=>{
        const token = await JWT.sign({userID:newUser._id,userName:newUser.username,imageURL:newUser.imageURL},"private");
        // const token = newUser.genToken
        console.log(token);

        res.header("x-auth-token",token);

        // console.log(res.header);

        return res.status(201).json({message:"Registered Successfully",data:newUser})
    })
    .catch((err)=>{
        console.log(err);
        return res.status(400).json({message:"Bad Request"});
    })

}

module.exports = {Register}