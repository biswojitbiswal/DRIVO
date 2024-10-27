import React, {useRef} from 'react'
import MainImg from '../Images/BMW.png'
import SecondImg from '../Images/FERRARI.png'
import {Link} from 'react-router-dom'
import Explore from './Explore'
import { useAuth } from '../Store/Auth'


function Home() {
  const {user} = useAuth();

  const exploreRef = useRef(null);

  const scrollToExplore = () => {
    if (exploreRef.current) {
      exploreRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
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
          {
            user.isAdmin ? (
              <div className="explore-btn text-focus-in">
                <Link to="/admin" >Dashboard</Link>
              </div>
            ) : (
              <div className="explore-btn text-focus-in">
                <button onClick={scrollToExplore}>Explore</button> {/* Change Link to button */}
              </div>
            )
          }
          
        </div>
      </section>
      <div ref={exploreRef}>
        <Explore />
      </div>

    </>

  )
}


export default Home
