const {adminLogin}= require('../Controllers/AdminController')
const {VerifyAdmin}=require('../Middlewares/AuthAdmin')
const {getUserData}=require('../Controllers/AdminController')
const router = require("express").Router();
router.post('/', adminLogin)
router.get("/userdatas",VerifyAdmin ,getUserData);
 router.get('/deleteuser/:userid',deleteUser)
module.exports = router;