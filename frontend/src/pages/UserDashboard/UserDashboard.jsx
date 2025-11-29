import React from 'react';
import Sidebar from '../../components/sidebar';
import { useGlobalContext } from '../../context/context';
import { Navigate } from 'react-router-dom';



const UserDashboard = () => {
  const { logout, user, loading } = useGlobalContext();
  if (loading || !user) {
    return <div>Loading...</div>;
  }
  if (user?.role !== 'patient') {
    return <Navigate to="/not-found" replace />;
  }
  return (
    <>


      <main className='p-6'>
        Hello this is user dashboard
      </main>

    </>
  );
};

export default UserDashboard;