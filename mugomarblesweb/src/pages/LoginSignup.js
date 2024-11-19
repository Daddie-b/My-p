import React, { useState } from 'react';
import './LoginSignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../utils/authUtils';

const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Destructure formData values
  const { username, email, password } = formData;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  // Handle form submission
  const handleSubmit = async () => {
    if (action === 'Sign Up' && password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }
  
    const url = action === 'Login' 
      ? 'https://my-p-backend.onrender.com/api/auth/login' 
      : 'https://my-p-backend.onrender.com/api/auth/register';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      console.log('Backend response:', result); // Debugging to check the full response
  
      if (response.ok) {
        setMessage(`${action} successful!`);
        
        if (action === 'Login') {
          localStorage.setItem('token', result.token);
          
          const { role } = parseJwt(result.token); // Use parseJwt to get the role
          console.log('User role:', role); // Debugging to ensure correct role is received

          // Redirect based on role
          if (role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/home');
          }
        } else {
          setAction('Login');
          setMessage('Registration successful! Please log in.');
        }
      } else {
        setMessage(result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during submit:', error);
      setMessage('Server error occurred');
    }
  };
  

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === 'Login' ? <div></div> : (
          <div className='input'>
            <FontAwesomeIcon icon={faUser} className="icon" />
            <input 
              type='text' 
              placeholder='Username' 
              name='username' 
              value={username} 
              onChange={handleChange} 
            />
          </div>
        )}
        <div className='input'>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input 
            type='email' 
            placeholder='Email' 
            name='email' 
            value={email} 
            onChange={handleChange} 
          />
        </div>
        <div className='input'>
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input 
            type='password' 
            placeholder='Password' 
            name='password' 
            value={password} 
            onChange={handleChange} 
          />
        </div>
      </div>
      {action === 'Sign Up' ? <div></div> : (
        <div className='forgot-password'>
          Forgot password? <span>click here!</span>
        </div>
      )}
      
      {message && <div className='message'>{message}</div>}
      
      <div className='submit-container'>
        <div 
          className='submit' 
          onClick={handleSubmit}
        >
          {action === 'Login' ? 'Login' : 'Sign Up'}
        </div>
      </div>
      
      {/* Toggle between login and signup */}
      <div className='toggle-action'>
        {action === 'Login' ? (
          <p>Don't have an account? <span onClick={() => setAction('Sign Up')}>Sign Up</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setAction('Login')}>Login</span></p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
