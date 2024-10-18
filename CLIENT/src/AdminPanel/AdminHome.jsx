import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/Auth';
import {toast} from 'react-toastify'

function AdminHome() {
    const [bookings, setBookings] = useState([]);
    const [editable, setEditable] = useState({});
    const [status, setStatus] = useState({})

    const { authorization } = useAuth();

    const getAllBookings = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/drivo/admin/bookings`, {
                method: "GET",
                headers: {
                    Authorization: authorization,
                }
            })

            const data = await response.json();
            // console.log(data);
            if (response.ok) {
                setBookings(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBookings();
    }, []);



    function handleStatus(bookingId){
        setEditable((prevStatus) => {
            const newState = {
              ...prevStatus,
              [bookingId]: !prevStatus[bookingId],
            };
            return newState;
        })
    }

    const editStatus = async(bookingId) => {
        if (!editable[bookingId]) {
            handleStatus(bookingId); // Toggle edit mode on
        } else {
            try {
                // Use the updated status from the component's state or the default 'Pending'
                const bookingStatus = status[bookingId] || 'Pending'; 
                console.log(bookingStatus);
                const response = await fetch(`http://localhost:4000/api/drivo/admin/bookings/status/${bookingId}`, {
                    method: "PATCH",
                    headers: {
                        Authorization: authorization,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ bookingStatus })

                });
    
                if (response.ok) {
                    toast.success("Status Updated");
                    getAllBookings();
                } else {
                    toast.error('Error updating status');
                }
            } catch (error) {
                console.log(error);
                toast.error('Error updating status');
            } finally {
                handleStatus(bookingId);
            }
        }
        
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.toISOString().slice(0, 10)}, ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <>
            <section className='admin-dashboard'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Vehicle</th>
                            <th>DL No.</th>
                            <th>Date & Time</th>
                            <th>Pickup Location</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="9">No Bokings Are Available</td>
                                </tr>
                            ) : (
                                bookings.map((currBoking, index) => {
                                    return <tr key={index}>
                                        <td>{currBoking.bookingName.toUpperCase()}</td>
                                        <td>{currBoking.contact}</td>
                                        <td>{currBoking.bookedVehicle.vehicleModel}</td>
                                        <td>{currBoking.dlNo}</td>
                                        <td>
                                            <p>{formatDateTime(currBoking.pickUpDT)}</p>
                                            <p>To</p>
                                            <p>{formatDateTime(currBoking.dropUpDT)}</p>

                                        </td>
                                        <td className='pick-location'>{currBoking.pickUpLcation}</td>
                                        <td>{currBoking.totalAmount}</td>
                                        <td>{currBoking.paymentStatus}</td>
                                        <td key={index}>
                                            <div className="update-status">
                                                <select
                                                 value={editable[currBoking._id] ? status[currBoking._id] || currBoking.status : currBoking.status} 
                                                 onChange={(e) => setStatus((prevStatus) => ({
                                                     ...prevStatus,
                                                     [currBoking._id]: e.target.value // Update local status only when editing
                                                 }))} 
                                                 disabled={!editable[currBoking._id]} 
                                                 className={editable[currBoking._id] ? "status-box" : "select-status"}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Confirmed">Confirmed</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Canceled">Canceled</option>
                                                </select> 
                                                <button className='submit-btn status-btn' onClick={() => editStatus(currBoking._id)}>{editable[currBoking._id] ? "📁" : "✏️"}</button>
                                                {/* {editUser ? "📁" : "✏️"} */}
                                            </div>

                                        </td>

                                    </tr>
                                })
                            )
                        }
                    </tbody>

                </table>
            </section>
        </>
    )
}

export default AdminHome
