import React, { useState, useContext } from 'react';
import axios from 'axios';
import './PostJob.css';
import { useNavigate } from 'react-router-dom';
import { useFlashMessage } from '../../context/FlashMessageContext';
import AuthContext from '../../context/AuthContext';

function PostJob() {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    jobType: '',
    experience: '',
    requirements: ''
  });

  const { showFlashMessage } = useFlashMessage();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(user){
        const response = await axios.post('/api/jobs/new', jobData);
        showFlashMessage('New Job created!', 'success');
        setJobData({
          title: '',
          description: '',
          location: '',
          salary: '',
          jobType: '',
          experience: '', 
          requirements: '',
        });
        navigate('/dashboard/')
      }else {
        showFlashMessage('You must be logged in to post a job', 'error')
      }
    } catch (error) {
      console.error('Error posting the job:', error);
    }
  };

  return (
    <div className="newJobPage">
      <div className="jobFormDiv">
        <form className="jobForm" onSubmit={handleSubmit}>
          <input name="title" value={jobData.title} onChange={handleChange} type="text" placeholder="Job Title" required/><br />
          <textarea name="description" value={jobData.description} onChange={handleChange} placeholder="Job Description" required /><br />
          <input name="location" value={jobData.location} onChange={handleChange} type="text" placeholder="Location" required /><br />
          <input name="salary" value={jobData.salary} onChange={handleChange} type="text" placeholder="Salary" required /><br />
          <select name="jobType" value={jobData.jobType} onChange={handleChange} required >
            <option value="">Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select><br />
          <input name="experience" value={jobData.experience} onChange={handleChange} type="text" placeholder="Experience Required" required /><br />
          <textarea name="requirements" value={jobData.requirements} onChange={handleChange} placeholder="Job Requirements" required /><br />
          <button type="submit" className="btn">Post Job</button>
        </form>
      </div>
    </div>
  )
}

export default PostJob