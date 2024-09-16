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

    const handleClose = () => {
        setMenu(false);
    }
    return (
        <nav className='navbar'>
            <div className="account">
                <div className='user-account'>
                    <NavLink className='user-icon' to="/account"><i className="fa-solid fa-user"></i></NavLink>
                </div>
                <NavLink className='logo' to="/"><h2><b>Drivo</b></h2></NavLink>
            </div>
            
            <div className="nav-menu">
                <ul className={`${menu ? 'active' : ''}`}>
                    <li className='close' onClick={toggleBtn}>
                        {
                            menu ? <i className="fa-solid fa-x"></i> : ''
                        }
                    </li>
                    <li onClick={handleClose}>
                        <NavLink to="/" className={({isActive}) => isActive ? "hovering" : "nav-link"}>Home</NavLink>
                    </li>
                    <li onClick={handleClose}>
                        <NavLink to="/about" className={({isActive}) => isActive ? "hovering" : "nav-link"}>About</NavLink>
                    </li>
                    <li onClick={handleClose}>
                        <NavLink to="/contact" className={({isActive}) => isActive ? "hovering" : "nav-link"}>Contact Us</NavLink>
                    </li>
                    <li onClick={handleClose}>
                        <NavLink to="/terms&conditions" className={({isActive}) => isActive ? "hovering" : "nav-link"}>Terms & Conditons</NavLink>
                    </li>     
                </ul> 
                <div className="auth-link">
                    {
                        isLoggedIn ? 
                        
                        <div>
                            <NavLink to="/logout" className={({isActive}) => isActive ? "hovering" : "nav-link"}>Logout</NavLink>
                        </div> : 
                        <>
                        <div>
                            <NavLink to="/login" className={({isActive}) => isActive ? "hovering" : "nav-link"}>Login</NavLink>
                        </div>
                        
                        </>
                    }
                </div> 
                <div className='toggle-btn' onClick={toggleBtn}>
                {
                    !menu ? <i className="fa-solid fa-bars"></i> : ''
                }
                </div>            
            </div>
            
            
        </nav>
    )
}

export default Navbar
