import React from 'react';
import Sidebar from '../Sections/Sidebar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to the Activity section when Dashboard is accessed
    navigate('/dashboard/activity');
  }, []);
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
