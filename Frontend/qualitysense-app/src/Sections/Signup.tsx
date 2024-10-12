import React from 'react';
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

  const validateName = () => {
    const specialCharacterRegex = /[^a-zA-Z0-9]/;
    if (username.length < 4) {
      setNameError("Username should be a minimum of 4 characters");
      return false;
    } else if (username.length > 20) {
      setNameError("Username should not exceed 20 characters");
      return false;
    } else if (specialCharacterRegex.test(username)) {
      setNameError("Username should not contain special characters");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|[a-z]{2,})$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password should be a minimum of 6 characters");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirm) {
      setPasswordError("Passwords do not match");
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const toggleIcon = () => {
    setShow(!show);
  };

  const toggleConfirm = () => {
    setConfirmEye(!confirmEye);
  };

  const signupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setLoading(true);

    const isValidName = validateName();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();

    // Fixing the logical condition to check all validations
    if (!isValidName || !isValidEmail || !isValidPassword || !isValidConfirmPassword) {
      setLoading(false);
      return;
    }

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
      });

      if (response.data.Success) {
        navigate('/');
        setLoading(false);
      }

    } catch (error: any) {
      setLoading(false);
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
  };

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
              Login to your account
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
              required
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
          <div className='mb-1 relative'>
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
            <div className='mb-2'>
              <p className='text-red-600'>{passwordError}</p>
            </div>
          )}
          <button
            type='submit'
            className='bg-gradient-to-r mt-4 from-cyan-500 to-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-300 flex justify-center items-center'
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
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90 38 37 90q0 2 0 2zm905-77q0 52-37 89.5t-90 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90 38 37 90q0 2 0 2zm-1132 0q0 52 37 89.5t90 37.5q52 0 90-38t38-90q0-53-37.5-90.5t-90.5-37.5-90 38-37 90q0 2 0 2zm181-418q0 52-37 89.5t-90 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90 38 37 90q0 2 0 2zm905-77q0 52-37 89.5t-90 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90 38 37 90q0 2 0 2zM80 887q0 52 37 89.5t90 37.5q52 0 90-38t38-90q0-53-37.5-90.5t-90.5-37.5-90 38-37 90q0 2 0 2zm906-77q0 52-37 89.5t-90 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90 38 37 90q0 2 0 2zm-1132 0q0 52 37 89.5t90 37.5q52 0 90-38t38-90q0-53-37.5-90.5t-90.5-37.5-90 38-37 90q0 2 0 2zm181-418q0 52-37 89.5t-90 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90 38 37 90q0 2 0 2zM117 826q0 52 37 89.5t90 37.5q52 0 90-38t38-90q0-53-37.5-90.5t-90.5-37.5-90 38-37 90q0 2 0 2zm1198 414q0 52-37 89.5t-90 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90 38 37 90q0 2 0 2zM0 745q0 52 37 89.5t90 37.5q52 0 90-38t38-90q0-53-37.5-90.5t-90.5-37.5-90 38-37 90q0 2 0 2z" />
                </svg>
                Loading...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
          <div className='flex justify-center items-center mt-2'>
            <p className='text-slate-300 mr-1'>Already have an account?</p>
            <Link to='/'>
              <p className='text-cyan-500 hover:underline'>Login</p>
            </Link>
          </div>
        </form>
        <div className='mt-4'>
          <GoogleButton />
        </div>
      </div>
    </section>
  );
};

export default Signup;
