import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../Redux/UserSlice';
import axios from 'axios';
import swal from 'sweetalert';

const UpdateProfile = () => {
  const user=useSelector((state)=>state.user)
  const dispatch= useDispatch();
  const [image, setImage] = useState("")
  const [cookie,setCookie,removeCookie]=useCookies([])
  const navigate = useNavigate();

  console.log(image,"image file")
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


   if (!data.status) {
    removeCookie("jwt");
    navigate("/login");
  }
};
    }
    VerifyUser();
  },[cookie, navigate, removeCookie]);

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const config={
        headers:{
            "Content-Type": "multipart/form-data",
             userId: user.id,  
        },
        withCredentials: true,
    }
    try{
        const formData= new FormData()
        formData.append("image",image)
        console.log(formData,"lll");
        const { data } = await axios.post(
            "http://localhost:4000/uploadimage",
            formData,
            config
          );
          console.log(data,"data from backend")
          if (data.status) {
            dispatch(
              setUserDetails({
                email: data.user.email,
                id: data.user._id,
                image: data.user.image[0],
                name: data.user.name,
                phone: data.user.phone,
              })
            );
            swal("image upload done")
           
          
            }
  } catch(err){
    
    swal("something gone wrong")
  }
  navigateToProfilePage();
}

const navigateToProfilePage = () => {
    navigate("/profile");
  };
 
  return (
    <div>
         <div className="container" id="cont">
      <div className="profileContainers">
        <div className="images">
          <img style={{height:200,}}
           src={user.image? `http://localhost:4000/${user.image.path}`:"http://localhost:4000/image/user-2517433_1280.png"}/>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className="imgInp"
                type="file"
                name="image"
                onChange={(e)=>{
                    
                    setImage(e.target.files[0]);
                }}
                
                required
              />
              <input className="imgSubmit" type={"submit"} />
            </div>
          </form>
      
        </div>
        <div>
          <button
            className="homeb"
            onClick={() => {
              navigate("/profile");
            }}
          >
            PROFILE
          </button>
        </div>
      </div>
    </div>
  

    </div>
  )
}

export default UpdateProfile