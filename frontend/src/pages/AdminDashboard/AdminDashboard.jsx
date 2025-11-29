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

    <section className='p-6'>
      Hello this is admin dashboard
    </section>


  );
};

export default AdminDashboard;