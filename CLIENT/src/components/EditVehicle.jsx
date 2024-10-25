import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/Auth';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';

function EditVehicle() {
    const location = useLocation();
    const {vehicle} = location.state;

    const[newVehicle, setNewVehicle] = useState({
        price: vehicle.price,
        image: null,
    });

    const {authorization} = useAuth();
    const navigate = useNavigate();

    const handleInput = async(e) => {
        setNewVehicle({
            ...newVehicle,
            [e.target.name]: e.target.value
        })
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
            setNewVehicle({ ...newVehicle, image: compressedFile });
          } catch (error) {
            console.error('Error compressing image:', error);
          }
        }
      }

      const handleEdit = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('price', newVehicle.price);
            formData.append('image', newVehicle.image);
            const response = await fetch(`https://drivo-api.vercel.app/api/drivo/vehicle/edit/${vehicle._id}`, {
                method: "PATCH",
                headers: {
                    Authorization: authorization,
                },
                body: formData
            })

            const data = await response.json();
            // console.log(data);
            if(response.ok){
                toast.success("Vehicle Info. Update")
                navigate("/")
            } else{
                toast.error(data.extraDetails ? data.extraDetails : data.message)
            }
        } catch (error) {
            console.log(error)
        }
      }
    
    return (
        <>
            <section id="vehicle-page">
                <h1>Edit Vehicles</h1>
                <form onSubmit={handleEdit} className='vehicle-edit-page'>
                    <div className="input-fields">
                        <label htmlFor="price">Price :</label>
                        <input className='input-field' name='price' id='price' type="number" placeholder='Enter Price' onChange={handleInput} value={newVehicle.price} autoComplete='off' required />
                    </div>

                    <div className='input-fields'>
                        <label htmlFor="image">Image :</label>
                        <input type="file" className="input-field" name="image" placeholder='Car Image' onChange={handleFile} autoComplete='off' />

                       <img src={vehicle.image} alt="Vehicle" style={{width: "250px", height: "150px"}}/>
                    </div>

                    <button className='submit-btn'>Update</button>
                </form>

            </section>
        </>
    )
}

export default EditVehicle
