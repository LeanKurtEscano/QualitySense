import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-t from-darkcyan to-teal-950 border  border-transparent ">
            <div className="mx-auto w-full max-w-screen-xl p-4 mb-6 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">QualitySense</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Support</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/help-section" className="hover:underline">Help</Link>
                                </li>
                                <li>
                                    <Link to='/about' className="hover:underline">About Us</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://x.com/TheQualitySense" target="_blank"
                                        rel="noopener noreferrer" className="hover:underline ">Twitter</a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/leankurtescano/" target="_blank"
                                        rel="noopener noreferrer" className="hover:underline">Linkedin</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/terms" className="hover:underline">Terms & Conditions </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="" className="hover:underline">QualitySense™</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                       
                        <a href="https://x.com/TheQualitySense" target="_blank"
                                        rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href= "https://www.linkedin.com/in/leankurtescano/" target="_blank"
                                        rel="noopener noreferrer"  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 8 8 8 8 0 0 0 8-8C16 3.58 12.42 0 8 0Zm1.694 11.817H6.645V5.875h2.048v5.942Zm-1.027-6.879c-.64 0-1.019.356-1.019.859 0 .553.379.848 1.034.848h.009v-1.437h-.019Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">LinkedIn page</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>





    )
}

export default Footer