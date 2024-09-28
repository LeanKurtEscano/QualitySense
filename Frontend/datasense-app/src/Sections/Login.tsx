import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import GoogleButton from '../Components/GoogleButton';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const toggleIcon = () => {
    setShow(!show);
  };


  const loginSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email: email,
        password: password

      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      })
      navigate('/dashboard');
      const {access, refresh} = response.data
      localStorage.setItem("access_token",access);
      localStorage.setItem("refresh_token",refresh);
    }catch(error: any) {
      if(error.response){
        const {data} = error.response

        if (data.Pass) {
          setPasswordError(data.Pass);
        }

        if(data.Email) {
          setEmailError(data.Email)
 
        }
      }      

    }

  }

  return (
    <section className='h-screen w-full flex justify-center items-center'>
      <div className='border-2  flex flex-col p-6 rounded-lg shadow-lg w-96'> 
        <div className='flex justify-center mb-3'>
          <img src='#' alt='Logo' className='h-16' /> 
        </div>
        <h2 className='text-2xl font-semibold  text-center text-customPurple3'>Sign in</h2> 
        <div className='flex items-center justify-center flex-row mb-2'>
          <p className='text-center mr-1'>or </p>
          <Link to='/signup'><p className='text-center text-customPurple3 font-semibold hover:underline decoration-customPurple3'>sign up for an account</p></Link>
        </div>
        <form className='flex flex-col  ' onSubmit={loginSubmit}>
          <div className='mb-4 '>
            <label htmlFor='username' className='block mb-2'>Email Address:</label>
            <input
              type='email'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              id='username'
              className='border border-gray-300 rounded p-2 w-full'
              placeholder='Enter your email' 
            />
            {emailError && (
              <div className=''>
                <p className='text-red-600'>{emailError}</p>
              </div>
            )}
          </div>
          <div className='mb-4 relative'>
            <label htmlFor='password' className='block mb-2'>Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}

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
            {passwordError && (
              <div className=''>
                <p className='text-red-600'>{passwordError}</p>
              </div>
            )}
          </div>
          <button type='submit'className='bg-customPurple3 text-white rounded p-2
          hover:bg-purple-700 transition duration-300'>Sign in</button>
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
