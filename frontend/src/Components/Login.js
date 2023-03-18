import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import swal from "sweetalert";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { setUserDetails } from "../Redux/UserSlice";
import { useCookies } from "react-cookie";

export default function Register() {
  const user = useSelector((state) => state.user);
  const [cookie,setCookie,removeCookie]=useCookies([])
  const [errors, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  useEffect(()=>{
    if (!cookie.jwt){
      navigate('/login')
      console.log("userside useeffect")
    }
    else
    {
      navigate('/')
      console.log("else user part")
    }

  },[])
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.email) {
      setError("Email is required");
      return;
    }
    if (!values.password) {
      setError("Password is required");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
    
      if (data) {
        if (data.errors) {
          swal("please check your login details");
        } else {
            // console.log(data.user,"nnnnn")
          dispatch(
            setUserDetails({
              name: data.user.name,
              id: data.user._id,
              email: data.user.email,
              phone: data.user.phone,
              token: data.token,
              image: data.user.image,
            })
          );

          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2 className="heading ">Login</h2>
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
              setValues({ ...values, [e.target.name]: e.target.value })
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
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>

        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}
