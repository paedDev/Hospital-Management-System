import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { BASE_URL } from "../../config/config";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    status: "",
    doctorNotes: "",
    paymentStatus: "",
    cancellationReason: "",
  });

  const fetchAppointment = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${BASE_URL}/api/appointments/${id}`
      );
      const appointment = response.data.appointment;
      setFormData({
        status: appointment.status || "pending",
        doctorNotes: appointment.doctorNotes || "",
        paymentStatus: appointment.paymentStatus || "pending",
        cancellationReason: appointment.cancellationReason || "",
      });
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
    if (id) fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        status: formData.status,
        doctorNotes: formData.doctorNotes,
        paymentStatus: formData.paymentStatus,
      };
      if (formData.status === "cancelled") {
        payload.cancellationReason = formData.cancellationReason;
      }
      const res = await axiosInstance.put(
        `${BASE_URL}/api/appointments/${id}`,
        payload
      );
      toast.success(res.data.message || "Appointment updated successfully");

      navigate(`/view-appointment/${id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update appointment"
      );
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <section className="p-6 min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </section>
    );
  }
  return (
    <section className="min-h-screen p-6 ">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Update Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Status */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Doctor Notes */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Doctor Notes</Label>
                <textarea
                  name="doctorNotes"
                  rows={4}
                  value={formData.doctorNotes}
                  onChange={handleChange}
                  placeholder="Add your notes about the consultation..."
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Payment Status */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Payment Status</Label>
                <Select
                  value={formData.paymentStatus}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, paymentStatus: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cancellation Reason (only if cancelled) */}
              {formData.status === "cancelled" && (
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">
                    Cancellation Reason
                  </Label>
                  <textarea
                    name="cancellationReason"
                    rows={3}
                    value={formData.cancellationReason}
                    onChange={handleChange}
                    placeholder="Reason for cancellation"
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Appointment"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UpdateAppointment;
