import React from "react";
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/context";
import { Navigate, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "../../config/axiosInstance.js";
import { useEffect } from "react";
import { BASE_URL } from "../../config/config.js";
import { useState } from "react";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const fetchSummary = async () => {
    const response = await axiosInstance.get(`${BASE_URL}/api/admin/summary`);
    console.log(response.data.data);
    setData(response.data.data);
  };
  useEffect(() => {
    fetchSummary();
  }, []);
  const { user } = useGlobalContext();
  if (user?.role !== "admin") {
    return <Navigate to="/not-found" replace />;
    // or: return <NotFound />;
  }
  return (
    <section className="p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">This is admin dashboard</div>
    </section>
  );
};

export default AdminDashboard;
