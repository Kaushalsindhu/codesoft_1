import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'


function Layout() {
  return (
    <div className='wrapper'>  
        <Header/>
        <div className="main">
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Layout;