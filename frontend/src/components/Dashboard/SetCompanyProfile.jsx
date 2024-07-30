import React, { useState } from 'react';
import axios from 'axios';
import './SetCompanyProfile.css'; // Optional: for styling
import { useFlashMessage } from '../../context/FlashMessageContext';

function SetCompanyProfile() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
    industry: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const {showFlashMessage} = useFlashMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/company/setProfile', formData);
      showFlashMessage(response.data.success + " Logout to see changes", 'success');
      setFormData({
        name: '',
        description: '',
        location: '',
        website: '',
        industry: ''
      }); // Clear the form after successful submission
    } catch (error) {
      console.error('Error creating company profile:', error);
      showFlashMessage('Error creating company profile', 'error');
    }
  };

  return (
    <div className='setCompanyProfile'>
      <h2>Set Company Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Company Name</label>
          <input
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='industry'>Industry</label>
          <input
            id='industry'
            name='industry'
            type='text'
            value={formData.industry}
            onChange={handleChange}
            required
        />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            id='location'
            name='location'
            type='text'
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='website'>Website (optional)</label>
          <input
            id='website'
            name='website'
            type='url'
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='btn'>
          Create Profile
        </button>
      </form>
    </div>
  );
}

export default SetCompanyProfile;