import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';

function Booking() {
  const roundToNearestHour = (date) => {
    const roundedDate = new Date(date);
    roundedDate.setMinutes(0, 0, 0);
    return roundedDate;
  };
  const [birthDate, setBirthDate] = useState();
  const [pickupTime, setPickupTime] = useState(roundToNearestHour(new Date()));
  const [dropupTime, setDropupTime] = useState(roundToNearestHour(new Date()));

  const { vehicleId } = useParams()
  console.log(vehicleId)


  const today = new Date();
  const minPickupTime = pickupTime && pickupTime.toDateString() === today.toDateString()
    ? setHours(setMinutes(new Date(), 0), Math.max(today.getHours(), 5))
    : setHours(setMinutes(new Date(), 0), 5);
  const maxPickupTime = setHours(setMinutes(new Date(), 0), 23);


  const minDropupTime = dropupTime && dropupTime.toDateString() === pickupTime.toDateString()
    ? setHours(setMinutes(new Date(pickupTime), 0), pickupTime.getHours() + 1)
    : setHours(setMinutes(new Date(), 0), 5);
  const maxDropupTime = setHours(setMinutes(new Date(), 0), 23);


  return (
    <>
      <section id='booking-page'>
        
        <div className="container">
          <div className="vehicle-info">

          </div>
          <div className="imp-points">

          </div>
        </div>
        <div className="booking-details">
          <h1>Booking Details</h1>
          <form>
            <div className="input-fields">
              <label htmlFor="name">Name :</label>
              <input className='input-field' name='name' id='name' type="text" placeholder='Enter Your Name' autoComplete='off' required />
            </div>

            <div className="input-fields">
              <label htmlFor="contact">Name :</label>
              <input className='input-field' name='contact' id='contact' type="phone" placeholder='Enter Your Phone' autoComplete='off' required />
            </div>

            <div className="input-fields">
              <label htmlFor="dlno">DL No. :</label>
              <input className='input-field' name='dlno' id='dlno' type="text" placeholder='Enter Your DL No' autoComplete='off' required />
            </div>

            <div className="input-fields">
              <label htmlFor="dob">DOB :</label>
              <DatePicker id='dob' selected={birthDate} onChange={(date) => setBirthDate(date)} dateFormat="yyyy-MM-dd" placeholderText="Select You DOB" autoComplete='off' className="custom-datepicker"/>
            </div>

            <div className="input-fields">
              <label htmlFor="pick-date">Pick-up Date :</label>
              <DatePicker id='pick-date' selected={pickupTime} onChange={(date) => setPickupTime(date)} showTimeSelect timeFormat='HH:mm' timeCaption="Time" timeIntervals={60} dateFormat="yyyy-MM-dd, HH:mm" minDate={new Date()} minTime={minPickupTime} maxTime={maxPickupTime} placeholderText="Select You DOB" className="custom-datepicker"/>
            </div>

            <div className="input-fields">
              <label htmlFor="drop-date">Drop-up Date :</label>
              <DatePicker id='drop-date' selected={dropupTime} onChange={(date) => setDropupTime(date)} showTimeSelect timeFormat='HH:mm' timeCaption="Time" timeIntervals={60} dateFormat="yyyy-MM-dd, HH:mm" minDate={new Date()} minTime={minDropupTime} maxTime={maxDropupTime} placeholderText="Select You DOB" className="custom-datepicker"/>
            </div>
            <button>Pay Now</button>
          </form>
        </div>
        

      </section>
    </>
  )
}

export default Booking
