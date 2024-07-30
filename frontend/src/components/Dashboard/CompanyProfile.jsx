import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompanyProfile.css';
import { useFlashMessage } from '../../context/FlashMessageContext';

function CompanyProfile() {
  const [profile, setProfile] = useState({
    name: '',
    industry: '',
    description: '',
    website: '',
    location: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const {showFlashMessage} = useFlashMessage();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/company/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('There was an error fetching the company profile!', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/company/profile', profile);
      setIsEditing(false);
      showFlashMessage(response.data.message, 'success');
    } catch (error) {
      console.error('There was an error updating the company profile!', error);
    }
  };

  return (
    <div className="companyProfile">
      <h1>Company Profile</h1>
      {isEditing ? (
        <form className="profileForm" onSubmit={handleSubmit}>
          <label>
            Company Name: <br />
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Industry: <br />
            <input
              type="text"
              name="industry"
              value={profile.industry}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description: <br />
            <textarea
              name="description"
              value={profile.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Website: <br />
            <input
              type="text"
              name="website"
              value={profile.website}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location: <br />
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="profileDetails">
          <p><strong>Company Name:</strong> {profile.name}</p>
          <p><strong>Industry:</strong> {profile.industry}</p>
          <p><strong>Description:</strong> {profile.description}</p>
          <p><strong>Website:</strong> <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a></p>
          <p><strong>Location:</strong> {profile.location}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div> 
      )} 
    </div>
  );
}

export default CompanyProfile;