import React from 'react'
import {NavLink} from 'react-router-dom'

function Account() {
  return (
    <>
      <section id="account-page">
        <div className="user-avatar">
            <img src="" alt="image" />
        </div>
        <div className="username">
            <h1>Edit My username</h1>
        </div>
        <div className="change-password">
            <h1>Edit My password</h1>
        </div>
        <div className="booking-link">
            <NavLink>My Bookings</NavLink>
        </div>
        <div className="dlt-account">
            <h1>Delete My Account</h1>
        </div>
      </section>
    </>
  )
}

export default Account
