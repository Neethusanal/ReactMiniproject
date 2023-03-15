const mongoose=require('mongoose')
const bcrypt = require("bcrypt")
const adminSchema=  new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name is required"],
    },
    
    email:{
        type:String,
        required:[true,"Email is required"],
        unique : true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        
    },
})
module.exports=AdminModel= mongoose.model('admins',adminSchema)