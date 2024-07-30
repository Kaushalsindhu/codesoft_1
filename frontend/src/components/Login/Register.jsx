import React, {useContext, useState} from 'react'
import axios from 'axios'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { useFlashMessage } from '../../context/FlashMessageContext';
import Login from './Login';
import AuthContext from '../../context/AuthContext';

function Register() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    category: '',
  });

  const navigate = useNavigate();
  const { showFlashMessage } = useFlashMessage();
  const {login, user} = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/register', formData); 
      if(res.data.error){
        showFlashMessage(res.data.error, 'error');
      } else {
        showFlashMessage(res.data.success, 'success');
        const response = await axios.get('/api/user/login/protected');
        showFlashMessage(response.data.success, 'success');
        login(response.data.user);
        console.log(localStorage);
      }
      navigate('/')
    } catch (error) {
      showFlashMessage('There was an error registering!', 'error');
      console.error('There was an error registering!', error);
    }
  };

  return (
    <div className='registerPage'>
      <div className='regImgDiv'>
        <img src="/assets/register2.jpg" alt="people" />
      </div>
      
      <div className='regFormDiv'>
      <h2>Join Us</h2>
        <form className='regForm' onSubmit={handleSubmit}>
          <select name='category' value={formData.category} onChange={handleChange} required>
          <option value="">Register As..</option>
          <option value="employer">Employer</option>
          <option value="jobseeker">Job Seeker</option>
          </select><br />
          <input name='username' value={formData.username} onChange={handleChange} type="text" placeholder='Username' className='username' required/><br />
          <input name='password' value={formData.password} onChange={handleChange} type="password" placeholder='Password' className='password' required/><br />
          <input name='email' value={formData.email} onChange={handleChange} type="email" placeholder='Email' className='email' required/><br />
          <button type='submit' className='btn'>Register</button>
        </form>
      </div> 
    </div>
  )
}

export default Register