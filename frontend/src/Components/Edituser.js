import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edituser = () => {
 const user= useSelector((state)=>state.user)
 console.log(user,"hii 1st")
 const navigate=useNavigate();
 const [userdata,setUserdata]=useState(user);

 const editUser=(e)=>{
    e.preventDefault();

    axios.put("http://localhost:4000/admin/edituser",{...userdata}, { withCredentials: true }).then((response)=>{
      
      if(response.data.status){
        // swal("Edited Successfully")
      }else{
        //swal("something wrong")
      }
      console.log(response,"edituser check")
     })
     navigate('/adminHome')
}

 
  return (
    <div>

<div className="containerss">
      <div className="wrapper">
        <div className="title">
          <span>EDIT USER</span>
        </div>

        <form onSubmit={editUser} >
          <div className="row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={userdata.name}
              onChange={(e) => {
                setUserdata({ ...userdata, name: e.target.value });
              }}
              aria-describedby="name"
              placeholder="Enter name"
            />
           
             
          
          </div>
          <div className="row">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={userdata.email}
              onChange={(e) => {
                setUserdata({ ...userdata, email: e.target.value });
              }}
              className="form-control"
            
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="row">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              value={userdata.phone}
              onChange={(e) => {
                setUserdata({ ...userdata, phone: e.target.value });
              }}
              className="form-control"
              id="phone"
              aria-describedby="phonehelp"
             
              placeholder="Enter phone number"
            />
          </div>

          <div className="row button">
          <button type='submit'>UPDATE USER</button>
          </div>
        </form>
      </div>
      
    </div>



    </div>
  )
}

export default Edituser;