import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Applicants.css';
import { useFlashMessage } from '../../context/FlashMessageContext';

function Applicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {showFlashMessage} = useFlashMessage();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`/api/jobs/${jobId}/applicants`);
        setApplicants(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error}</div>;

  const handleReject = async (applicantId) => {
    try {
      const response = await axios.delete(`/api/jobs/${jobId}/applicants/${applicantId}`); // Update the endpoint if necessary
      showFlashMessage(response.data.message);
      setApplicants(applicants.filter(applicant => applicant._id !== applicantId));
    } catch (error) {
      console.error('Error rejecting applicant:', error);
    }
  };

  return (
    <div className="applicants">
      <h1>Applicants for job id({jobId})</h1><br />
      <div className="applicantCardsContainer">
        {applicants.map((applicant) => (
          <div key={applicant._id} className="applicantCard">
            <div className="applicantColumn applicantColumn1">
              <h3>{applicant.name}</h3>
              <p><strong>Name:</strong> {applicant.username}</p>
              <p><strong>Email:</strong> {applicant.email}</p>
            </div>
            <div className="applicantColumn applicantColumn2">
              <button onClick={() => handleReject(applicant._id)} className="rejectBtn">Reject</button>
              <Link to={applicant.resume.url} target="_blank" rel="noopener noreferrer">
                <button className="viewResumeBtn">View Resume</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applicants;