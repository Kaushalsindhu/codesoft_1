import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Job.css'
import { useFlashMessage } from '../../context/FlashMessageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

function Job() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const {showFlashMessage} = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs(); 
  }, []);

  const showJob = (jobId)=>{
    navigate(`/jobs/${jobId}`)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e)=>{
    setSearch(e.target.value);
  }

  const handleSubmit = () => {
    const lowerCaseSearch = search.toLowerCase();
  
    // Filter and sort jobs based on search term
    const sortedJobs = jobs
    .map(job => {
      const lowerCaseTitle = job.title.toLowerCase();
      const lowerCaseCompany = job.company.name.toLowerCase();
      const lowerCaseRequirements = job.requirements.toLowerCase();

      const titleMatch = lowerCaseTitle.includes(lowerCaseSearch);
      const companyMatch = lowerCaseCompany.includes(lowerCaseSearch);
      const requirementsMatch = lowerCaseRequirements.includes(lowerCaseSearch);

      return {
        ...job,
        matchPriority: titleMatch ? 1 : (requirementsMatch ? 2 : (companyMatch ? 3 : 4))
      };
    })
    .sort((a, b) => a.matchPriority - b.matchPriority);

    setJobs(sortedJobs);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div className='job-container'> 
        <div className="jobSearchDiv">
          <input type="text" value={search} placeholder='Search Jobs' onChange={handleChange}/>
          <button onClick={handleSubmit}>Search</button>
        </div><br /><br />
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job._id} className="job-card">
              <div className="job-info">
                <div className="job-details">
                  <h2>{job.title}</h2><br />
                  <p><strong className='strong'>Company :</strong>&nbsp;&nbsp; {job.company.name}</p><br />
                  <p><strong className='strong'>Location :</strong>&nbsp;&nbsp; {job.location}</p>
                </div>
                <div className="job-requirements">
                  <p><strong className='strong'>Experience :</strong>&nbsp;&nbsp; {job.experience}</p><br />
                  <p><strong className='strong'>Salary :</strong>&nbsp;&nbsp; {job.salary} </p><br />
                  <button onClick={() => showJob(job._id)} className="job-link">View Job</button>
                </div> 
              </div>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default Job