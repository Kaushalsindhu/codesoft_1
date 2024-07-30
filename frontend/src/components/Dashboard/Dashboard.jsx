import React, {useContext} from 'react'
import './Dashboard.css'
import { Link, Route, Routes } from 'react-router-dom'
import Applicants from './Applicants'
import PostedJobs from './PostedJobs'
import CompanyProfile from './CompanyProfile'
import SetCompanyProfile from './SetCompanyProfile.jsx'
import PostJob from './PostJob'
import UploadResume from './UploadResume.jsx'
import SavedJobs from './SavedJobs.jsx'
import Notification from './Notification.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faUpload} from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../context/AuthContext'


function Dashboard() {
  
  const { user } = useContext(AuthContext);

  return (
    <>
    {
      user? (
        user.category === 'employer' ? (
          <div className='dashboard'>
            <div className="sidebar">
              <button className='postBtn'><Link className='sidebarLink postBtnLink' to="post-job"><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />&nbsp;&nbsp;&nbsp;&nbsp;Post a Job</Link></button>
              <div className='emp-options'>
                <button><Link className='sidebarLink' to="">Posted Jobs</Link></button>
                {
                  user.company ? (
                    <button><Link className='sidebarLink' to="company-profile">Company Profile</Link></button>
                  ) : (
                    <button><Link className='sidebarLink' to="set-company-profile">Set Company Profile</Link></button>
                  )
                }
                <button><Link className='sidebarLink' to="applicants">Applicants</Link></button>
              </div>
            </div>
            <div className="dashScreen">
              <Routes>
                <Route path='post-job' element={<PostJob />} />
                <Route path="/" element={<PostedJobs />} />
                <Route path="company-profile" element={<CompanyProfile />} />
                <Route path="set-company-profile" element={<SetCompanyProfile />} />
                <Route path="applicants/:jobId" element={<Applicants />} />
                
                {/* Default route */}
              </Routes>
            </div>
          </div>
        ) : (
          <div className='dashboard'>
            <div className="sidebar">
              <button className='postBtn'><Link className='sidebarLink postBtnLink' to="/"><FontAwesomeIcon icon={faUpload} style={{color: "#ffffff",}} />&nbsp;&nbsp;&nbsp;&nbsp;Upload Resume</Link></button>
              <div className='emp-options'>                
                <button><Link className='sidebarLink' to="saved-jobs">Saved Jobs</Link></button>
                <button><Link className='sidebarLink' to="notification">Notifications</Link></button>
              </div>
            </div>
            <div className="dashScreen">
              <Routes>
                <Route path='/' element={<UploadResume />} />
                <Route path="saved-jobs" element={<SavedJobs />} />
                <Route path="notification" element={<Notification />} />
                {/* Default route */}
              </Routes>
            </div>
          </div>
        )
      ):(
        <div>Login to access dashboard</div>
      )
    }
    </>
  );
}


  


export default Dashboard