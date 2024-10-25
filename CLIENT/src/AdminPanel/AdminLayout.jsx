import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function AdminLayout() {
    const [menu, setMenu] = useState('dashboard')

    const handleNavbar = (menuItem) => {
        setMenu(menuItem);
    }

  return (
    <>
      <section>
        <div className="admin-controller">
            <div className="admin-nav">
            <ul>
                    <li onClick={() => handleNavbar('dashboard')} className={menu === 'dashboard' ? 'admin-nav-active' : ''}>
                        <NavLink to="/admin">Dashboard</NavLink>
                    </li>
                    
                    <li onClick={() => handleNavbar('users')} className={menu === 'users' ? 'admin-nav-active' : ''}>
                        <NavLink to="/admin/users">Users</NavLink>
                    </li>
                    <li onClick={() => handleNavbar('contacts')} className={menu === 'contacts' ? 'admin-nav-active' : ''}>
                        <NavLink to="/admin/contacts">Contacts</NavLink>
                    </li>
                    <li onClick={() => handleNavbar('vehicle')} className={menu === 'vehicle' ? 'admin-nav-active' : ''}>
                        <NavLink to="/admin/vehicles">Vehicle</NavLink>
                    </li>
                    
                </ul>
            
            </div>
            <Outlet />
            
        </div>
      </section>
      
    </>
  )
}

export default AdminLayout
