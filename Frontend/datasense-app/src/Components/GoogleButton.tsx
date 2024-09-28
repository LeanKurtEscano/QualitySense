import React from 'react'

const GoogleButton: React.FC = () => {
    return (
        <div className="flex justify-center">
            <button
                className="bg-customPurple3 text-white rounded p-2 pr-4 pl-4  hover:bg-purple-700 transition duration-300 flex items-center"
            >
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2" />
                 Google
            </button>
        </div>
    )
}

export default GoogleButton