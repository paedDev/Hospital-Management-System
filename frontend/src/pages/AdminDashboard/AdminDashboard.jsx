import React from 'react';
import Sidebar from '../../components/sidebar';
import { useGlobalContext } from '../../context/context';
import { Navigate } from 'react-router-dom';
import NotFound from '../NotFound';



const AdminDashboard = () => {
  const { logout, user } = useGlobalContext();
  if (user?.role !== 'admin') {
    return <Navigate to="/not-found" replace />;
    // or: return <NotFound />;
  }
  return (
    <>

      <header className='ml-20'>
        <h1>Welcome, {user?.firstName || 'User'}!</h1>
        <button className='' onClick={logout}>Logout </button>
      </header>
      <main>
        Hello this is admin dashboard
      </main>

    </>
  );
};

export default AdminDashboard;