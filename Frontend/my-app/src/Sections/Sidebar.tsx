import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { menuItems } from '../Constants';
import { Link } from 'react-router-dom';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const navigate = useNavigate();

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

      if(response){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
      }

    } catch {
      alert("Failed to logout");

    }

  }

  const handleMenuClick = (index: number) => {
    setActiveIndex(index);

    if (activeIndex === 6) {
      logOut();
    }
  };

  const showSideBar = () => {
    setToggle(!toggle);
  };
  




  return (
    <aside
      className={`fixed top-0 left-0 mr-2 h-full transition-all duration-700 z-10 bg-white border-r shadow-sm
        ${toggle ? 'w-16' : 'w-64'}`}
    >
      <div className='flex justify-center align-center absolute pl-3 pt-4'>
        <button onClick={showSideBar} className='w-4'>
          <FontAwesomeIcon icon={toggle ? faBars : faTimes} className='text-customPurple3' />
        </button>
      </div>
      <nav className='h-full flex flex-col justify-self-center p-4 items-center pt-20'>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuClick(index)}
            className={`flex flex-row items-center w-full h-11 p-4 mb-3 transition-all duration-500 rounded-full 
              ${activeIndex === index ? 'bg-customPurple3 text-white' : 'hover:bg-customPurple3 hover:text-white group'}
            ${toggle ? 'w-full h-11 pr-8':''}`}
          >
            <div className='mr-1 '>
            <Link to = {item.url}>    
               <FontAwesomeIcon
                icon={item.icon}
                className={`transition-colors duration-300 
                  ${activeIndex === index ? 'text-white' : 'text-customPurple3 group-hover:text-white'}`}
              />
            </Link>
            </div>
            <div className={`flex justify-center items-center w-full pr-5 overflow-hidden  
               ${toggle ? 'max-w-0 opacity-0' : 'max-w-full opacity-100 '}`}>
              <p className={`pl-4  duration-500 whitespace-nowrap transition-opacity
                ${activeIndex === index ? 'text-white' : 'text-black group-hover:text-white'}`}
              >
                <Link to={item.url}>{item.text}</Link>
              </p>
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
