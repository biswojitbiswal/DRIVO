import React from 'react'
import MainImg from '../Images/BMW.png'
import SecondImg from '../Images/FERRARI.png'
import {Link} from 'react-router-dom'
import Explore from './Explore'


function Home() {
  return (
    <>
      <section id='home'>
        <div className='home-container'>
          <h1 className='heading tracking-in-expand'>Drive Your Adventure with Our Premium Car Rentals</h1>
          <div className='img-container'>
            <div className="main-img slide-in-fwd-left">
              <img src={MainImg} alt="First Car" />
            </div>
            <div className='second-img slide-in-fwd-right'>
              <img src={SecondImg} alt="Second Car" />
            </div>
          </div>
          <h1 className='description text-focus-in'>Find the Perfect Ride for Your Next Journey!</h1>
          <div className="explore-btn text-focus-in">
            <Link to="/" >Explore</Link>
          </div>
        </div>
      </section>
      <Explore />

    </>

  )
}


export default Home
