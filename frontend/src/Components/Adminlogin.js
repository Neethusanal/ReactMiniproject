import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import './Profile.css'
import { useCookies } from "react-cookie";

const Adminlogin = () => {
  const navigate= useNavigate()
  const [error,setError]=useState("")
  const [cookie,setCookie,removeCookie]=useCookies([])
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!admin.email) {
      setError("Email is required");
      return;
    }
    if (!admin.password) {
      setError("Password is required");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin",
        {
          ...admin,
        },
        {
          withCredentials: true,
        }
      );
    
      if (data) {
        if (data.errors) {
          swal("please check your login details");
        } else{
         
            navigate("/adminHome");
          
         
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
      <h2 className="heading ">Admin Login</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label for="email" class="floatLabel">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) =>
              setAdmin({ ...admin, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label for="password" class="floatLabel">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) =>
              setAdmin({ ...admin, [e.target.name]: e.target.value })
            }
          />
        </div>

        <button type="submit">Submit</button>
       
      </form>
    </div>
    </div>
  )
}

export default Adminlogin