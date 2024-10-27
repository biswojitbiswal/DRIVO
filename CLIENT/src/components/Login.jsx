import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Store/Auth';
import { toast } from 'react-toastify'
import { Link, Navigate } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();
  const { storeTokenInCookies, isLoggedIn } = useAuth();

  if(isLoggedIn){
    return <Navigate to="/" />;
  }

  const handleInput = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleLoginData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://drivo-api.vercel.app/api/drivo/user/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      const data = await response.json()
      // console.log(data);

      if (response.ok) {
        toast.success("Login Successfully")
        storeTokenInCookies(data.token)
        setLoginData({ email: "", password: "" })
        navigate("/")
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.error('Error : ', error);
    }
  }

  return (
    <>
      <section className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleLoginData} className='login-form'>

          <div className="input-fields">
            <label htmlFor="email">Email :</label>
            <input className='input-field' name='email' id='email' type="email" placeholder='Enter Your email' onChange={handleInput} value={loginData.email} autoComplete='off' required />
          </div>
          <div className="input-fields">
            <label htmlFor="password">Password :</label>
            <input className='input-field' name='password' id='password' type="password" placeholder='Enter Your Password' onChange={handleInput} value={loginData.password} autoComplete='off' required />
          </div>

          <button type='submit' className='submit-btn'>Log In</button>
          <hr />
          <div className='register-link'>
            <Link className='reg-link' to="/register">Don't have an account! Create An Account</Link>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
