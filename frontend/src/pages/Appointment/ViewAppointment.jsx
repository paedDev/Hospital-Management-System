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

const ViewAppointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <h1 className="text-2xl font-semibold mb-4">My Appointments</h1>
        <Table>
          <TableCaption>
            {loading
              ? "Loading appointments..."
              : "A list of your recent appointments."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                      {format(new Date(a.appointmentDate), "PPP p")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(a.status)}>
                        {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize text-sm">
                      {a.paymentStatus}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/view-appointment/${a._id}`)}
                      >
                        View
                      </Button>
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

export default ViewAppointment;
