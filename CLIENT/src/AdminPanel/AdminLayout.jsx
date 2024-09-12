import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function AdminLayout() {
    const [menu, setMenu] = useState(true)

    const handleNavbar = (e) => {
        setMenu(!menu);
    }

  return (
    <>
      <header>
        <div className="admin-controller">
            <div className="admin-upper">
                {
                    !menu ? <i className="fa-solid fa-bars admin-navbar" onClick={handleNavbar}></i> : <i className="fa-solid fa-x admin-navbar" onClick={handleNavbar}></i>
                }
                <h1>Admin Panel</h1>
            </div>
            <div className="admin-lower">
            <nav className={`admin-sidebar ${menu ? 'sidebar-active' : ''}`}>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/vehicles">Add Vehicle</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/contacts">Contacts</NavLink>
                    </li>
                    
                </ul>
            </nav>
            {/* <div className="admin-home">
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia voluptatum quas doloremque nihil quam maxime, expedita minima cumque animi voluptate? Sint magni nesciunt dolor doloribus sed quae voluptate enim repellat!</h1>
            </div> */}
            <Outlet />
            </div>
            
        </div>
      </header>
      
    </>
  )
}

export default AdminLayout
