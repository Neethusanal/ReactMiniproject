const {adminLogin}= require('../Controllers/AdminController')
const {VerifyAdmin}=require('../Middlewares/AuthAdmin')
const {getUserData}=require('../Controllers/AdminController')
const {deleteUser}=require('../Controllers/AdminController')
const {editUser}=require('../Controllers/AdminController')
const {addUser}=require('../Controllers/AdminController')
const router = require("express").Router();
router.post('/', adminLogin)
router.get("/userdatas",VerifyAdmin ,getUserData);
 router.delete('/deleteuser/:userId',deleteUser)
 router.put('/edituser', editUser);
 router.post('/adduser', addUser)
module.exports = router;