import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../index.css'
import swal from 'sweetalert';
import axios from 'axios';
import './Login.css'


export default function Register() {
    const navigate=useNavigate();
    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        phone:""
        })
        
        const handleSubmit=async (e)=>{
            e.preventDefault()
         
            try{

                const {data}=await axios.post("http://localhost:4000/register",{
                    ...values,
                },{
                    withCredentials:true,
                });
                
                if(data){
                    if(data.errors){
                        swal("Email already registered")
                    }else{
                        swal("Registration succesful")
                       setTimeout( navigate('/login'),1000);
                    }
                }
            }catch(err){
                    console.log(err,"login error")
            }

        }
  return (
    <div className='container'>
        <h2 className='heading'>Register Account</h2>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div>
                <label for="name" class="floatLabel">Full Name</label>
			    <input type="name" name="name" placeholder='Fullname'  onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
                </div>
                <div>
                <label for="email" class="floatLabel">Email</label>
			    <input type="email" name="email" placeholder='email'onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
                </div>
                <div>
                <label for="password" class="floatLabel">Password</label>
			    <input type="password" name="password" placeholder='password'onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
                </div>
                <div>
                <label for="phone" class="floatLabel">Phone</label>
			    <input type="phone" name="phone" placeholder='phone'onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
                </div>
                <button type="submit">Submit</button>
                <span>Already have an account? <Link to='/login'>Login</Link></span>
               
            </form>

    </div>
  )
}
