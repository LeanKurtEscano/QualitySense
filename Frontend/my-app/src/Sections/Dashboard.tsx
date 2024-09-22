// src/Layouts/DashboardLayout.tsx
import React from 'react';
import Sidebar from '../Sections/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className='h-screen flex'>
      <Sidebar />
      <div className='flex-1'>
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
