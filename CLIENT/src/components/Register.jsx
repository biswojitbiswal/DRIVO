import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../Store/Auth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Register() {
  const [signupData, setSignupData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: ""
  })

  const navigate = useNavigate();
  const {storeTokenInCookies} = useAuth();

  const handleInput = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name] : e.target.value
    })
  }

  const handleRegisterData = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/drivo/user/register`, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(signupData)
      })

      const data = await response.json()
      // console.log(data)
      if(response.ok){
        toast.success("register successfully")
        storeTokenInCookies(data.token)
        setSignupData({userName: "", email: "", phone: "", password: ""});
        navigate("/");
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.error('Error : ',error);
    }
  }

  return (
    <>
      <section className="register-page">
        <h1>Register</h1>
        <form onSubmit={handleRegisterData} className='register-form'>
        <div className="input-fields">
            <label htmlFor="userName">Username :</label>
            <input className='input-field' name='userName' id='userName'  type="userName" placeholder='Enter Your Username' onChange={handleInput} value={signupData.userName} autoComplete='off' required />
          </div>
          <div className="input-fields">
            <label htmlFor="email">Email :</label>
            <input className='input-field' name='email' id='email'  type="email" placeholder='Enter Your email' onChange={handleInput} value={signupData.email} autoComplete='off' required />
          </div>

          <div className="input-fields">
            <label htmlFor="phone">Phone :</label>
            <input className='input-field' name='phone' id='phone'  type="phone" placeholder='Enter Your Phone' onChange={handleInput} value={signupData.phone} autoComplete='off' required />
          </div>

          <div className="input-fields">
            <label htmlFor="password">Password :</label>
            <input className='input-field' name='password' id='password'  type="password" placeholder='Enter Your Password' onChange={handleInput} value={signupData.password} autoComplete='off' required />
          </div>
          <button type='submit' className='submit-btn'>Register</button>
          <hr />
          <div className='login-link'>
            <Link className='log-link' to="/register">I have an account</Link>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
