import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import './SingleJob.css'
import axios from 'axios';
import { useFlashMessage } from './../../context/FlashMessageContext';

function SingleJob() {
  const [job,setJob] = useState(null);
  const {jobId} = useParams();
  const {showFlashMessage} = useFlashMessage();
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchJob();
  }, []);
 
  const handleSave = async (jobId) => {
    try {
      const response = await axios.post(`/api/jobs/save/${jobId}`);
      showFlashMessage(response.data.message, response.data.type);
    } catch (error) {
      showFlashMessage('Some error occured while applying', error.message);
    }
  }

  const handleApply = async (jobId) => {
    try {
      const response = await axios.post(`/api/jobs/apply/${jobId}`);
      showFlashMessage(response.data.message, response.data.type);
    } catch (error) {
      showFlashMessage('Some error occured while applying', error.message);
    }
  }

  return (
    <div className="single-job-card">
      {job ? (
        <div>
          <h2>{job.title}</h2><br />
          <div className="single-job-info">
            <div className="single-job-details">
              <p><strong>Company:</strong> {job.company.name}</p><br />
              <p><strong>Description:</strong> {job.description}</p><br />
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> Rs. {job.salary} / month</p>
            </div>
            <div className="single-job-requirements">
              <p><strong>Experience:</strong> {job.experience}</p><br />
              <p><strong>Requirements:</strong> {job.requirements}</p><br />
            </div>
          </div>
          <div className='jobBtns'>
            <button className="apply-btn" onClick={() => handleApply(job._id)}>Apply</button>
            <button className="save-btn" onClick={() => handleSave(job._id)}>Save</button>
          </div>
        </div>
      ):(
        <div>Loading...</div>
      )}      
    </div>
  )
}

export default SingleJob