const mongoose=require('mongoose')
const bcrypt = require("bcrypt")
const userSchema=  new mongoose.Schema({

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
    phone:{
        type:Number,
        required:[true,"phone no is required"],
        unique : true
    },

})
userSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt)
})
module.exports=UserModel= mongoose.model('Users',userSchema)
