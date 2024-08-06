import React from 'react'
import { NavLink } from 'react-router-dom'
import MainImg from '../Images/BMW.png'
import SecondImg from '../Images/FERRARI.png'

function Home() {
  return (
    <div className='home-container'>
      <h1 className='heading tracking-in-expand'>Drive Your Adventure with Our Premium Car Rentals</h1>
      <div className='img-container'>
        <div className="main-img slide-in-fwd-left">
          <img src={MainImg} alt="" />
        </div>
        <div className='second-img slide-in-fwd-right'>
          <img src={SecondImg} alt="" />
        </div>
      </div>
      <h1 className='description text-focus-in'>Find the Perfect Ride for Your Next Journey!</h1>
      <div className="explore-btn text-focus-in">
        <NavLink to="#explore">Explore</NavLink>
      </div>
    </div>
    
  )
}


export default Home
