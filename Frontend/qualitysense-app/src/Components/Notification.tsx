import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
interface Toggle {
    setToggleNotif: React.Dispatch<React.SetStateAction<boolean>>;
}
const Notification: React.FC<Toggle> = ({setToggleNotif}) => {

    const removeNotif = () => {
        setToggleNotif(false);
    }
    return (
        <div className="flex flex-col p-8 bg-loginbg shadow-md hover:shadow-lg rounded-2xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex flex-col ml-3">
                        <div className="font-medium leading-none text-gray-100 mb-1">OTP Sent</div>
                        <p className="text-sm text-gray-500 leading-none mt-1">
                            The OTP will be valid for 120 seconds.
                        </p>
                    </div>
                <div className='pb-5 cursor-pointer' onClick={removeNotif}>
                    <FontAwesomeIcon icon = {faTimes} className='text-cyan-500' />
                </div>
                </div>

            </div>
        </div>


    )
}

export default Notification