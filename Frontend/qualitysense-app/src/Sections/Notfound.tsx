import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Notfound:React.FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    }
  return (

    <section className="w-full min-h-screen bg-darkbg flex flex-col items-center  justify-center">
  <div className="flex flex-col justify-center items-center pb-48 text-center">
    <img src={logo} className="h-10 mb-4" alt="Logo" />
    <div className="text-3xl text-slate-200 font-bold mb-2">
      Page not found
    </div>
    <div className="text-slate-200 mb-4">
      Sorry about that. Please visit our homepage to get where you need to go.
    </div>
    <div className="flex w-full justify-center">
    <button onClick={goBack} className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none dark:focus:ring-[#4285F4]/55 text-white text-sm rounded-xl shadow-sm">
                      Go back?
    </button>
      
    </div>
  </div>
</section>



 

  )
}

export default Notfound