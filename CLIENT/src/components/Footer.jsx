import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="contact-info">
        <h1>Contact Details</h1>
        <div className="info">
            <i className="fa-solid fa-house"></i>
            <p>2nd Floor, FMG, Basant Gaon, Vasant Vihar, New Delhi, Delhi 110010</p>
        </div>
        <div className="info">
            <i className="fa-solid fa-phone"></i>
            <p>6371642583</p>
        </div>
        <div className="info">
            <i className="fa-brands fa-whatsapp"></i>
            <p>6371642583, 9556659999</p>
        </div>
        <div className="info">
            <i className="fa-solid fa-envelope"></i>
            <p>drivo100@gmail.com</p>
        </div>

      </div>
      <div className="pages">
        <h1>Pages</h1>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/terms&conditions">Terms & Conditions</NavLink>
      </div>
      <div className="social-media">
        <h1>Social Media</h1>
        <i className="fa-brands fa-whatsapp"></i>
        <i className="fa-solid fa-envelope"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-youtube"></i>
      </div>
      <div className="site-map">
        <h1>Site Map</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7007.9754409185625!2d77.15519705!3d28.57013145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1da825d5f9c3%3A0x7e0c2205108df0df!2sBasant%20Gaon%2C%20Vasant%20Vihar%2C%20New%20Delhi%2C%20Delhi%20110057!5e0!3m2!1sen!2sin!4v1722939343201!5m2!1sen!2sin" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </footer>
  )
}

export default Footer
