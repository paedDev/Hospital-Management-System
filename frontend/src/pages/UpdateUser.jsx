import React, { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import axiosInstance from "../config/axiosInstance";
import { BASE_URL } from '../config/config';
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const UpdateUser = () => {
  const optionRole = ["admin", "doctor", "patient"];
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
  const { userId } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.put(`${BASE_URL}/api/auth/users/${userId}`, formData);
      setFormData(prev => ({ ...prev, password: "" }));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data.message);
      console.error("Submit error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/auth/users/${userId}`);
      const user = response.data.user;
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || "",
        email: user.email || "",
        role: user.role || "",
        password: ""
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch user data ");
    } finally {

    }
  };
  useEffect(() => {

    if (userId) {
      fetchUser();
    }
  }, [userId]);
  return (
    <div className="grid w-full max-w-sm items-center gap-3 p-6 ">
      <h2 className='text-2xl'>Update Users</h2>
      <form action="" onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text"
            id="firstName"
            onChange={handleChange}
            name="firstName"
            value={formData.firstName} />

        </div>
        <div className='space-y-2'>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

        </div>
        <div className='space-y-2'>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

        </div>
        <div className='space-y-2'>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

        </div>
        <div className='space-y-2'>
          <Label htmlFor="role">Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {optionRole.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update User"}
        </Button>
      </form >

    </div >
  );
};

export default UpdateUser;