import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { setUserDetails } from "../Redux/UserSlice";
import swal from 'sweetalert';






export default function Home() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    const VerifyUser = async () => {
      console.log(cookie)
      if (!cookie.jwt) {
        navigate("/login");
      } else {

        const { data } = await axios.post(
          "http://localhost:4000/",
          {},
          { withCredentials: true }
        );
      
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
        // swal( ` hi ${user.name}`)
        }
      }
    };
    VerifyUser();
  }, [cookie, navigate, removeCookie]);
 

  const logOut = () => {
    dispatch(
      setUserDetails({
        name: null,
        id: null,
        image: null,
        phone: null,
        email: null,
        token: null,
      })
    );
    removeCookie("jwt");
    navigate("/login");
  };
 
  return (
    <>
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Welcome {user.name}  </h1>
      <div  >
        <button  
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </button>
        <button onClick={logOut}>Logout</button>
      </div>
    </div>
  
  </>
);
}
