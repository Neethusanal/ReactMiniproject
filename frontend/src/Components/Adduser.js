import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert'





const Adduser = () => {
   const navigate= useNavigate();
   const [values,setValues]=useState(
    {
        name:"",
        email:"",
        phone:"",
        password:"",
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(values);
        axios
            .post(
              "http://localhost:4000/admin/adduser",
              { ...values },
              { withCredentials: true }
            )
            .then((response) => {
              console.log(response.data);
              if (response.data.status) {
               swal("User Ceated successfully")
                        
              } else {
                swal("something wrong happened")
              }
            })
            navigate('/adminHome')
        }
  

  return (
    <div>
<div className="containers">
      <div className="wrapper">
        <div className="title">
          <span>ADD USER</span>
        </div>

        <form  onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e)=>{
              setValues({...values,name:e.target.value})
              }}
              
            />
          </div>
          <div className="row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e)=>{
                setValues({...values,email:e.target.value})
                }}
            />
          </div>
          <div className="row">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={(e)=>{
                setValues({...values,phone:e.target.value})
                }}
            />
          </div>
          <div className="row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e)=>{
                setValues({...values,password:e.target.value})
                }}
            />
          </div>

          <div className="row button">
            <input type="submit" value="ADD USER" />
          </div>
        </form>
      </div>
      
    </div>


    </div>
  )
}

export default Adduser