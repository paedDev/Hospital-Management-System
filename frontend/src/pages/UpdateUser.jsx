import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import axiosInstance from "../config/axiosInstance";
import { BASE_URL } from '../config/config';
import { Button } from "@/components/ui/Button";
const UpdateUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => (
      {
        ...prev,
        [name]: value
      }
    ));
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`${BASE_URL}/api/auth/users/${userId}`);
      setFormData(prev => ({ ...prev, password: "" }));
    } catch (error) {
      console.log(error.response?.data.message);

    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-3 ">
      <h2>Update Users</h2>
      <form action="" className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor="firstName">First Name</Label>
          <Input type="firstName" id="firstName" placeholder="First Name"
            onChange={handleChange}
            value={formData.firstName} />

        </div>
        <div className='space-y-2'>
          <Label htmlFor="lastName">Last Name</Label>
          <Input type="lastName" id="lastName" placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastName} />

        </div>
        <div className='space-y-2'>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email"
            onChange={handleChange}
            value={formData.lastName} />

        </div>
        <div className='space-y-2'>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Password (leave blank to keep current)"
            onChange={handleChange}
            value={formData.password} />

        </div>
        <div className='space-y-2'>
          <Label htmlFor="role">Role</Label>
          <Input type="role" id="role" placeholder="Role"
            onChange={handleChange}
            value={formData.role} />

        </div>
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update User"}
        </Button>
      </form>

    </div>
  );
};

export default UpdateUser;