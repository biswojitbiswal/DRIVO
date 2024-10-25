import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
import { useAuth } from '../Store/Auth'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';


const roundToNearestHour = (date) => {
  const roundedDate = new Date(date);
  roundedDate.setMinutes(0, 0, 0);
  return roundedDate;
};

function Booking() {
  const [vehicle, setvehicle] = useState({});
  const [vehiclePrice, setVehiclePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    bookingName: "",
    contact: "",
    dob: "",
    dlNo: "",
    pickUpDT: roundToNearestHour(new Date()),
    dropUpDT: roundToNearestHour(new Date()),
    pickUpLcation: "",
    totalAmount: 0
  })

  const { vehicleId } = useParams()
  const { authorization } = useAuth();
  const navigate = useNavigate();
  // console.log(vehicleId)


  const today = new Date();
  const minPickupTime = formData.pickUpDT && formData.pickUpDT.toDateString() === today.toDateString()
    ? setHours(setMinutes(new Date(), 0), Math.max(today.getHours(), 5))
    : setHours(setMinutes(new Date(), 0), 5);
  const maxPickupTime = setHours(setMinutes(new Date(), 0), 23);


  const minDropupTime = formData.dropUpDT && formData.dropUpDT.toDateString() === formData.pickUpDT.toDateString()
    ? setHours(setMinutes(new Date(formData.pickUpDT), 0), formData.pickUpDT.getHours() + 1)
    : setHours(setMinutes(new Date(), 0), 5);
  const maxDropupTime = setHours(setMinutes(new Date(), 0), 23);


  const getVehicleInfo = async () => {
    try {
      const response = await fetch(`https://drivo-api.vercel.app/api/drivo/vehicle/${vehicleId}`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        }
      })
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        setvehicle(data);
        setVehiclePrice(data.price)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    // console.log(formData)
    try {
      const response = await fetch(`https://drivo-api.vercel.app/api/drivo/vehicle/booking/${vehicleId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      // console.log(data);
      handlePaymentVerify(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePaymentVerify = async (data) => {
    // console.log(data)
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount * 100,
      currency: data.currency,
      name: "Drivo",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response)
        try {
          const res = await fetch(`https://drivo-api.vercel.app/api/drivo/vehicle/verify`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              Authorization: authorization,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          })

          const verifyData = await res.json();

          if(verifyData.message){
            toast.success(verifyData.message);
            navigate("/mybookings");
          }
        } catch (error) {
          console.log(error)
        }
      },
      theme: {
        color: "#5f63b8"
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }


  useEffect(() => {
    getVehicleInfo();
    if (formData.pickUpDT && formData.dropUpDT) {
      const durationInMs = formData.dropUpDT - formData.pickUpDT;
      const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24))
      const calaulatePrice = vehiclePrice * durationInDays
      setTotalPrice(calaulatePrice);
      setFormData((prev) => ({
        ...prev,
        totalAmount: calaulatePrice
      }));
    }
  }, [formData.pickUpDT, formData.dropUpDT, vehiclePrice])

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date
    });
  };


  return (
    <>
      <section id='booking-page'>

        <div className="booking-container">
          <div className="vehicle-info">
            <div className="vehicle-img">
              <img src={vehicle.image} alt={vehicle.vehicleModel} width="400px" height="300px" />
            </div>
            <div className="vehicle-description">
              <h1>{vehicle.vehicleModel}</h1>
              <p>{vehicle.seats} Seats</p>
              <p>{vehicle.fuel} / {vehicle.vehicleType}</p>

            </div>
          </div>
          <div className="imp-points">
            <div className="point">
              <h2>lorem ipsum</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae deserunt facere dignissimos nulla possimus ex eos, dolore saepe ipsa in quam ea qui error enim laboriosam dolor hic quae dolorum!</p>
            </div>
            <div className="point">
              <h2>lorem ipsum</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae deserunt facere dignissimos nulla possimus ex eos, dolore saepe ipsa in quam ea qui error enim laboriosam dolor hic quae dolorum!</p>
            </div>
            <div className="point">
              <h2>lorem ipsum</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae deserunt facere dignissimos nulla possimus ex eos, dolore saepe ipsa in quam ea qui error enim laboriosam dolor hic quae dolorum!</p>
            </div>
            
            
          </div>
        </div>
        <div className="booking-details">
          <h1>Booking Details</h1>
          <form>
            <div className="input-fields">
              <label htmlFor="bookingName">Name :</label>
              <input className='input-field' name='bookingName' onChange={handleFormData} value={formData.bookingName} id='bookingName' type="text" placeholder='Enter Your Name' autoComplete='off' required />
            </div>

            <div className="input-fields">
              <label htmlFor="contact">Contact :</label>
              <input className='input-field' name='contact' id='contact' type="phone" onChange={handleFormData} value={formData.contact} placeholder='Enter Your Phone' autoComplete='off' required />
            </div>

            <div className="input-fields">
              <label htmlFor="dlNo">DL No. :</label>
              <input className='input-field' name='dlNo' id='dlNo' type="text" onChange={handleFormData} value={formData.dlNo} placeholder='HR-0619850034761' autoComplete='off' required />
            </div>

            <div className="input-fields">
              <label htmlFor="dob">DOB :</label>
              <DatePicker id='dob' selected={formData.dob} onChange={(date) => handleDateChange('dob', date)} dateFormat="yyyy-MM-dd" placeholderText="Select You DOB" autoComplete='off' className="custom-datepicker" />
            </div>

            <div className="input-fields">
              <label htmlFor="pickUpDT">Pick-up Date :</label>
              <DatePicker id='pickUpDT' selected={formData.pickUpDT} onChange={(date) => handleDateChange('pickUpDT', date)} showTimeSelect timeFormat='HH:mm' timeCaption="Time" timeIntervals={60} dateFormat="yyyy-MM-dd, HH:mm" minDate={new Date()} minTime={minPickupTime} maxTime={maxPickupTime} placeholderText="Select You DOB" className="custom-datepicker" />
            </div>

            <div className="input-fields">
              <label htmlFor="dropUpDT">Drop-up Date :</label>
              <DatePicker id='dropUpDT' selected={formData.dropUpDT} 
              onChange={(date) => handleDateChange('dropUpDT', date)} showTimeSelect timeFormat='HH:mm' timeCaption="Time" timeIntervals={60} dateFormat="yyyy-MM-dd, HH:mm" 
              minDate={new Date()} minTime={minDropupTime} 
              maxTime={maxDropupTime} placeholderText="Select You DOB" className="custom-datepicker" />
            </div>

          
            
            <div className="input-fields">
              <label htmlFor="pickUpLcation">Pick-up Location :</label>
              <select name="pickUpLcation" id="pickUpLcation" 
              value={formData.pickUpLcation} 
              onChange={handleFormData} required>

              <option value="" disabled selected hidden>Select a location</option>

                <option value="Rajpath, India Gate, New Delhi, Delhi 110001">Rajpath, India Gate, New Delhi, Delhi 110001</option>

                <option value="Rajiv Chowk, Connaught Place, New Delhi, Delhi 110001">Rajiv Chowk, Connaught Place, New Delhi, Delhi 110001</option>

                <option value="Lotus Temple Road, Kalkaji, New Delhi, Delhi 110019">Lotus Temple Road, Kalkaji, New Delhi, Delhi 110019</option>

                <option value="Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi 110006">Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi 110006</option>

                <option value="Mehrauli, New Delhi, Delhi 110030">Mehrauli, New Delhi, Delhi 110030</option>
              </select>
            </div>
        
          </form>
            <button className='subnit-btn' onClick={handlePayment} disabled={!totalPrice} style={{ opacity: !totalPrice ? 0.5 : 1.0 }}>
              {totalPrice ? `Pay Now ₹${totalPrice}` : "Select Pickup And Drop Date & Time"}
              </button>
        </div>


      </section>
    </>
  )
}

export default Booking
