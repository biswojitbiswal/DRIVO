import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/Auth'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

function Contact() {
  const [contactData, setContactData] = useState({
    email:"",
    message: ""
  })
  const [userData, setUserData] = useState(true)

  const {user, isLoggedIn, authorization} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn){
      navigate("/login");
    }
  },[isLoggedIn, navigate, user])

  if(userData && user){
    setContactData({
      email: user.email,
      message: ""
    })
    setUserData(false)
  }


  const handleInput = (e) => {
    setContactData({
      ...contactData,
      [e.target.name] : e.target.value
    })
  }

  const handleContactForm = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://drivo-api.vercel.app/api/drivo/contact/form`, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
          Authorization: authorization
        },
        body: JSON.stringify(contactData)
      })

      const data = await response.json()
      console.log(data);

      if(response.ok){
        toast.success("Message Delivered")
        setContactData({
          email: user.email,
          message: ""
        })
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  
  return (
    <>
      <section className="contact-page">
        <h1>Get In Touch</h1>
        <p>Feel Free To Ask</p>
        <form onSubmit={handleContactForm} className='contact-form'>

          <div className="input-fields">
            <label htmlFor="email">Email :</label>
            
            <input className='input-field' name='email' id='email'  type="email" placeholder='Enter Your email' onChange={handleInput} value={contactData.email} autoComplete='off' required />
            
          </div>

          <div className="input-fields">
            <label htmlFor="message">Message :</label>
            <textarea name='message' id='message'  cols="30" rows="10" placeholder='Enter Your Message' onChange={handleInput} value={contactData.message} autoComplete='off' required ></textarea>
          </div>

          <button type='submit' className='submit-btn'>Send</button>
        </form>
      </section>
    </>
  )
}

export default Contact
