import React from 'react'
import './Footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className='footer'>
        <div className='footer-container'>
            <div className='footer-section contact'>
                <h3>Contact Us</h3>
                <p>Email: support@jobportal.com</p>
                <p>Phone: +123 456 7890</p>
                <p>Address: 123 Job Portal Ave, Job City, JP 12345</p>
            </div>
            <div className='footer-section links'>
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Jobs</a></li>
                    <li><a href="#">Companies</a></li>
                    <li><a href="#">Employers</a></li>
                </ul>
            </div>
            <div className='footer-section social'>
                <h3>Follow Us</h3>
                <div className='social-links'>
                    <a href="#"><FaLinkedin size={28} color="#fff" /></a>
                    <a href="#"><FaFacebook size={28} color="#fff" /></a>
                    <a href="#"><FaInstagram size={28} color="#fff" /></a>
                </div>
            </div>
        </div>
        <div className='footer-bottom'>
            <p>&copy; 2024 Job Portal. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer