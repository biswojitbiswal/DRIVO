import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../Store/Auth'
import {toast} from 'react-toastify'

function Explore() {
    const [vehicles, setVehicles] = useState([])

    const {user, authorization} = useAuth();
    
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
  
    const handleDelete = async(id) => {
      try {
        const response = await fetch(`http://localhost:4000/api/drivo/vehicle/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authorization,
          }
        })
  
        const data = await response.json();
        console.log(data);
        if(response.ok){
          getAllVehicle();
          toast.error("Vehicle Deleted");
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
      <section id="explore" className="explore-section">
        {
          vehicles.map((currVehicle, index) => {
            return <div className="outer-container" key={index}>
              <div className="vehicle-container">
                <div className="vehicle-image">
                  <img src={currVehicle.image} alt="Image" loading="lazy" />
                </div>
                <div className="vehicle-card-details">
                  <h2>{currVehicle.vehicleModel}</h2>
                  <p><i className="fa-solid fa-person"></i> {currVehicle.seats} Seater</p>
                  <p><i className="fa-solid fa-indian-rupee-sign"></i> {currVehicle.price} / 24Hr</p>
                  <p><i className="fa-solid fa-gas-pump"></i> {currVehicle.fuel} / <i className="fa-solid fa-gear"></i> {currVehicle.vehicleType}</p>
                  
                </div>
                <div className="vehicle-card-btn">
                {
                    user.isAdmin ? (
                    <>
                      <Link className='link-btn' to={`/edit/${currVehicle._id}`} state={{vehicle: currVehicle}}>Edit</Link>
                      <button onClick={() => handleDelete(currVehicle._id)} className='submit-btn'>Delete</button>
                    </>
                    ) : ""
                  }
                  
                      <Link to={`/booking/${currVehicle._id}`} className='link-btn book-btn'>Book</Link>

                </div>
              </div>
            </div>
          })
        }
      </section>
    </>
  )
}

export default Explore
