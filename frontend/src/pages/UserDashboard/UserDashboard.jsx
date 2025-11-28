import React from 'react';
import Sidebar from '../../components/sidebar';
import { useGlobalContext } from '../../context/context';
import { Navigate } from 'react-router-dom';



const UserDashboard = () => {
  const { logout, user } = useGlobalContext();
  if (user?.role !== 'patient') {
    return <Navigate to="/not-found" replace />;
  }
  return (
    <>

      <header className='ml-20 '>
        <h1>Welcome, {user?.firstName || 'User'}!</h1>
        <button className='' onClick={logout}>Logout </button>
      </header>
      <main className='p-6'>
        Hello this is user dashboard
      </main>

    </>
  );
};

export default UserDashboard;