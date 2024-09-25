import React from 'react'
import GoogleButton from '../Components/GoogleButton';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const [confirmEye, setConfirmEye] = useState(false);
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const toggleIcon = () => {
    setShow(!show);
  };

  const toggleConfirm = () => {
    setConfirmEye(!confirmEye);
  }

  const signupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNameError("");
    setEmailError("");
    setPasswordError("");

    try {
      const response = await axios.post("http://localhost:8000/api/signup/", {
        username: username,
        email: email,
        password: password,
        confirm: confirm,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.data.Success) {
        navigate('/');
      }

    } catch (error: any) {

      if (error.response) {
        const { data } = error.response;
        if (data.User) {
          setNameError(data.User);
        }

        if (data.Email) {
          setEmailError(data.Email);
        }

        if (data.Pass) {
          setPasswordError(data.Pass);
        }
      }
    }
  }

  return (
    <section className='h-auto w-full flex justify-center items-center mt-60 mb-5 '>
      <div className='border-2  flex flex-col p-10 rounded-lg shadow-lg w-[480px] '>
        <div className='flex justify-center mb-2'>
          <img src='#' alt='Logo' className='h-16' />
        </div>
        <h2 className='text-2xl font-semibold  text-center text-customPurple3 mb-1'>Sign in</h2>
        <div className='flex items-center justify-center flex-row'>
          <p className='text-center mr-1'>or </p>
          <Link to='/'><p className='text-center text-customPurple3 font-semibold hover:underline decoration-customPurple3'>sign in to your account</p></Link>
        </div>


        <form className='flex flex-col' onSubmit={signupSubmit} >
          <div className='mb-4 '>
            <label htmlFor='username' className='block mb-2'>Username:</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              id='username'
              className='border border-gray-300 rounded p-2 w-full'
              placeholder='Enter your email'
            />
            {nameError && (
              <div className=''>
                <p className='text-red-600'>{nameError}</p>
              </div>
            )}
          </div>

          <div className='mb-4 '>
            <label htmlFor='username' className='block mb-2'>Email Address:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <label htmlFor='password' className='block mb-2'> Password:</label>
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
          </div>

          <div className='mb-1 relative'>
            <label htmlFor='password' className='block mb-2'> Confirm Password:</label>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}

              type={confirmEye ? 'text' : 'password'}
              id='password'
              className='border border-gray-300 rounded p-2 pr-10 w-full'
              placeholder='Enter your password'
            />
            <FontAwesomeIcon
              icon={confirmEye ? faEyeSlash : faEye}
              onClick={toggleConfirm}
              className="absolute right-2 top-1/2 pt-2"
              style={{ cursor: 'pointer' }}
            />
          </div>
          {passwordError && (
            <div className=''>
              <p className='text-red-600'>{passwordError}</p>
            </div>
          )}
          <button type='submit' className='bg-customPurple3 text-white rounded p-2
        hover:bg-purple-700 transition duration-300'>Sign in</button>
        </form>
        <div className='text-center pt-3 mb-1'>
          <p>Or via</p>
        </div>
        <GoogleButton />
      </div>
    </section>

  )
}

export default Signup