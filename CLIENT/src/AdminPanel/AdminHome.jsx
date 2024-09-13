import React, {useEffect, useState} from 'react'
import { useAuth } from '../Store/Auth';

function AdminHome() {
    const [bookings, setBookings] = useState([]);

    const {authorization} = useAuth();

    const getAllBookings = async() => {
        try {
            const response = await fetch(`http://localhost:4000/api/drivo/admin/bookings`, {
                method: "GET",
                headers: {
                    Authorization: authorization,
                }
            })

            const data = await response.json();
            // console.log(data);
            if(response.ok){
                setBookings(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBookings();
    }, []);

  return (
    <>
      <section>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Vehicle</th>
                    <th>DL No.</th>
                    <th>Price</th>
                    <th>Payment Status</th>
                    <th>Booking Status</th>
                    
                </tr>
                </thead>
                <tbody>
                    {
                        bookings.map((currBoking, index) => {
                            return <tr key={index}>
                                <th>{currBoking.bookingName.toUpperCase()}</th>
                                <th>{currBoking.contact}</th>
                                <th>{currBoking.bookedVehicle.vehicleModel}</th>
                                <th>{currBoking.dlNo}</th>
                                <th>{currBoking.totalAmount}</th>
                                <th>{currBoking.paymentStatus}</th>
                                <th>{currBoking.status}</th>
                            </tr>
                        })
                    }
                </tbody>
            
        </table>
      </section>
    </>
  )
}

export default AdminHome
