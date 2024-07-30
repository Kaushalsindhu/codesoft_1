import React, { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import { useFlashMessage } from '../../context/FlashMessageContext';
import './UploadResume.css'

function UploadResume() {
  const {user} = useContext(AuthContext);
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const {showFlashMessage} = useFlashMessage();

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', resume);

    try {
      setUploading(true);
      const response = await axios.post(`/api/user/${user._id}/uploadResume`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      });
      setUploadedUrl(response.data.url);
      setUploading(false);
      showFlashMessage(response.data.message + ' Logout and signIn again to see changes', response.data.type);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      showFlashMessage('Something went wrong', 'error');
    }
  };

  const handleRemoveResume = async () => {
    const res = await axios.post(`/api/user/${user._id}/removeResume`);
    showFlashMessage(res.data.message + ' Logout and signIn again to see changes', res.data.type);
    setResume(null);
    setUploadedUrl('');
  };

  return (
    <div className="upload-resume">
      {(user.resume) ? (
        <div className="resume-display">
          <div className='frameDiv'>
            {user.resume.url.endsWith('.pdf') ? (
              <iframe src={user.resume.url} width="600" height="600" title="Resume"></iframe>
            ) : (
              <img src={user.resume.url} alt="Uploaded Resume" width="300" height="400" />
            )}
          </div>
          <button className='removeBtn' onClick={handleRemoveResume}>Remove</button>
        </div>
        
      ) : (
        <div className="upload-button">
          <label htmlFor="file-upload">Choose file</label>
          <input 
            id='file-upload'
            type="file" 
            accept=".pdf,.doc,.png,.jpg,.jpeg,.webp" 
            onChange={handleFileChange}
          />
          <button onClick={handleFileUpload} disabled={!resume || uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}
    </div>
  );
} 

export default UploadResume;