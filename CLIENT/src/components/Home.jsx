import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import MainImg from '../Images/BMW.png'
import SecondImg from '../Images/FERRARI.png'


function Home() {
  const [vehicles, setVehicles] = useState([])
  
  const getAllVehicle = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/drivo/vehicle/getvehicles`, {
        method: "GET",
      })

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setVehicles(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllVehicle();
  }, [])
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
            <NavLink to="#explore">Explore</NavLink>
          </div>
        </div>
      </section>


      <section id="explore" className="explore-section">
        {
          vehicles.map((currVehicle, index) => {
            return <div className="outer-container" key={index}>
              <div className="vehicle-container">
                <div className="vehicle-image">
                  <img src={currVehicle.image} alt="Image" loading="lazy" />
                </div>
                <div className="vehicle-details">
                  <h2>{currVehicle.vehicleModel}</h2>
                  <p><i className="fa-solid fa-person"></i> {currVehicle.seats} Seater</p>
                  <p><i className="fa-solid fa-indian-rupee-sign"></i> {currVehicle.price} / 24Hr</p>
                  <p><i className="fa-solid fa-gas-pump"></i> {currVehicle.fuel} / <i className="fa-solid fa-gear"></i> {currVehicle.vehicleType}</p>
                  <button className='btn'><Link to={`/booking/${currVehicle._id}`}>Book</Link></button>
                </div>
              </div>
            </div>
          })
        }
      </section>
    </>

  )
}


export default Home
