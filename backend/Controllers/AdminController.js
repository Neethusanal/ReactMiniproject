const AdminModel=require('../Models/AdminModel');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel');
const maxAge = 3 * 24 * 60 * 60;
const createToken= (id)=>{
    return jwt.sign({id},"secret key",{expiresIn:maxAge})
}
const handleErrors=(err)=>{
    let errors={email:"",password:""}
    if(err.code===11000)
    {
        errors.email="email is already registered";
        return errors;
    }
    if(err.message.includes("user validation failed"))
    {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        })
    }
    return errors;
}
module.exports.adminLogin=async(req,res)=>{

    try{
        const {email,password}=req.body;
        console.log(req.body)
        const admin = await AdminModel.findOne({email})
        console.log(admin)
        if(admin)
        {
            const validatePassword= await bcrypt.compare(password,admin.password);
            if(validatePassword){
                const token=createToken(admin._id)

                res.cookie("jwt",token,{
                    withCredentials:true,
                    httpOnly:false,
                    maxAge:maxAge*1000
                })
             
                res.status(200).json({admin,created:true})
                
            }
            else
            {
                const errors={password:" email or password is incorrect"}
                res.json({errors,created:false})
            }
        
        }else{
            const errors={email:"No admin with this email id"}
            res.json({errors,created:false})
        }
            
        

    }catch(err)
    {   console.log(err)
        const errors=handleErrors(err)
        res.json({errors,created:false});
    }
    
};
module.exports.getUserData=async(req,res)=>{
    {
        try{

            const users= await UserModel.find({});
            //console.log(users)
            res.json({ status: true, message: "success", users });
        }catch(err)
        {

        }
    }
};
module.exports.deleteUser=async(req,res)=>{
    try{
        let userid=req.params.userid
        console.log(userid)
        const user=await UserModel.findByIdAndDelete({_id:userid})
        console.log(user)

    }catch(err){

    }
}
