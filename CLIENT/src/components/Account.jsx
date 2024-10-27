import React, { useState } from 'react'
import ProfileImg from '../Images/DP.jpg'
import { useAuth } from '../Store/Auth'
import { Link, Navigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';


function Account() {
  const [selectImage, setSelectImage] = useState(null)
  const [editUser, setEditUser] = useState(false);
  const [changeUsername, setChangeUsername] = useState("");


  const { setUser, user, authorization, isLoggedIn } = useAuth();

  if(!isLoggedIn){
    return <Navigate to="/login" />
  }


  const editUsername = async () => {
    if (!editUser) {
      setChangeUsername(user.userName || "");
      setEditUser(true);
    } else {
      try {
        const response = await fetch(`https://drivo-api.vercel.app/api/drivo/user//editusername`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization
          },
          body: JSON.stringify({ userName: changeUsername })
        })

        const data = await response.json();
        // console.log(data.updateUser);
        if (response.ok) {
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

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        setSelectImage(compressedFile);
        await uploadImage(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  }

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch(`https://drivo-api.vercel.app/api/drivo/user/addavatar`, {
        method: "PATCH",
        headers: {
          Authorization: authorization
        },
        body: formData
      })

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        toast.success("Avatar changed Successfully")
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      console.log(error)
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
            onChange={handleAvatar}
          />
        </div>
        <div className="user-details">
          <div className="edit-username">
            <input type="text" name="userName" onChange={(e) => setChangeUsername(e.target.value)} value={editUser ? changeUsername : (user.userName || "")} readOnly={!editUser} />
            <button onClick={editUsername}>{editUser ? "📁" : "✏️"}</button>
          </div>

          <div className="change-pass">
            <Link to="/account/pass">Change Password</Link>
          </div>
        </div>

      </section>
    </>
  )
}



export default Account
