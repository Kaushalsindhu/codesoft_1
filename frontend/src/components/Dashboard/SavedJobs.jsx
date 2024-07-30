import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SavedJobs.css';
import {Link, useNavigate} from 'react-router-dom'
import { useFlashMessage } from '../../context/FlashMessageContext';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();
  const {showFlashMessage} = useFlashMessage();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get('/api/jobs/saved');
        setSavedJobs(response.data);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchSavedJobs();
  }, []);

  const showJob = (jobId)=>{
    navigate(`/jobs/${jobId}`)
  }

  const removeJob = async (jobId)=>{
    const response = await axios.post(`/api/jobs/saved/${jobId}`);
    showFlashMessage(response.data.message, response.data.type);
  }

  return (
    <div className="saved-jobs-container">
      <h2>Saved Jobs</h2>
      {savedJobs.length > 0 ? (
        <div className="saved-jobs-list">
          {savedJobs.map((job) => (
            <div key={job._id} className="saved-job-card">
              <div className='column1'>
                <h3>{job.title}</h3>
                <p>{job.company.name}</p>
              </div>
              <div className="column2">
                <button onClick={() => showJob(job._id)} className="saved-job-link">View Job</button>
                <button onClick={() => removeJob(job._id)} className="saved-job-link">Remove Job</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved jobs found</p>
      )}
    </div>
  );
};

export default SavedJobs;