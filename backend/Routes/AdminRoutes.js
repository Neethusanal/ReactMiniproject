const {adminLogin}= require('../Controllers/AdminController')
const {VerifyAdmin}=require('../Middlewares/AuthAdmin')
const {getUserData}=require('../Controllers/AdminController')
const {deleteUser}=require('../Controllers/AdminController')
const {editUser}=require('../Controllers/AdminController')
const {addUser}=require('../Controllers/AdminController')
const router = require("express").Router();
router.post('/', adminLogin)
router.get("/userdatas",VerifyAdmin ,getUserData);
 router.delete('/deleteuser/:userId',VerifyAdmin,deleteUser)
 router.put('/edituser',VerifyAdmin, editUser);
 router.post('/adduser',VerifyAdmin, addUser)
module.exports = router;