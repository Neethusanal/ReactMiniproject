import React, { useEffect } from 'react'
import './Profile.css'
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const user=useSelector((state)=>state.user)
  console.log(user,"user from store")
  const [cookie,setCookie,removeCookie]=useCookies([])
  const navigate = useNavigate();
  useEffect(()=>{
    const VerifyUser= async()=>{
      console.log(cookie)
      if(!cookie.jwt)
      {
        navigate('/login')
      }
      else{
        const {data}= await axios.post("http://localhost:4000",{},
        { withCredentials:true }
  )
  console.log(data,"login user details")
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
            src="https://in.images.search.yahoo.com/search/images;_ylt=Awr1Snlk6A5kCfUbO9S7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Nj?p=profile+icon+image&type=E210IN91105G0&ei=UTF-8&fr=mcafee&th=122.5&tw=120&imgurl=https%3A%2F%2Ftoppng.com%2Fuploads%2Fpreview%2Ffile-svg-profile-icon-vector-11562942678pprjdh47a8.png&rurl=https%3A%2F%2Fpic-ora.blogspot.com%2F2021%2F05%2Fprofile-image-icon-png.html&size=74KB&name=Profile+Image+Icon+Png+-+pic-ora&oid=20&h=859&w=840&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Bo5gMo2MDR3GDp28toJnhwHaHk%26pid%3DApi%26rs%3D1%26c%3D1%26qlt%3D95%26w%3D120%26h%3D122&tt=Profile+Image+Icon+Png+-+pic-ora&sigr=sPN4ZvqgrAdu&sigit=K747rKtd2GFj&sigi=487Iuk..IRF3&sign=mo5g5LYBEhlf&sigt=mo5g5LYBEhlf"
            alt="Profile"
          />
        </div>
        <div className="details">
          <h3 className="content">Name :{user.name}</h3>
          <h6 className="content">Email :{user.email} </h6>
          <h6 className="content">Phone :{user.phone}</h6>
        </div>
        <div>
          <button
            
          >
            Change image
          </button>
          <button
           
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