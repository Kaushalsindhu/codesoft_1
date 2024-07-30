import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home';
import Company from './components/Company/Company';
import Job from './components/Job/Job';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login.jsx';
import Register from './components/Login/Register.jsx'
import { AuthProvider } from './context/AuthProvider';
import FlashMessageProvider from './context/FlashMessageProvider'; 
import FlashMessage from './components/FlashMessage/FlashMessage';
import SingleJob from './components/Job/SingleJob.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>} >
      <Route path='' element={<Home/>} />
        <Route path='jobs/'>
            <Route path='all' element={<Job/>}/>
            <Route path=':jobId' element={<SingleJob/>} />
        </Route>
        <Route path='companies' element={<Company/>} />
        <Route path='dashboard/*' element={<Dashboard/>} />
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <FlashMessageProvider>
      <AuthProvider>
        <RouterProvider router={router}/>
        <FlashMessage />
      </AuthProvider>
    </FlashMessageProvider>
)
