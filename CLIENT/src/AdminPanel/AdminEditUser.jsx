import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useAuth} from '../Store/Auth'
import { toast } from 'react-toastify';

function AdminEditUser() {
  const [user, setUser] = useState({
    userName: "",
    phone: "",
  });

  const {id} = useParams();
  const {authorization} = useAuth();

  const getUserById = async() => {
    const response = await fetch(`http://localhost:4000/api/drivo/admin/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: authorization
      }
    })

    const data = await response.json();
    // console.log(data);
    if(response.ok){
      setUser({
        userName: data.userName,
        phone:data.phone,
      })
    }
  }

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/drivo/admin/user/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: JSON.stringify(user)
      })
  
      const data = await response.json();
      console.log(data);
  
      if(response.ok){
        toast.success("Update Successfully")
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <>
      <section id='vehicle-page'>
        <form onSubmit={handleUpdate} className='edit-user-form'>
        <div className="input-fields">
            <label htmlFor="userName">Username :</label>
            <input className='input-field' name='userName' id='userName'  type="userName" placeholder='Enter Your Username' onChange={handleInput} value={user.userName}  autoComplete='off' required />
          </div>
          <div className="input-fields">
            <label htmlFor="phone">Phone :</label>
            <input className='input-field' name='phone' id='phone'  type="phone" placeholder='Enter Your Phone' onChange={handleInput} value={user.phone} autoComplete='off' required />
          </div>
          <button className='submit-btn'>Edit</button>
        </form>
      </section>
    </>
  )
}

export default AdminEditUser
