import React from 'react'

function Register() {
  return (
    <>
      <section className="register-page">
        <h1>Register</h1>
        <form className='register-form'>
        <div className="input-fields">
            <label htmlFor="userName">Username :</label>
            <input className='input-field' name='userName' id='userName'  type="userName" placeholder='Enter Your Username' autoComplete='off' required />
          </div>
          <div className="input-fields">
            <label htmlFor="email">Email :</label>
            <input className='input-field' name='email' id='email'  type="email" placeholder='Enter Your email' autoComplete='off' required />
          </div>

          <div className="input-fields">
            <label htmlFor="phone">Phone :</label>
            <input className='input-field' name='phone' id='phone'  type="phone" placeholder='Enter Your Phone' autoComplete='off' required />
          </div>
          <div className="input-fields">
            <label htmlFor="avatar">Avatar :</label>
            <input className='input-field' name='avatar' id='avatar'  type="file" placeholder='Enter Your Avatar' autoComplete='off' required />
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

export default Register
