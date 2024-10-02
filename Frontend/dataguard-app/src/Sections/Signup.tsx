import React from 'react'
import GoogleButton from '../Components/GoogleButton';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
const Signup: React.FC = () => {
  const [confirmEye, setConfirmEye] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

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
        setLoading(false);
      }

    } catch (error: any) {
      setLoading(false)
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
        if (data.Invalid) {
          alert("Please fill out all fields");
        }
      }
    }
  }

  return (
    <section className='h-auto w-full flex justify-center bg-darkbg items-center mt-40 pt-9 '>
      <div className='border-1 bg-loginbg flex flex-col p-10 rounded-lg shadow-lg w-[480px] mb-16'>
        <div className='flex justify-center mb-2'>
          <img src={logo} alt='Logo' className='h-10' />
        </div>
        <h2 className='text-2xl font-semibold text-center  text-cyan-500  mb-1'>Sign up</h2>
        <div className='flex items-center justify-center flex-row'>
          <p className='text-center text-slate-300 mr-1'>or </p>
          <Link to='/'>
            <p className='text-center text-cyan-500 font-semibold hover:underline decoration-cyan-500'>
              Login in to your account
            </p>
          </Link>
        </div>
        <form className='flex flex-col' onSubmit={signupSubmit}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-slate-300 mb-2'>Username:</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              id='username'
              className='border bg-inputcolor border-inputcolor placeholder:text-inputtext text-darktext3 focus:bg-inputcolor rounded p-2 w-full'
              placeholder='Enter your username'
              autoComplete='off'
            />
            {nameError && (
              <div className=''>
                <p className='text-red-600'>{nameError}</p>
              </div>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-slate-300 mb-2'>Email Address:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              className='bg-inputcolor border-inputcolor placeholder:text-inputtext text-darktext3 focus:bg-inputcolor rounded p-2 w-full'
              placeholder='Enter your email'
              autoComplete='off'
            />
            {emailError && (
              <div className=''>
                <p className='text-red-600'>{emailError}</p>
              </div>
            )}
          </div>
          <div className='mb-4 relative'>
            <label htmlFor='password' className='block text-slate-300 mb-2'>Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? 'text' : 'password'}
              id='password'
              className='border bg-inputcolor border-inputcolor placeholder:text-inputtext text-darktext3 focus:bg-inputcolor rounded p-2 pr-10 w-full'
              placeholder='Enter your password'
            />
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              onClick={toggleIcon}
              className="absolute right-2 text-white top-1/2 pt-2"
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className='mb-3 relative'>
            <label htmlFor='confirmPassword' className='block text-slate-300 mb-2'>Confirm Password:</label>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type={confirmEye ? 'text' : 'password'}
              id='confirmPassword'
              className='border bg-inputcolor border-inputcolor placeholder:text-inputtext text-darktext3 focus:bg-inputcolor rounded p-2 pr-10 w-full'
              placeholder='Confirm your password'
            />
            <FontAwesomeIcon
              icon={confirmEye ? faEyeSlash : faEye}
              onClick={toggleConfirm}
              className="absolute right-2 text-white top-1/2 pt-2"
              style={{ cursor: 'pointer' }}
            />
          </div>
          {passwordError && (
            <div className=''>
              <p className='text-red-600'>{passwordError}</p>
            </div>
          )}
          <button
            type='submit'
            className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-300 flex justify-center items-center'
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
                loading
              </>
            ) : (
              'Sign up'
            )}
          </button>
        </form>
        <div className='text-center pt-3 mb-2'>
          <p className='text-slate-200'>Or via</p>
        </div>
        <GoogleButton />
      </div>
    </section>
  )
}

export default Signup