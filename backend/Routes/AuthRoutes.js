const {register,login}=require('../Controllers/AuthControllers');

const {VerifyUser}=require("../Middlewares/AuthUser")
const router= require("express").Router();

router.post('/',VerifyUser)
router.post("/register",register)
router.post("/login",login)


module.exports=router;