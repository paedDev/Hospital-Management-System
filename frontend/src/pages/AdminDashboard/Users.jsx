import React from 'react';
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


const Users = () => {
  const { logout, user } = useGlobalContext();

  if (user?.role !== 'admin') {
    return <Navigate to="/not-found" replace />;
    // or: return <NotFound />;
  }
  return (
    <>
      <section className='p-6'>
        <Table>
          <TableCaption>A list of Users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="">Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>

              <TableCell className="">hello</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="">$250.00</TableCell>

            </TableRow>
          </TableBody>
        </Table>
      </section>

    </>
  );
};

export default Users;