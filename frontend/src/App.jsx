import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserDashboard from './pages/UserDashboard/UserDashboard';
import { LayoutDashboard } from 'lucide-react';
import { SideBarItem } from './components/sidebar';
import Sidebar from './components/sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import { useGlobalContext } from './context/context';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
const App = () => {
  const { user, isAuthenticated } = useGlobalContext();
  const location = useLocation();

  // Show sidebar only if authenticated and not on login/register
  const showSidebar = isAuthenticated && !['/login', '/register', '/not-found'].includes(location.pathname);

  const isAdmin = user?.role === "admin";
  const isDoctor = user?.role === "doctor";
  const isPatient = user?.role === "patient";
  return (
    <div className='flex w-full min-h-screen'>
      {showSidebar && (
        <Sidebar>
          {isAdmin && (
            <SideBarItem
              icon={<LayoutDashboard />}
              text={'Admin Dashboard'}
              to={"/admin/dashboard"}
            />
          )}

          {isDoctor && (
            <SideBarItem
              icon={<LayoutDashboard />}
              text={'Doctor Dashboard'}
              to={"/doctor/dashboard"}
            />
          )}

          {isPatient && (
            <SideBarItem
              icon={<LayoutDashboard />}
              text={'User Dashboard'}
              to={"/dashboard"}
            />
          )}
        </Sidebar>
      )}

      <main className='w-full overflow-auto'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />

          <Route path='/admin/dashboard' element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;