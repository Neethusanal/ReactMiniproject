const {register,login}=require('../Controllers/AuthControllers');
const {VerifyUser}=require("../Middlewares/AuthUser")
const {uploadOptions}=require('../Middlewares/uploadImage')
const {updateProfile}= require('../Controllers/UserController')
const router= require("express").Router();

router.post('/',VerifyUser)
router.post("/register",register)
router.post("/login",login)
router.post("/uploadimage",
    VerifyUser,
    uploadOptions,
    updateProfile
  );


module.exports=router;