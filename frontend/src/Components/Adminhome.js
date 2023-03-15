import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './AdminHome.css'
import UserSlice from '../Redux/UserSlice';
import { setUserDetails } from '../Redux/UserSlice';

const Adminhome = () => {
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
            console.log(response,"response");
            setAllUsers(response.data.users);
            // setFilterData(response.data.users)
          });
      }
    //   const filterData = (e) => {
    //     if (e.target.vlaue != "") {
    //       setValue(e.target.value);
    //       const filterUsers = allUsers.filter((o) =>
    //         Object.keys(o).some((k) =>
    //           String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
    //         )
    //       );
    //       setSearch([...filterUsers]);
    //     } else {
    //       setValue(e.target.value);
    //       setAllUsers([...allUsers]);
    //     }
    //   };
    
    //   function deleteUser(userId) {
    //     axios
    //       .delete(`http://localhost:4000/admin/deleteuser/${userId}`, {
    //         withCredentials: true,
    //       })
    //       .then((response) => {
    //         if (response.data.status) {
             
    //           getUserList();
    //         } else {
             
    //         }
    //       });
    //   }
    
      return (
        <div className='container'>
        <div className='table'>
            
        
        </div>
        </div>
      );
    };
    
    
    

export default Adminhome;