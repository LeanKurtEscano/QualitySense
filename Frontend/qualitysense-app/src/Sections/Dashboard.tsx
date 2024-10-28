import React from 'react';
import Sidebar from '../Sections/Sidebar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useMyContext } from '../Components/MyContext';
import { isTokenExpired } from '../Services/Token';

const Dashboard: React.FC = () => {
  
  
  return (
    <div className='h-screen'>
      <div className=''>
      <Sidebar />
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
