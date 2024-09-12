import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/Auth'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const { authorization } = useAuth()
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/drivo/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorization
        }
      });

      if (!response.ok) {
        navigate("/");
        return;
      }

      const data = await response.json()
      // console.log(users)
      setUsers(data);
      navigate("/admin/users");
    } catch (error) {
      console.error(error)
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/drivo/admin/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorization,
        }
      });

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        getAllUsers();
        toast.error("User Deleted");
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <>
      <section id="admin-panel admin-users-section">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((currUser, index) => {
                return <tr key={index}>
                  <td>{currUser.userName}</td>
                  <td>{currUser.email}</td>
                  <td>{currUser.phone}</td>
                  <td>
                    <Link className='admin-edit-btn' to={`/admin/users/edit/${currUser._id}`}>Edit</Link>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(currUser._id)}>Delete</button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>

      </section>
    </>
  )
}

export default AdminUsers
