import React from 'react'

function Contact() {
  return (
    <>
      <section className="contact-page">
        <h1>Get In Touch</h1>
        <p>Feel free to ask for details, don't save any questions!</p>
        <form className='contact-form'>
          <div className="input-fields">
            <label htmlFor="userName">Username :</label>
            <input className='input-field' name='userName' id='userName'  type="text" placeholder='Enter Your Name' autoComplete='off' required />
          </div>

          <div className="input-fields">
            <label htmlFor="email">Email :</label>
            <input className='input-field' name='email' id='email'  type="email" placeholder='Enter Your email' autoComplete='off' required />
          </div>

          <div className="input-fields">
            <label htmlFor="message">Message :</label>
            <textarea name='message' id='message'  cols="30" rows="10" placeholder='Enter Your Message' autoComplete='off' required ></textarea>
          </div>

          <button type='submit' className='btn submit-btn'>Send</button>
        </form>
      </section>
    </>
  )
}

export default Contact
