import React, { useState } from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import {useAuth} from '../Store/Auth'

function AdminLayout() {

  const {user, loading} = useAuth();

  console.log("User:", user);
  console.log("Loading:", loading);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (!user?.isAdmin) {
    console.log("User is not an admin, redirecting...");
    return <Navigate to="/" />;
  }

  return (
    <>
      <section>
        <div className="admin-controller">
          <div className="admin-nav">
            <ul>
              <li>
                <NavLink to="/admin" className={({ isActive }) => (isActive ? 'admin-nav-active' : "")} end>Dashboard</NavLink>
                {/* end prop. This ensures that the active class is only applied when the path matches exactly. */}
              </li>

              <li>
                <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'admin-nav-active' : "")}>Users</NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts" className={({ isActive }) => (isActive ? 'admin-nav-active' : "")}>Contacts</NavLink>
              </li>
              <li>
                <NavLink to="/admin/vehicles" className={({ isActive }) => (isActive ? 'admin-nav-active' : "")}>Vehicle</NavLink>
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
