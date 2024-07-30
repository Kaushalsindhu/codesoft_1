import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useFlashMessage } from '../../context/FlashMessageContext';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { showFlashMessage } = useFlashMessage();

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
      await axios.post('/api/user/login', formData);
      const response = await axios.get('/api/user/login/protected');
      if(response.data.error){
        showFlashMessage(response.data.error, 'error');
        navigate('/register')
      }
      else if(response.data.success){
        login(response.data.user);
        showFlashMessage(response.data.success, 'success');
        navigate('/')
      }
    } catch (error) { 
      showFlashMessage('There was an error while login!', 'error');
      console.error('There was an error while login!', error);
    }
  };

  return (
    <div className='loginPage'>
      <div className="loginImgDiv">
        <img src="/assets/login2.jpg" alt="login" />
      </div>
      <div className='loginFormDiv'>
        <h2>Login</h2>
        <form className='loginForm' onSubmit={handleSubmit}>
          <input name='username' value={formData.username} onChange={handleChange} type="text" placeholder='Username' className='username'/><br />
          <input name='password' value={formData.password} onChange={handleChange} type="password" placeholder='Password' className='password'/><br />
          <button type='submit' className='btn'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login 