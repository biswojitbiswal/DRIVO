import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/Auth'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'

function MyBokings() {
  const [bookingData, setBookingData] = useState([]);

  const { authorization } = useAuth();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toISOString().slice(0, 10)}, ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
  };

  const handleCancelBooking = async(id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/drivo/user/mybookings/cancel/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: authorization,
        }
      })

      const data = await response.json();
      console.log(data);

      if(response.ok){
        getMyBookings();
        toast.success("Booking Canceled");
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getMyBookings = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/drivo/user/mybookings`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        }
      });
  
      const data = await response.json();
      // console.log(data);
  
      if (response.ok) {
        setBookingData(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMyBookings();
  }, [])
  return (
    <>
      <section>
        <div className="my-bookings-container">
          <h1>My Bookings</h1>
          {!bookingData || bookingData.length == 0 ? (<p>Not Found!</p>) :
            bookingData.map((booking, index) => {
              return <div className="booking-card" key={index}>
                <div className="vehicle-info">
                  <img src={booking.bookedVehicle.image} alt="Vehicle" className="vehicle-img" />
                  <div className="vehicle-details">
                    <h3>{booking.bookedVehicle.vehicleModel}</h3>
                    <p>{booking.bookedVehicle.seats} Seater</p>
                    <p>{booking.bookedVehicle.fuel}</p>
                    <p>{booking.bookedVehicle.vehicleType}</p>
                    <p className='booking-price'>₹{booking.totalAmount}</p>
                  </div>
                </div>
                <div className="booking-info">
                  <p>{booking.bookingName.charAt(0).toUpperCase() + booking.bookingName.slice(1).toLowerCase()}</p>
                  <p>{booking.dlNo}</p>
                  <p>{booking.pickUpLcation}</p>
                  <p>{formatDateTime(booking.pickUpDT)}  To {formatDateTime(booking.dropUpDT)}</p>
                  <p className='pay-status'>{booking.paymentStatus}</p>

                </div>
                <div className='booking-btns'>
                  <p className={`status-badge ${booking.status === 'Completed' ? 'completed' :
                    booking.status === 'Pending' ? 'pending' :
                      booking.status === 'Confirmed' ? 'confirm' :
                        booking.status === 'Canceled' ? 'cancel' : ''}`}>{booking.status}</p>
                  {
                    booking.status === 'Completed' || booking.status === 'Canceled' ? " " : (
                      <button onClick={() => handleCancelBooking(booking._id)} className="submit-btn cancel-btn">Cancel</button>

                    )
                  }
                  <Link to="/contact" className="link-btn contact-btn">Contact</Link>

                </div>
              </div>
            })
          }
        </div>

      </section>
    </>
  )
}

export default MyBokings
