import React, { useState } from 'react';
import GoogleButton from '../Components/GoogleButton';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { getUserOTP } from '../Api/Axios';
import logo from '../assets/logo.png';
import { useMyContext } from '../Components/MyContext';

const Signup: React.FC = () => {
  const [confirmEye, setConfirmEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); // New state for confirm password error
  const {  setUserSignUp, runTimer, setRunTimer } = useMyContext();
  const navigate = useNavigate();

  const validateName = () => {
    const specialCharacterRegex = /[^a-zA-Z0-9]/;
    if (username.length < 4) {
      setNameError('Username should be a minimum of 4 characters');
      return false;
    } else if (username.length > 20) {
      setNameError('Username should not exceed 20 characters');
      return false;
    } else if (specialCharacterRegex.test(username)) {
      setNameError('Username should not contain special characters');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|[a-z]{2,})$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password should be a minimum of 6 characters');
      return false;
    }

    if (password.trim().length === 0) {
      setPasswordError('Password should not be empty or contain only spaces');
      return false;
    } 
    
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirm) {
      setConfirmPasswordError('Passwords do not match'); // Use the new confirm password error state
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const toggleIcon = () => setShow(!show);
  const toggleConfirm = () => setConfirmEye(!confirmEye);

  const signupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError(''); 
    setLoading(true);

    const isValidName = validateName();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();

    if (!isValidName || !isValidEmail || !isValidPassword || !isValidConfirmPassword) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/signup/', {
        username,
        email,
        password,
        confirm,
      });

      if (response.data.success) {
        const userOTP = await getUserOTP(email);
        if (userOTP.status === 200) {
          setRunTimer(!runTimer);
          localStorage.setItem('run', String(runTimer));
          localStorage.setItem('email', email);
          setUserSignUp({ username, email, password, confirmPassword: confirm });
          navigate('/auth');
        }
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        const { data } = error.response;
        setNameError(data.User || '');
        setEmailError(data.Email || '');
        setPasswordError(data.Pass || data.Invalid || '');
      }
    }
  };

  return (
    <section className="h-auto w-full flex justify-center bg-darkbg items-center mt-40 pt-9">
      <div className="border-1 bg-loginbg flex flex-col p-10 rounded-lg shadow-lg w-[480px] mb-16">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-cyan-500 mb-1">Sign up</h2>
        <div className="flex items-center justify-center flex-row">
          <p className="text-center text-slate-300 mr-1">or </p>
          <Link to="/">
            <p className="text-center text-cyan-500 font-semibold hover:underline decoration-cyan-500">
              Login to your account
            </p>
          </Link>
        </div>
        <form className="flex flex-col" onSubmit={signupSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-slate-300 mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              id="username"
              className="border bg-inputcolor border-inputcolor placeholder:text-inputtext text-darktext3 focus:bg-inputcolor rounded p-2 w-full"
              placeholder="Enter your username"
              autoComplete="off"
            />
            {nameError && <p className="text-red-600">{nameError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-slate-300 mb-2">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="bg-inputcolor border-inputcolor placeholder:text-inputtext text-darktext3 focus:bg-inputcolor rounded p-2 w-full"
              placeholder="Enter your email"
              autoComplete="off"
              required
            />
            {emailError && <p className="text-red-600">{emailError}</p>}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-slate-300 mb-2">Password:</label>
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="border bg-inputcolor border-inputcolor placeholder:text-inputtext text-darktext3 focus:bg-inputcolor rounded p-2 pr-10 w-full"
              placeholder="Enter your password"
            />
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              onClick={toggleIcon}
              className="absolute right-2 text-white top-1/2 pt-2 cursor-pointer"
            />
          </div>

          <div className="mb-1 relative">
            <label htmlFor="confirmPassword" className="block text-slate-300 mb-2">Confirm Password:</label>
            <input
              type={confirmEye ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              id="confirmPassword"
              className="border bg-inputcolor border-inputcolor placeholder:text-inputtext text-darktext3 focus:bg-inputcolor rounded p-2 pr-10 w-full"
              placeholder="Confirm your password"
            />
            <FontAwesomeIcon
              icon={confirmEye ? faEyeSlash : faEye}
              onClick={toggleConfirm}
              className="absolute right-2 text-white top-1/2 pt-2 cursor-pointer"
            />
          </div>
          {passwordError && <p className="text-red-600">{passwordError}</p>}
          {confirmPasswordError && <p className="text-red-600">{confirmPasswordError}</p>}

          <button
            type="submit"
            className="bg-gradient-to-r mt-4 from-cyan-500 to-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-300 flex justify-center items-center"
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
                  <path d="M526 1313q8 25-4 48t-38 31l-106 38q-26 9-49-3t-31-38q-9-26 3-49t38-31l106-38q26-9 49 3t31 38zm860-39l102 36q25 9 37 31t3 49q-9 26-31 38t-49 3l-102-36q-25-9-37-31t-3-49q9-26 31-37t49-4zm-908-612l38 106q8 25-4 48t-38 31l-106 38q-26 9-49-3t-31-38q-9-26 3-49t38-31l106-38q26-9 49 3t31 38zm684 945q0 27-18.5 45.5T896 1667t-45.5-18.5T832 1603t18.5-45.5T896 1539t45.5 18.5T960 1603zm-448-448q0 27-18.5 45.5T448 1219t-45.5-18.5T384 1155t18.5-45.5T448 1091t45.5 18.5T512 1155zm575-61q26 9 38 31t4 49q-9 26-31 38t-49 3l-102-36q-25-9-37-31t-3-49q9-26 31-37t49-4zm-966-684q26 9 38 31t4 49q-9 26-31 38t-49 3L55 407q-26-9-38-31t-4-49q9-26 31-38t49-3l102 36q25 9 37 31t3 49zM896 384q0 27-18.5 45.5T832 448t-45.5-18.5T768 384t18.5-45.5T832 320t45.5 18.5T896 384zm672 1152q0 26-18.5 45T1504 1600q-26 0-45-19t-19-45q0-26 19-45t45-19q27 0 45.5 18.5T1568 1536zm-64-896q0 27-18.5 45.5T1408 704t-45.5-18.5T1344 640t18.5-45.5T1408 576t45.5 18.5T1472 640z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Sign up'
            )}
          </button>
        </form>

        <div className="flex items-center mb-3 mt-3">
          <span className="border-b border-slate-600 w-full"></span>
          <span className="mx-2 text-slate-500">or</span>
          <span className="border-b border-slate-600 w-full"></span>
        </div> 

        <GoogleButton />
      </div>
    </section>
  );
};

export default Signup;
