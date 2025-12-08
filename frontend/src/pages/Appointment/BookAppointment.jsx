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
    } catch (error) {
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
        `${BASE_URL}/api/appointments/`,
        formData
      );
      console.log(response.data);
      setFormData({
        title: "",
        doctor: "",
        appointmentDate: new Date(),
        reason: "",
      });
      navigate("/view-appointment");
      toast.success("Appointment booked successfully!");
      console.log(response.data);
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
    <section className="p-6 min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CalendarIcon className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Book Appointment
            </CardTitle>
            <CardDescription>Select doctor and time</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-semibold flex items-center gap-2"
                >
                  <User className="size-4" />
                  Appointment Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., General Checkup, Flu Consultation"
                  required
                  name="title"
                  onChange={handleValueChange}
                  value={formData.title}
                />
              </div>
              {/* Doctor Select here */}
              <div className="space-y-2">
                <Label
                  className="text-sm font-semibold flex items-center gap-2"
                  htmlFor="doctor"
                >
                  <User className="size-4" />
                  Select Doctor
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, doctor: value }))
                  }
                  value={formData.doctor}
                >
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor._id} value={doctor._id}>
                        <div className="flex items-center gap-3">
                          <div className="size-7 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="size-4 text-primary" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="font-medium">
                              {doctor.firstName} {doctor.lastName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {doctor.email}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date picker */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <CalendarIcon className="size-4" />
                  Appointment Date & Time
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-lg font-semibold">
                      {format(formData.appointmentDate, "yyyy-MM-dd")}
                    </span>
                  </div>
                  <Calendar
                    mode="single"
                    selected={formData.appointmentDate}
                    onSelect={(date) =>
                      setFormData((prev) => ({
                        ...prev,
                        appointmentDate: date,
                      }))
                    }
                    className="rounded-md border w-full md:col-span-2"
                    disabled={(date) =>
                      date < new Date() ||
                      date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    }
                    initialFocus
                  />
                </div>
              </div>
              {/* Reason Textarea */}
              <div>
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Reason for Visit (Optional)
                </Label>
                <textarea
                  name="reason"
                  rows={4}
                  value={formData.reason}
                  onChange={handleValueChange}
                  placeholder="Describe your symptoms..."
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring resize-vertical min-h-[100px]"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
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
