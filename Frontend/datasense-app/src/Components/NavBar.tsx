import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useMyContext } from './MyContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useMyContext();
    const navigate = useNavigate();

    const toggleNav = () => {
        setToggle(!toggle);
    }
    const logOut = async () => {
        const userToken = localStorage.getItem('access_token');
        try {
            const response = await axios.post("http://localhost:8000/api/logout/", {},
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response) {
                setIsAuthenticated(false);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/');
            }

        } catch {
            alert("Failed to logout");

        }

    }



    return (
        <nav className="flex items-center justify-end transition-all duration-700 w-full border-2 pt-4 pb-4 mx-auto mb-3 pr-36">
            <div className='mr-8 absolute  left-24'>
                <Link to='/home'>
                    <img
                        className="w-16 cursor-pointer"
                        src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png"
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className="nav-links duration-500 md:static p-4 absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
                <ul className="flex md:flex-row  md:items-center md:gap-[4vw] gap-8">
                    {navItems.map((item) => (
                        <li className='relative group font-normal' key={item.text}>
                            <Link to={item.link} className="text-gray-700 mb-1 hover:text-purple-600">
                                {item.text}
                                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    ))}
                    {isAuthenticated ? (
                        <li className='relative group font-normal' onClick={logOut}>
                            <Link to='/' className="text-gray-700 mb-1 hover:text-purple-600">
                                Logout
                                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    ) : (
                        <li className='relative group font-normal'>
                            <Link to='/' className="text-gray-700 mb-1 hover:text-purple-600">
                                Login
                                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    )
                    }
                </ul>
            </div>
            <div className='md:hidden text-customPurple3 cursor-pointer' onClick={toggleNav}>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </div>
            {toggle && (
                <div className={`absolute mt-7 bg-white border-2 rounded-lg transition-all w-[300px] z-10  right-1 shadow-lg ${toggle ? "top-12 translate-y-0" : "top-9 translate-y-full"} duration-300 ease-in-out`}>

                    <ul className="flex flex-col items-center p-4">
                        {navItems.map((item) => (
                            <li className='relative group font-normal my-2' key={item.text}>
                                <Link to={item.link} className="text-gray-700 mb-1 hover:text-purple-600">
                                    {item.text}
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                        <li className='relative group font-normal my-2' onClick={logOut}>
                            <Link to='/' className="text-gray-700 mb-1 hover:text-purple-600">
                                {isAuthenticated ? 'Logout' : 'Login'}
                                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
