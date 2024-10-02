import React from 'react'

const GoogleButton: React.FC = () => {
    return (
        <div className="flex justify-center">
            <button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 mt-2 text-white rounded p-2 transition duration-300 flex items-center"
            >
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2" />
                 Google
            </button>
        </div>
    )
}

export default GoogleButton