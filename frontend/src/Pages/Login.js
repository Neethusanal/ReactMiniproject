import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import swal from 'sweetalert';



export default function Register() {
    const [values,setValues] = useState({
        
        email:"",
        password:"",
    
        })
        const handleSubmit=async (e)=>{
            e.preventDefault()
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
