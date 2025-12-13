import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosInstance";
import { BASE_URL } from "../../config/config";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useGlobalContext } from "../../context/context";

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useGlobalContext();
  const role = user?.role;
  const fetchAppointment = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${BASE_URL}/api/appointments`);
      setAppointments(response.data.appointments);
      console.log(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  //   fetch delete

  const handleDelete = async (id) => {
    if (!confirm("Delete this appointment?")) return;
    try {
      await axiosInstance.delete(`${BASE_URL}/api/appointments/${id}`);

      setAppointments((prev) => prev.filter((a) => a._id !== id));
      toast.success("Appointment deleted successfully");
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Failed to delete appointment"
      );
      toast.error(
        error?.response?.data?.message || "Failed to delete appointment"
      );
    }
  };
  useEffect(() => {
    fetchAppointment();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case "pending":
      case "scheduled":
        return "outline";
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <section className="p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Patient Appointments</h1>
        <Table>
          <TableCaption>
            {loading
              ? "Loading appointments..."
              : "Appointments scheduled with you."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length > 0
              ? appointments.map((a) => (
                  <TableRow key={a._id}>
                    <TableCell className="font-medium">{a.title}</TableCell>
                    <TableCell>
                      Dr. {a.doctor?.firstName} {a.doctor?.lastName}
                      <div className="text-xs text-muted-foreground">
                        {a.doctor?.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(a.appointmentDate), "PPP")}{" "}
                      <div className="text-xs text-muted-foreground">
                        9:00 AM – 5:00 PM
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(a.status)}>
                        {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize text-sm">
                      {a.paymentStatus}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/view-appointment/${a._id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/update-appointment/${a._id}`)}
                      >
                        Update
                      </Button>

                      {role === "admin" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(a._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : !loading && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No appointments found
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default DoctorAppointments;
