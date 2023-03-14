import React, { useEffect } from 'react'
import './Profile.css'
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Profile = () => {
  const user=useSelector((state)=>state.user)
 

  const [cookie,setCookie,removeCookie]=useCookies([])
  const navigate = useNavigate();
  useEffect(()=>{
    const VerifyUser= async()=>{
    
      if(!cookie.jwt)
      {
        navigate('/login')
      }
      else{
        const {data}= await axios.post("http://localhost:4000",{},
        { withCredentials:true }
  )


   if (!data.status) {
    removeCookie("jwt");
    navigate("/login");
  }
};
    }
    VerifyUser();
  },[cookie, navigate, removeCookie, user]);
 

  return (
    <div >
<div className="container">
      <div className="profileContainer">
        <div className="image">
          <img
            src={user.image? `http://localhost:4000/${user.image.path}`:"http://localhost:4000/image/user-2517433_1280.png"}
            alt="Profile"
          />
        </div>
        <div className="details">
          <h3 className="content">Name : { user.name }</h3>
          <h6 className="content">Email :{ user.email } </h6>
          <h6 className="content">Phone :{ user.phone }</h6>
        </div>
        <div>
          <button
              onClick={() => {
                navigate("/updateProfile");
              }}
          >
            Change image
          </button>
          <button
           onClick={() => {
            navigate("/");
          }}
           
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Profile