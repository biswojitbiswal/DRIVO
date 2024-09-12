import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/Auth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminContacts() {
  const [contacts, setContacts] = useState([])

  const { authorization } = useAuth();
  const navigate = useNavigate();


  const getAllContacts = async() => {
    const response = await fetch(`http://localhost:4000/api/drivo/admin/contacts`, {
      method: "GET",
      headers: {
        Authorization: authorization
      }
    })

    if(response.ok){
      const data = await response.json();
      setContacts(data)
      navigate("/admin/contacts")
    }

  }

  const handleDleteContact = async(id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/drivo/admin/contact/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorization,
        }
      })
  
      const data = await response.json();
      console.log(data);
  
      if(response.ok){
        getAllContacts();
        toast.error("Contact Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      <section id="admin-panel admin-users-section">

        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
    {
      contacts.map((contact, index) => {
        return <tr key={index}>
          <td>{contact.email}</td>
          <td>{contact.message}</td>
          <td>
            <button onClick={() => handleDleteContact(contact._id)}>Delete</button>
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

export default AdminContacts
