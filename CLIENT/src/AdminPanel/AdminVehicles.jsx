import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/Auth';
import imageCompression from 'browser-image-compression';

function AdminVehicle() {
  const [vehicle, setVehicle] = useState({
    vehicleModel: "",
    seats:"",
    price: "",
    image:null,
    fuel: "",
    vehicleType:""
  })

  const {authorization} = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name] : e.target.value
    });
  }

  const handleFile = async(e) =>{
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        setVehicle({ ...vehicle, image: compressedFile });
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  }

  const addNewVehicle = async(e) => {
    e.preventDefault();

    if (!vehicle.vehicleModel || !vehicle.seats || !vehicle.price || !vehicle.image || !vehicle.fuel || !vehicle.vehicleType) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('vehicleModel', vehicle.vehicleModel);
      formData.append('seats', vehicle.seats);
      formData.append('price', vehicle.price);
      formData.append('image', vehicle.image);
      formData.append('fuel', vehicle.fuel);
      formData.append('vehicleType', vehicle.vehicleType);

      const response = await fetch(`https://drivo-api.vercel.app/api/drivo/vehicle/add`, {
        method: "POST",
        headers: {
          Authorization : authorization
        },
        body: formData
      });
      // alert("clicked")
      const data = await response.json()
      // console.log(data);

      if(response.ok){
        toast.success("Vehicle Added Successfully")
        setVehicle({vehicleModel: "", seats:"", price: "", image:"", fuel: "", vehicleType:""})
        navigate("/")
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message)
      }

    } catch (error) {
      console.error("Error", error);
    }
  }
  return (
    <>
        <section id="vehicle-page">
        <h1>Add Vehicles</h1>
        <form onSubmit={addNewVehicle} className='vehicle-form'>
        <div className="input-fields">
            <label htmlFor="vehicleModel">Model Name :</label>
            <input className='input-field' name='vehicleModel' id='vehicleModel'  type="text" placeholder='Enter Your Model' onChange={handleInput} value={vehicle.vehicleModel}  autoComplete='off' required />
          </div>
          <div className="input-fields">
            <label htmlFor="seats">Seats :</label>
            <input className='input-field' name='seats' id='seats'  type="number" placeholder='Number Of Seats' onChange={handleInput} value={vehicle.seats} autoComplete='off' required />
          </div>

          <div className="input-fields">
            <label htmlFor="price">Price :</label>
            <input className='input-field' name='price' id='price'  type="number" placeholder='Enter Price' onChange={handleInput} value={vehicle.price} autoComplete='off' required />
          </div>

          <div className='input-fields'>
            <label htmlFor="image">Image :</label>
            <input type="file" className="input-field" name="image" placeholder='Car Image'
              id='image' onChange={handleFile} required autoComplete='off' />
          </div>

          <div className="input-fields">
            <label htmlFor="fuel">Fuel :</label>
            <select name="fuel" id="fuel" onChange={handleInput} value={vehicle.fuel}>
              <option>Select</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div className="input-fields">
            <label htmlFor="vehicleType">Type :</label>
            <select name="vehicleType" id="vehicleType" onChange={handleInput} value={vehicle.vehicleType}>
              <option>Select</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          
          <button type='submit' className='submit-btn'>Send</button>
        </form>
      </section>
    </>
  )
}

export default AdminVehicle
