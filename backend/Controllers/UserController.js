
const UserModel=require('../Models/UserModel')

module.exports.getprofile=async(req,res,next)=>{
    try{
        const user= await UserModel.findById(req.user._id)
        console.log(user)
        

    }catch(err){

    }
}
