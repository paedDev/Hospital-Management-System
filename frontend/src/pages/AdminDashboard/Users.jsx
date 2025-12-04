import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar';
import { useGlobalContext } from '../../context/context';
import { Navigate } from 'react-router-dom';
import NotFound from '../NotFound';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import axiosInstance from '../../config/axiosInstance';
import { BASE_URL } from '../../config/config';

const Users = () => {
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/auth/users`);
        console.log(response.data);
        setUserData(response.data.users || []);

      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch users');
        setError(error.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user?.role]);
  if (user?.role !== 'admin') {
    return <Navigate to="/not-found" replace />;
    // or: return <NotFound />;
  }
  if (loading) {
    return (
      <section className='p-6'>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className='p-6'>
        <div className="text-red-500">Error: {error}</div>
      </section>
    );
  }
  const handleDelete = async (userId) => {
    try {
      if (confirm("Delete this user?")) {
        await axiosInstance.delete(`${BASE_URL}/api/auth/users/${userId}`);
        setUserData((prev) => prev.filter(u => u._id !== userId));
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <>
      <section className='p-6'>
        <Table>
          <TableCaption>A list of Users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="">Role</TableHead>
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              userData.length > 0 ? (
                userData.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="">
                      <div>
                        <Button variant="outline" onClick={() => handleDelete(user._id)}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No users found
                  </TableCell>
                </TableRow>
              )}

          </TableBody>
        </Table>

      </section>

    </>
  );
};

export default Users;