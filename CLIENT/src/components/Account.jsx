import React, { useState } from 'react'
import ProfileImg from '../Images/DP.jpg'
import { useAuth } from '../Store/Auth'
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

function Account() {
  const [editUser, setEditUser] = useState(false);
  const [changeUsername, setChangeUsername] = useState("");

  const { setUser, user, authorization } = useAuth();


  const editUsername = async() => {
    if(!editUser){
      setChangeUsername(user.userName || "");
      setEditUser(true);
    } else {
      try {
        const response = await fetch(`http://localhost:4000/api/drivo/user//editusername`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization
          },
          body: JSON.stringify({userName: changeUsername})
        })

        const data = await response.json();
        // console.log(data.updateUser);
        if(response.ok){
          toast.success("Username Updated");
          setUser(data.updateUser);
          setEditUser(false);
          
        } else {
          toast.error(data.extraDetails ? data.extraDetails : data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <section id="account-page">
        <div className='user-avatar'>
          <label htmlFor="imageUpload">
            <img
              src={user.avatar || ProfileImg}
              alt="User Avatar"
            />
          <span className='overlay'>Edit</span>
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
          />
        </div>
        <div className="user-details">
          <div className="edit-username">
            <input type="text" name="userName" onChange={(e) => setChangeUsername(e.target.value) } value={editUser ? changeUsername : (user.userName || "")} readOnly={!editUser} />
            <button onClick={editUsername}>{editUser ? "📁" : "✏️"}</button>
          </div>

          <div className="change-pass">
            <Link to="/account/pass">Change Password</Link>
          </div>

          <div className="dlt-account">
            <Link>Delete Account</Link>
          </div>
        </div>

      </section>
    </>
  )
}



export default Account
