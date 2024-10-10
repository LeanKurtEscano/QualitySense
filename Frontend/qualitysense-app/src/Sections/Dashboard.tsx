import React from 'react';
import Sidebar from '../Sections/Sidebar';
import { Outlet } from 'react-router-dom';
import { useMyContext } from '../Components/MyContext';
import { getUserDetails } from '../Api/Axios';
import { useEffect } from 'react';
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
