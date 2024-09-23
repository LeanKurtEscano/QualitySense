import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import GoogleButton from '../Components/GoogleButton';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const toggleIcon = () => {
    setShow(!show);
  };

  const goToDashboard= () => {
    

    navigate('/dashboard');
  }

  return (
    <section className='h-screen w-full flex justify-center items-center'>
      <div className='border-2  flex flex-col p-6 rounded-lg shadow-lg w-96'> 
        <div className='flex justify-center mb-3'>
          <img src='#' alt='Logo' className='h-16' /> 
        </div>
        <h2 className='text-2xl font-semibold  text-center text-customPurple3 mb-4'>Sign in</h2> 
        <form className='flex flex-col  '>
          <div className='mb-4 '>
            <label htmlFor='username' className='block mb-2'>Email Address:</label>
            <input
              type='email'
              id='username'
              className='border border-gray-300 rounded p-2 w-full'
              placeholder='Enter your email' 
            />
          </div>
          <div className='mb-4 relative'>
            <label htmlFor='password' className='block mb-2'>Password:</label>
            <input
              type={show ? 'text' : 'password'}
              id='password'
              className='border border-gray-300 rounded p-2 pr-10 w-full' 
              placeholder='Enter your password' 
            />
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              onClick={toggleIcon}
              className="absolute right-2 top-1/2 pt-2" 
              style={{ cursor: 'pointer' }}
            />
          </div>
          <button type='submit' onClick={goToDashboard} className='bg-customPurple3 text-white rounded p-2 hover:bg-purple-700 transition duration-300'>Sign in</button>
        </form>
        <div className='text-center pt-3 mb-1'>
          <p>Or via</p>
        </div>
        <GoogleButton />
      </div>
    </section>   
  );
}

export default Login;

