import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './PostedJobs.css'
import AuthContext from '../../context/AuthContext.js';
import { useFlashMessage } from '../../context/FlashMessageContext';
import { useNavigate } from 'react-router-dom';


function PostedJobs() {
  const [postedJobs, setPostedJobs] = useState([]);
  const { user } = useContext(AuthContext);
  const { showFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs/posted');
        setPostedJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };
    fetchJobs()
  }, [user]);

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`/api/jobs/${jobId}`);
      setPostedJobs(postedJobs.filter(job => job._id !== jobId));
      showFlashMessage('Job Deleted','success')
    } catch (error) {
      console.error('Error deleting job', error);
    }
  };

  const handleApplicants = (jobId) => {
    navigate(`/dashboard/applicants/${jobId}`);
  };

  return (
    <div className='postedJobs'>
      <h1>Posted Jobs</h1>
      {postedJobs.length > 0 ? (
        <div className='jobCardsContainer'>
          {postedJobs.map((job) => (
            <div key={job._id} className='jobCard'>
              <div className='jobColumn jobColumn1'>
                <h3>{job.title}</h3>
                <p className='posted-description'>{job.description}</p>
                <p><strong>Job ID:</strong> {job._id}</p>
              </div>
              <div className='jobColumn jobColumn2'>
                <p><strong>Location:</strong> <br className='nextLine' />{job.location}</p>
                <p><strong>Salary:</strong><br className='nextLine' /> {job.salary}</p>
                <p><strong>Experience:</strong><br className='nextLine' /> {job.experience}</p>
              </div>
              <div className='jobColumn jobColumn3'>
                <p><strong>Requirements:</strong><br /> {job.requirements}</p><br /><br />
                <button className='applicantsBtn' onClick={() => handleApplicants(job._id)}>Applicants</button>
                <button onClick={() => handleDelete(job._id)} className='deleteBtn'>Delete</button>
              </div>
            </div> 
          ))}
        </div>
      ) : ( 
        <p>No jobs posted yet.</p>
      )}
    </div>
  )
}

export default PostedJobs