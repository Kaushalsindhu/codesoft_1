import React, { useContext } from 'react'
import axios from 'axios'
import './Header.css'
import {NavLink, Link, useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faUser} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import { useFlashMessage } from '../../context/FlashMessageContext'

function Header() {
    const [isNavbarHidden, setIsNavbarHidden] = useState(true)
    const [isLoginHidden, setIsLoginHidden] = useState(true)
    const {user, isAuthenticated, logout} = useContext(AuthContext);
    const {showFlashMessage} = useFlashMessage();
    const navigate = useNavigate();

    const showNavbar = ()=>{
        if(!isLoginHidden) setIsLoginHidden(true)
        setIsNavbarHidden(!isNavbarHidden)
    }
    const showLogin = ()=>{
        if(!isNavbarHidden) setIsNavbarHidden(true)
        setIsLoginHidden(!isLoginHidden)
    }
    const hideNavAndLogin = ()=>{
        if(!isNavbarHidden) setIsNavbarHidden(true)
        if(!isLoginHidden) setIsLoginHidden(true)
    }

    const handleLogout = async ()=>{
        try {
            const response = await axios.get('/api/user/logout');
            logout(); 
            showFlashMessage(response.data.message, 'success');
            hideNavAndLogin();
            navigate('/login');
        } catch (error) {
            showFlashMessage('There was an error while logout!', 'error');
            console.error('There was an error logging out!', error);
        }
    }
 
    return (
        <header>
            <div className='brand'>
                <p>Opportu<span className='green'>Nest</span></p>
            </div>
            <div className='remaining'>
                <div className='hamburger' onClick={showNavbar}>
                    <FontAwesomeIcon className='hamburger-icon' icon={faBars} />
                </div>
                <div className={`navbar ${isNavbarHidden ? 'hidden' : ''}`}>
                    <ul>
                        <li><NavLink onClick={hideNavAndLogin} className={({isActive})=> `active nav-link ${isActive? 'navActive': ''}`} to='/'>Home</NavLink></li>
                        <li><NavLink onClick={hideNavAndLogin} className={({isActive})=> `nav-link ${isActive? 'navActive': ''}`} to='/jobs/all'>Jobs</NavLink></li>
                    </ul>
                </div>
                <div className='user' onClick={showLogin}>
                <FontAwesomeIcon className='user-icon' icon={faUser} />
                </div>
                <div className={`loginDiv ${isLoginHidden ? 'hidden' : ''}`}>
                    <ul>
                        {isAuthenticated ? (
                            <>
                                <li><Link onClick={hideNavAndLogin} className='dashBtn' to='/dashboard'>Dashboard</Link></li>
                                <li><button className='logoutBtn' onClick={handleLogout}>Logout</button></li>
                            </>
                        ) : (
                        <>
                            <li><NavLink onClick={hideNavAndLogin} className={({ isActive }) => `nav-link ${isActive ? 'navActive' : ''}`} to='/register'>Join Us</NavLink></li>
                            <li><NavLink onClick={hideNavAndLogin} className={({ isActive }) => `nav-link ${isActive ? 'navActive' : ''}`} to='/login'>SignIn</NavLink></li>
                        </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header