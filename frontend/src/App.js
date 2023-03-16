import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/HomePage';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage'
import Profile from './Pages/ProfilePage';
import UpdateProfile from './Pages/UpdateProfilePage'
import Adminlogin from './Pages/AdminloginPage';
import Adminhome from './Pages/AdminHomePage';
import Edituserpage from './Pages/Edituserpage';
import Adduserpage from './Pages/Adduserpage';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/register'  element={<Register/>}/>
  

        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/UpdateProfile' element={<UpdateProfile/>}/>
        <Route exact path='/Adminlogin' element={<Adminlogin/>}/>
        <Route exact path='/Adminhome' element={<Adminhome/>}/>
        <Route exact path='/edituser' element={<Edituserpage/>}/>
        <Route exact path='/adduser' element={<Adduserpage/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}
