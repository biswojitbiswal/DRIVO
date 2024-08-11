import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../Store/Auth';


function Navbar() {
    const [menu, setMenu] = useState(false);

    const {isLoggedIn} = useAuth();

    const toggleBtn = () => {
        setMenu(!menu);
    }
    return (
        <nav className='navbar'>
            <div className="logo">
                <NavLink to="/"><h2><b>Drivo</b></h2></NavLink>
            </div>
            
            <div className="nav-menu">

                <ul className={`${menu ? 'active' : ''}`}>
                    <li className='close' onClick={toggleBtn}>
                        {
                            menu ? <i className="fa-solid fa-x"></i> : ''
                        }
                    </li>
                    <li onClick={toggleBtn}>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li onClick={toggleBtn}>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li onClick={toggleBtn}>
                        <NavLink to="/contact">Contact Us</NavLink>
                    </li>
                    <li onClick={toggleBtn}>
                        <NavLink to="/terms&conditions">Terms & Conditons</NavLink>
                    </li>
                    {
                        isLoggedIn ? 
                        
                        <li onClick={toggleBtn}>
                            <NavLink to="/logout">Logout</NavLink>
                        </li> : 
                        <>
                        <li onClick={toggleBtn}>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li onClick={toggleBtn}>
                            <NavLink to="/register">Register</NavLink>
                        </li>
                        </>
                    }
                </ul>

            </div>
            <div className='toggle-btn' onClick={toggleBtn}>
                {
                    !menu ? <i className="fa-solid fa-bars"></i> : ''
                }
            </div>
        </nav>
    )
}

export default Navbar
