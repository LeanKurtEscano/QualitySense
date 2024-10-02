import React from 'react';
import Sidebar from '../Sections/Sidebar';
import { Outlet } from 'react-router-dom';

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
