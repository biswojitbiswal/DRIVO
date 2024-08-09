import React from 'react'

function Login() {
  return (
    <>
      <section className="login-page">
        <h1>Login</h1>
        <form className='login-form'>

          <div className="input-fields">
            <label htmlFor="email">Email :</label>
            <input className='input-field' name='email' id='email'  type="email" placeholder='Enter Your email' autoComplete='off' required />
          </div>
          <div className="input-fields">
            <label htmlFor="password">Password :</label>
            <input className='input-field' name='password' id='password'  type="password" placeholder='Enter Your Password' autoComplete='off' required />
          </div>

          <button type='submit' className='btn submit-btn'>Send</button>
        </form>
      </section>
    </>
  )
}

export default Login
