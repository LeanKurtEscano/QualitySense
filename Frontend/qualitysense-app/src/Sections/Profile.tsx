import React, { useState } from 'react'
import { useMyContext } from '../Components/MyContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteAccount } from '../Api/Axios';
import { useNavigate } from 'react-router-dom';
const Profile: React.FC = () => {
    const { userDetails } = useMyContext();
    const [confirm, setConfirm] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        setConfirm(true);
    };

    const handleCancelClick = () => {
        setConfirm(false);
    };

    const handleConfirmDelete = async () => {
        const response = await deleteAccount();

        if (response.status === 200) {
            console.log(response.data);
            console.log("Account deleted");
            navigate('/');
            setConfirm(false);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');


        }


    };

    return (
        <section className='w-full pl-20 min-h-screen flex md:items-center md:pt-11  md:pl-28 md:pr-16 flex-col bg-darkbg'>
            <div className='flex w-full  md:w-[400px] flex-col mb-8'>
                <h1 className='text-slate-200 mb-4 text-lg  md:text-4xl font-bold'>My Account</h1>

                <h1 className='text-slate-200 mb-4 text-sm md:text-md font-bold'>Personal Information</h1>
                <div className='hover:bg-gray-800 md:w-auto w-[250px] bg-loginbg border border-gray-800 p-4 mb-4'>
                    <p className='text-slate-200'>{userDetails.username}</p>
                    <p className='text-gray-500 text-xs md:text-sm'>Username</p>
                </div>
                <div className='hover:bg-gray-800 bg-loginbg border md:w-auto w-[250px] border-gray-800 p-4'>
                    <p className='text-slate-200'>{userDetails.email}</p>
                    <p className='text-gray-500 text-xs md:text-sm'>Email Address</p>
                </div>
            </div>
            <div>

            </div>
            <div className='flex w-auto pr-12'>
                <div className='flex p-4 rounded-lg flex-col w-[250px] items-center justify-center border-gray-800 bg-loginbg md:w-[550px]  '>
                    <div className='flex  md:w-auto flex-col mb-3'>
                        <h2 className="text-slate-200 flex items-center text-lg md:text-xl">
                            Danger Zone
                            <FontAwesomeIcon icon={faExclamationTriangle} className="m-2 text-red-600" />
                        </h2>
                        <div className='w-full md:w-[500px]'>
                            <p className='text-red-500 text-sm md:text-base'>Warning: Account Deletion is Permanent. You will lose all your data and need a new account to return.</p>
                        </div>
                    </div>

                    <div className=''>
                        <button
                            className='hover:bg-red-600 hover:text-slate-200 text-red-600 border-2 p-3 rounded-full border-red-600 transition duration-300 ease-in-out'
                            onClick={handleDeleteClick}
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            Delete Account
                        </button>
                    </div>
                </div>

            </div>


            {confirm && (
                <div className='fixed inset-0 ml-2 bg-gray-900 bg-opacity-75 flex items-center justify-center'>
                    <div className='bg-loginbg p-6 rounded-lg border border-cyan-600 w-[250px] md:w-full max-w-md'>
                        <h2 className='text-red-600 mb-4 text-lg md:text-xl'>Are you sure?</h2>
                        <p className='text-slate-200 mb-4'>This action is irreversible. Do you really want to delete your account?</p>
                        <div className='flex justify-end'>
                            <button
                                className='bg-gray-700 text-slate-200 px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300'
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-red-600 ml-2 text-slate-200 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300'
                                onClick={handleConfirmDelete}
                            >
                                Confirm 
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>

    );
};

export default Profile;
