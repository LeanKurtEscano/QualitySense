import React, { useState, useEffect } from 'react';
import { useMyContext } from '../Components/MyContext';
import { passwordOTP, userEmailReset} from '../Services/Axios';
import { useNavigate } from 'react-router-dom';
import Notification from '../Components/Notification';
import Warning from '../Components/Warning';

const EmailOTP: React.FC = () => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const [invalid, setInvalid] = useState('');
  const { runTimer, setRunTimer, setUserSignUp } = useMyContext();
  const [seconds, setSeconds] = useState<number>(120);
  // @ts-ignore
  const [expired, setExpired] = useState(false);
  const [toggleNotif, setToggleNotif] = useState(false);
  const [toggleWarning, setToggleWarning] = useState(false);

  const navigate = useNavigate();

  const resetTimer = () => {
    const newExpirationTime = Math.floor(Date.now() / 1000) + 120;
    localStorage.setItem('otpExpiration', newExpirationTime.toString());
    setSeconds(120);
    setRunTimer(true);
    setExpired(false);
  };

    useEffect(() => {
        const email = localStorage.getItem('email_otp');
        if(!email) {
            navigate('/login');
            
        }

    }, [navigate])

  useEffect(() => {
   

    const otpExpiration = localStorage.getItem('otpExpiration');
    if (otpExpiration) {
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = parseInt(otpExpiration) - currentTime;

      if (remainingTime > 0) {
        setSeconds(remainingTime);
        setRunTimer(true);
      } else {
        setSeconds(0);
        setExpired(true);
        localStorage.removeItem('otpExpiration');
      }
    } else {
      resetTimer();
    }
  }, [setUserSignUp]);

  useEffect(() => {
    if (toggleNotif) {
      const timer = setTimeout(() => {
        setToggleNotif(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toggleNotif]);

  useEffect(() => {
    if (toggleWarning) {
      const timer = setTimeout(() => {
        setToggleWarning(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toggleWarning]);

  useEffect(() => {
    if (runTimer && seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          if (newSeconds <= 0) {
            clearInterval(timer);
            localStorage.removeItem('otpExpiration');
            setExpired(true);
            setRunTimer(false);
            return 0;
          }
          return newSeconds;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [runTimer, seconds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvalid('');
    const otpCode = otpValues.join('');

    if (!otpCode) {
      setInvalid('Please enter the OTP code.');
      return;
    }

    try {
      const otpVerify = await passwordOTP(otpCode);
      if (otpVerify && otpVerify.data.success) {
        resetTimer();
        navigate('/reset');
      }
    } catch (error: any) {       
      const errorMessage = error.response.data.error || 'An unknown error occurred';
      setInvalid(errorMessage);
    }
  };

  const handleResendOTP = async () => {
    try {
      // @ts-ignore
      const userEmail = localStorage.getItem('email_otp');
      // @ts-ignore
      const otpResponse = await userEmailReset();
      setToggleNotif(true);
      resetTimer();
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 429) {
            setToggleWarning(true); 
        } else {
       
            const errorMessage = error.response.data.error || 'An unknown error occurred';
            setInvalid(errorMessage);
        }
    } else {
        alert('Network error. Please try again later.');
    }
      
     
     
    }
     
     
    
  };

  return (
    <section className='flex items-center min-h-screen justify-center bg-darkbg'>
      <div className="relative border-formcolor bg-loginbg border-2 rounded-lg shadow-xl px-6 pt-10 pb-9 mx-auto w-full max-w-lg">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-bold text-slate-200 text-3xl">
              <p>Reset Password</p>
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
                    {seconds > 0 && (
                      <p className='text-cyan-600 font-bold'>OTP expires in: {seconds} seconds</p>
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
      {toggleNotif && (
        <div className={`absolute right-5 top-20 ${toggleNotif ? 'notification-enter' : 'notification-exit'}`}>
          <Notification setToggleNotif={setToggleNotif} />
        </div>
      )}

      {toggleWarning && (
        <div className={`absolute right-5 top-48 ${toggleWarning ? 'notification-enter' : 'notification-exit'}`}>
          <Warning setToggleWarning={setToggleWarning} />
        </div>
      )}
    </section>
  );
};

export default EmailOTP;
