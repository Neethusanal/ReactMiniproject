import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './AdminHome.css'

import { setUserDetails } from '../Redux/UserSlice';
import { setAdminDetails } from '../Redux/AdminSlice';






const Adminhome = () => {
    const [user,setUser]=useState();
    const navigate=useNavigate();
    const [cookie,setCookie,removeCookie]=useCookies([])
    const [allUsers,setAllUsers]=useState([])
    const dispatch= useDispatch();
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("");


    useEffect(()=>{
        if (!cookie.jwt) {
         
            navigate("/admin");
        }
        getUserList()
       
    },[cookie, navigate, removeCookie]);

    function getUserList() {
        axios
          .get("http://localhost:4000/admin/userdatas", { withCredentials: true })
          .then((response) => {
           
            setUser(response.data.users);
            setAllUsers(response.data.users)
            
          });
          
      }
   
    
      function deleteUser(userId) {
        console.log(userId)
        axios
          .delete(`http://localhost:4000/admin/deleteuser/${userId}`,{
            withCredentials: true,
          })
          .then((response) => {
            if (response.data.status) {
             
              getUserList();
            } else {
             
            }
          });
      }
      const filterData = (e) => {
        if (e.target.vlaue != "") {
          setValue(e.target.value);
          const filterUsers = allUsers.filter((o) =>
            Object.keys(o).some((k) =>
              String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
            )
          );
          setSearch([...filterUsers]);
        } else {
          setValue(e.target.value);
          setAllUsers([...allUsers]);
        }
      };

    
      return (
        <div className='container'>
          <h1>USER LIST</h1>
        <div className='table'>
        <div className='displaybtn'>
            <button onClick={()=>{
              navigate('/adduser')
            }}>Add User</button> {"  "}
            <button onClick={()=>{
               dispatch(
                setAdminDetails({
                  email: null,
                  token: null,
                })
              );
  
              removeCookie("jwt");
              navigate("/adminlogin");
            }}>Logout</button>
             <div class="input-group">
             <input
          type="text"
          id="search"
          value={value}
          name="search"
          onChange={filterData}
          className="form-control"
          placeholder="search.."
        />
            
            </div>  
        </div>
        
       
        <Table striped bordered hover>
      <thead className='nameheading'>
     
        <tr>
          <th>No</th>
          <th> Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {value.length > 0
            ? search.map((user, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button className="editBtn" onClick={()=>{
                      dispatch(
                        setUserDetails({
                          name: user.name,
                          email: user.email,
                          phone: user.phone,
                          id: user._id,
                          image: user.image,
                        })
                      )
                      navigate('/edituser')
                    }}>Edit</button>

                    <button className="deleteBtn" onClick={()=>{
                      deleteUser(user._id)
                    }}>Delete</button>
                  </td>
                </tr>
              );  
        }):
        user&&  user.map((user,key)=>{
          return (
          <tr key={key}>
            <td>{key + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <button className="editBtn" onClick={()=>{
                dispatch(
                  setUserDetails({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    id: user._id,
                    image: user.image,
                  })
                )
                navigate('/edituser')
              }}>Edit</button>

              <button className="deleteBtn" onClick={()=>{
                deleteUser(user._id)
              }}>Delete</button>
            </td>
          </tr>
        );  
  })
      }
       
        
      </tbody>
    </Table>
        </div>
        </div>
      );
    };
    
    
    

export default Adminhome;