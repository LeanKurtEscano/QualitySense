import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyContext } from './MyContext';
const SessionExpired: React.FC = () => {
    const navigate = useNavigate();
    const {setToggleSesh,setIsAuthenticated} = useMyContext();

    const goToHome = () => {
      setToggleSesh(false);
      setIsAuthenticated(false);
      navigate('/login');
    }
  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50'>
    <div className='bg-darkbg p-6 rounded-lg border border-cyan-600 max-w-sm w-full'>
        <h2 className='text-red-600 mb-4 text-lg md:text-xl'>Session Expired</h2>
        <p className='text-slate-200 mb-4'>Session Expired due to inactivity.</p>
        <div className='flex justify-end'>
            <button
                className='bg-gray-700 text-slate-200 px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300'
                onClick={goToHome}
            >
                ok
            </button>
        </div>
    </div>
</div>
  )
}

export default SessionExpired