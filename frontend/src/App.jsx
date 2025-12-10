import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import {
  LayoutDashboard,
  UserRound,
  ClipboardClock,
  Clipboard,
  Moon,
  Sun,
} from "lucide-react";
import { SideBarItem } from "./components/sidebar";
import Sidebar from "./components/sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { useGlobalContext } from "./context/context";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Users from "./pages/AdminDashboard/Users";
import { useState } from "react";
import UpdateUser from "./pages/UpdateUser.jsx";
import BookAppointment from "./pages/Appointment/BookAppointment.jsx";
import ViewAppointment from "./pages/Appointment/ViewAppointment.jsx";
import SingleAppointment from "./pages/Appointment/SingleAppointment.jsx";

const App = () => {
  const { user, isAuthenticated, logout, theme, toggleTheme } =
    useGlobalContext();
  const location = useLocation();

  // Show sidebar only if authenticated and not on login/register
  const showSidebar =
    isAuthenticated &&
    !["/login", "/register", "/not-found"].includes(location.pathname);

  const isAdmin = user?.role === "admin";
  const isDoctor = user?.role === "doctor";
  const isPatient = user?.role === "patient";

  return (
    <div className="min-h-screen flex">
      {showSidebar && (
        <Sidebar>
          {isAdmin && (
            <>
              <SideBarItem
                icon={<LayoutDashboard />}
                text={"Admin Dashboard"}
                to={"/admin/dashboard"}
              />
              <SideBarItem
                icon={<UserRound />}
                text={"Manage Users"}
                to={"/manage-users"}
              />
            </>
          )}

          {isDoctor && (
            <>
              <SideBarItem
                icon={<LayoutDashboard />}
                text={"Doctor DashboarWd"}
                to={"/doctor/dashboard"}
              />
              <SideBarItem
                icon={<LayoutDashboard />}
                text={"View Patient Appointment"}
                to={"/patient-appointment"}
              />
            </>
          )}

          {isPatient && (
            <>
              <SideBarItem
                icon={<LayoutDashboard />}
                text={"User Dashboard"}
                to={"/dashboard"}
              />
              <SideBarItem
                icon={<ClipboardClock />}
                text={"Book Appointment"}
                to={"/appointment"}
              />
              <SideBarItem
                icon={<Clipboard />}
                text={"View Appointment"}
                to={"/view-appointment"}
              />
            </>
          )}
        </Sidebar>
      )}
      <div className="w-full">
        {isAuthenticated ? (
          <header className=" p-6  border-b ">
            <div className="flex items-center justify-between">
              <h1>Welcome, {user?.firstName || "User"}!</h1>
              {/* Switch */}
              <button onClick={toggleTheme}>
                {theme === "light" ? <Sun /> : <Moon />}
              </button>
            </div>
          </header>
        ) : (
          ""
        )}
        <main className="w-full overflow-auto ">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/appointment"
              element={
                <ProtectedRoute>
                  <BookAppointment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/view-appointment"
              element={
                <ProtectedRoute>
                  <ViewAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-appointment/:id"
              element={
                <ProtectedRoute>
                  <SingleAppointment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/update-users/:userId"
              element={
                <ProtectedRoute>
                  <UpdateUser />
                </ProtectedRoute>
              }
            />
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            {/* Not Found */}
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
