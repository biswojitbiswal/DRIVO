import React, { useState } from 'react'
import { useAuth } from '../Store/Auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ChangePass() {
    const [pass, setPass] = useState({
        oPassword: "",
        nPassword: "",
        cPassword: ""
    })

    const {authorization} = useAuth();
    const navigate = useNavigate();

    const handlePass = async(e) => {
        setPass({
            ...pass,
            [e.target.name]: e.target.value
        })
    }

    const handlePassSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://drivo-api.vercel.app/api/drivo/user/changePass`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorization,
                },
                body: JSON.stringify(pass)
            })

            const data = await response.json();
            // console.log(data);

            if(response.ok){
                toast.success("Password Changed Successfully")
                navigate("/account")
            } else {
                toast(data.extraDetails ? data.extraDetails : data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <>
      <section>
        <h1>Reset Password</h1>
        <form onSubmit={handlePassSubmit} className='register-form'>
            <div className="input-fields">
            <label htmlFor="oPassword">Old Password :</label>
            <input className='input-field' name='oPassword' id='oPassword'  type="password" placeholder='Old Password' onChange={handlePass} value={pass.oPassword} autoComplete='off' required />
          </div>
          <div className="input-fields">
            <label htmlFor="nPassword">New Password :</label>
            <input className='input-field' name='nPassword' id='nPassword'  type="password" placeholder='New Password' onChange={handlePass} value={pass.nPassword} autoComplete='off' required />
          </div>
          <div className="input-fields">
            <label htmlFor="cPassword">Confirm Password :</label>
            <input className='input-field' name='cPassword' id='cPassword'  type="password" placeholder='Confirm Password' onChange={handlePass} value={pass.cPassword} autoComplete='off' required />
          </div>

          <button type='submit' className='submit-btn'>Reset</button>

        </form>
      </section>
    </>
  )
}

export default ChangePass
