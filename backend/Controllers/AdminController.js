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
        // console.log(req.body)
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
      {   
        const errors=handleErrors(err)
        res.json({errors,created:false});
    }
    
};
module.exports.getUserData=async(req,res)=>{
    {
        try{

            const users= await UserModel.find();
            // console.log(users)
            res.json({ status: true, message: "success", users:users });
        }catch(err)
        {
console.log(err,"iuytds");
        }
    }
};
module.exports.deleteUser=async(req,res)=>{
    try{
        let userid=req.params.userId
        // console.log(userid)
        const user=await UserModel.deleteOne({_id:userid})
        // console.log(user)
        res.json({ message: "User deleted", status: true });
    }catch(err){
        res.json({ message: "error", status: false });
    }
}

module.exports.editUser=(req,res)=>{
    try{
       console.log("here came")
       
    UserModel.updateOne({_id:req.body.id},{
            $set:{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
            }
 
        }).then((response)=>{
            console.log(response,"waszxdcfgvh")
            res.json({ message: "Updated", status: true });

        })

    }
    catch(err)
    {
        res.json({ message: "Some thing went wrong", status: false })
    }
}
module.exports.addUser=(req,res)=>{
    try{
        UserModel.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone
        }).then((response)=>{
            console.log(response)
            res.json({
                message: "User Created Successfully",
                status: true,
                created: true,
              });
        }) .catch((error) => {
            const errors =  handleErrors(error);
    
            res.json({ errors, status: false, created: false });
          });

    }catch(err){
        res.json({ errors: { message: "Something gone wrong" }, status: false });
    }
}