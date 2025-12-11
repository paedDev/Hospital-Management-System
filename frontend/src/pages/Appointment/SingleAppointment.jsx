import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosInstance";
import { BASE_URL } from "../../config/config";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  User,
  FileText,
  AlertCircle,
  Mail,
  ChevronLeft,
  CreditCard,
} from "lucide-react";

const SingleAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAppointmentById = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${BASE_URL}/api/appointments/${id}`
      );
      setAppointment(response.data.appointment);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load appointment"
      );
      navigate("/view-appointment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchAppointmentById();
  }, [id]);

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
      case "pending":
        return "outline";
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (loading || !appointment) {
    return (
      <section className="p-6 min-h-screen flex items-center justify-center">
        <Spinner className="size-8" />
      </section>
    );
  }

  return (
    <section className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">Appointment Details</h1>
            <p className="text-sm text-muted-foreground">
              Full information about this appointment
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left column */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-xl">{appointment.title}</CardTitle>
                <Badge
                  variant={getStatusVariant(appointment.status)}
                  className="capitalize"
                >
                  {appointment.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {format(
                        new Date(appointment.appointmentDate),
                        "EEEE, MMMM d, yyyy"
                      )}
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      Time window: 9:00 AM – 5:00 PM
                    </p>
                  </div>
                </div>

                {/* Reason */}
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Reason for Visit
                    </p>
                    <p className="text-sm">
                      {appointment.reason || "No reason provided"}
                    </p>
                  </div>
                </div>

                {/* Doctor Notes */}
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Doctor's Notes
                    </p>
                    <p className="text-sm">
                      {appointment.doctorNotes || "No notes yet"}
                    </p>
                  </div>
                </div>

                {/* Cancellation */}
                {appointment.status === "cancelled" && (
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-1 text-destructive" />
                    <div>
                      <p className="text-sm font-medium text-destructive">
                        Cancellation Information
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Cancelled by:</span>{" "}
                        {appointment.cancelledBy || "N/A"}
                      </p>
                      {appointment.cancellationReason && (
                        <p className="text-sm mt-1">
                          <span className="font-semibold">Reason:</span>{" "}
                          {appointment.cancellationReason}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Doctor info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <User className="w-4 h-4" />
                  Doctor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center border-b pb-3">
                  <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center bg-muted text-sm font-semibold">
                    {appointment.doctor?.firstName?.[0] || "D"}
                    {appointment.doctor?.lastName?.[0] || ""}
                  </div>
                  <p className="font-medium">
                    Dr. {appointment.doctor?.firstName || "Unknown"}{" "}
                    {appointment.doctor?.lastName || ""}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">
                    {appointment.doctor?.email || "No email provided"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <CreditCard className="w-4 h-4" />
                  Payment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm capitalize">
                  {appointment.paymentStatus || "pending"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleAppointment;
