import React, { useState, useEffect } from 'react';
import { useMyContext } from '../Components/MyContext';
import { verifyOTP, getUserOTP } from '../Api/Axios';
import { useNavigate } from 'react-router-dom';

const OTPForm: React.FC = () => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const [invalid, setInvalid] = useState("");
  const { runTimer, setRunTimer, userSignUp, setUserSignUp } = useMyContext();
  const [seconds, setSeconds] = useState<number>(120);
  const navigate = useNavigate();

  const resetTimer = () => {
    setSeconds(120); // Reset to initial seconds (2 minutes)
    const newExpirationTime = Math.floor(Date.now() / 1000) + 120; 
    localStorage.setItem('otpExpiration', newExpirationTime.toString());
    setRunTimer(true); // Start the timer again
  };

  useEffect(() => {
    // Load user data from localStorage
    if (!userSignUp.username || !userSignUp.email || !userSignUp.password) {
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');

      setUserSignUp({
        username: username || '',
        email: email || '',
        password: password || '',
      });
    }

    // Check if there's a remaining time for the OTP
    const otpExpiration = localStorage.getItem('otpExpiration');
    const currentTime = Math.floor(Date.now() / 1000);

    if (otpExpiration) {
      const remainingTime = parseInt(otpExpiration) - currentTime;
      if (remainingTime > 0) {
        setSeconds(remainingTime);
      } else {
        localStorage.removeItem('otpExpiration'); 
        setSeconds(0); 
      }
    } else {
      resetTimer(); // Call resetTimer to initialize
    }
  }, [userSignUp, setUserSignUp]);

  useEffect(() => {
    // Only start the timer if runTimer is true
    if (runTimer && seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(timer);
            localStorage.removeItem('otpExpiration');
            return 0; // Return 0 to trigger expired message
          }
          return prevSeconds - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [runTimer, seconds]); // Include runTimer in the dependency array

  // Handle input change for each box
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    // Ensure only a single character (number) is allowed
    if (/^[0-9]?$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvalid("");
    const otpCode = otpValues.join('');

    try {
      const otpVerify = await verifyOTP(
        otpCode,
        userSignUp.username,
        userSignUp.email,
        userSignUp.password
      );

      if (otpVerify) {
        if (otpVerify.data.success) {
          const accessToken = otpVerify.data.access;
          const refreshToken = otpVerify.data.refresh;

          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
          navigate('/home');
        }
      }
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.error || "An unknown error occurred";
        setInvalid(errorMessage);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleResendOTP = async () => {
    // Call your function to get a new OTP
    await getUserOTP(userSignUp.email);
    resetTimer(); // Reset the timer when the OTP is resent
  };

  return (
    <section className='flex items-center min-h-screen justify-center bg-darkbg'>
      <div className="relative border-formcolor bg-loginbg border-2 rounded-lg shadow-xl px-6 pt-10 pb-9 mx-auto w-full max-w-lg">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-bold text-slate-200 text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a 6-digit verification code to your email address</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-sm space-x-2">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="w-14 h-14">
                      <input
                        className="w-full h-full flex items-center text-white justify-center text-center text-lg px-5 outline-none rounded-xl border-formcolor border-2 bg-gray-900 focus:bg-gray-900 focus:ring-1 ring-cyan-500"
                        type="text"
                        maxLength={1}
                        value={otpValues[index]}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  ))}
                </div>

                {invalid && (
                  <div className='absolute left-16'>
                    <p className='text-red-600'>{invalid}</p>
                  </div>
                )}

                <div className="flex flex-col space-y-5">
                  <div>
                    <button type="submit" className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none dark:focus:ring-[#4285F4]/55 text-white text-sm rounded-xl shadow-sm">
                      Verify Account
                    </button>
                  </div>
                  <div className='flex items-end justify-end pr-4'>
                    {seconds > 0 ? (
                      <p className='text-cyan-600 font-bold'>OTP expires in: {seconds} seconds</p>
                    ) : (
                      <p className='text-red-500'>OTP expired. Please request a new one.</p>
                    )}
                  </div>

                  <div className="flex flex-row items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <div onClick={handleResendOTP}>
                      <p className="text-cyan-500 hover:underline cursor-pointer">Resend</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OTPForm;
