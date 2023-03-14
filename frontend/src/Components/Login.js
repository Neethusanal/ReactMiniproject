import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './Login.css'
import swal from 'sweetalert';
import axios from 'axios';



export default function Register() {
    const [errors,setError]=useState("")
    const navigate =useNavigate()
    const [values,setValues] = useState({
        
        email:"",
        password:"",
    
        })
        const handleSubmit=async (e)=>{
            e.preventDefault()

            if(!values.email){
                setError("Email is required")
                return 
            }
            if(!values.password){
                setError("Password is required")
                return 
            }

            try{

            
                const {data}=await axios.post("http://localhost:4000/login",{
                    ...values,
                },{
                    withCredentials:true,
                });
                console.log(data)
                if(data){
                    if(data.errors){
                        swal("please check your login details")
                    }else{
                       
                      navigate('/')
                    }
                }
            }catch(err){
                    console.log(err)
            }

        }
        

  return (
    <div className='container'>
        <h2 className='heading '>Login</h2>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                
                <div>
                <label for="email" class="floatLabel">Email</label>
			    <input type="email" name="email" placeholder='email'onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
                </div>
                <div>
                <label for="password" class="floatLabel">Password</label>
			    <input type="password" name="password" placeholder='password'onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
                </div>
                
                <button type="submit">Submit</button>
                <span>Already have an account? <Link to='/register'>Register</Link></span>
               
            </form>

    </div>
  )
}
