
const UserModel=require('../Models/UserModel')

module.exports.updateProfile=async(req,res,next)=>{
    try{
        // console.log("update profiljje")
        // console.log(req.headers,"kk");
      
        req.files.image[0].path=await req.files.image[0].path.replace("public","");
          console.log(req.files.image[0].path,"ggggggg");
        const users= await UserModel.findOne({_id : req.headers.userid})
        console.log(users,"user data after image change")
        if(users)
        {
            await UserModel.findByIdAndUpdate({_id:req.headers.userid},{
                $set:{
                    image:req.files.image[0],
                },
            });
            console.log("start");
            let user = await UserModel.findOne({ _id: req.headers.userid });
            console.log(user,"lllllllll");

         res.json({ message: "Image uploaded successfully", user, status: true });
        }else{
            console.log("err");
        }

    }
        

    catch(err){
console.log(err);
    }
}
