import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";
import { BASE_URL } from "../../config/config.js";
import { useGlobalContext } from "../../context/context";
import { toast } from "react-toastify";
import {
  CalendarIcon,
  User,
  Clock,
  MessageSquare,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
const BookAppointment = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    doctor: "",
    appointmentDate: new Date(),
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/api/appointments/doctors`
      );
      setDoctors(response.data.doctors);
    } catch {
      toast.error("Failed to load doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.doctor || !formData.appointmentDate) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${BASE_URL}/api/appointments`,
        formData
      );
      console.log(response.data);
      setFormData({
        title: "",
        doctor: "",
        appointmentDate: new Date(),
        reason: "",
      });
      toast.success("Appointment booked successfully!");
      navigate("/view-appointment");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to book appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="p-6 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md border">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold">
                  Book Appointment
                </CardTitle>
                <CardDescription className="text-sm">
                  Choose a doctor and a date for your visit.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="title"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Appointment Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., General Checkup, Flu Consultation"
                  required
                  value={formData.title}
                  onChange={handleValueChange}
                />
              </div>

              {/* Doctor */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="doctor"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Select Doctor
                </Label>
                <Select
                  value={formData.doctor}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, doctor: value }))
                  }
                >
                  <SelectTrigger id="doctor" className="w-full">
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor._id} value={doctor._id}>
                        {doctor.firstName} {doctor.lastName}{" "}
                        <span className="text-xs text-muted-foreground">
                          ({doctor.email})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date (more compact) */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Appointment Date
                </Label>

                <div className="border rounded-md p-3 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      Selected:{" "}
                      <span className="font-medium text-foreground">
                        {format(formData.appointmentDate, "yyyy-MM-dd")}
                      </span>
                    </span>
                  </div>
                  <Calendar
                    mode="single"
                    selected={formData.appointmentDate}
                    onSelect={(date) =>
                      setFormData((prev) => ({
                        ...prev,
                        appointmentDate: date || prev.appointmentDate,
                      }))
                    }
                    className="rounded-md border"
                    disabled={(date) =>
                      date < new Date() ||
                      date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    }
                    initialFocus
                  />
                </div>
              </div>

              {/* Reason */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Reason for Visit (Optional)
                </Label>
                <textarea
                  name="reason"
                  rows={4}
                  value={formData.reason}
                  onChange={handleValueChange}
                  placeholder="Describe your symptoms..."
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Actions */}
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
                      Booking...
                    </>
                  ) : (
                    "Book Appointment"
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

export default BookAppointment;
