import React from "react";
import { Clock9, BellRing, Rocket, UserStar } from "lucide-react";
const Features = () => {
  const features = [
    {
      icon: <Clock9 />,
      title: "Role-Based Access",
      text: "Separate dashboards for admins, doctors, and patients with permissions tailored to their tasks.",
    },
    {
      icon: <BellRing />,
      title: "Online Appointment Booking",
      text: "Patients book appointments anytime, choose doctors, and see available slots in real time.",
    },
    {
      icon: <Rocket />,
      title: "Doctor Schedule Management",
      text: "Doctors manage their own calendars, update availability, and review upcoming appointments.",
    },
    {
      icon: <UserStar />,
      title: "Centralized Admin Control",
      text: "Admins manage users, roles, and appointments from a single, unified interface.",
    },
  ];

  return (
    <section className="min-h-screen max-w-full bg-gray-100 p-6 rounded-tl-[30%]">
      <div className="lg:max-w-7xl mx-auto mt-20">
        <div className="text-center space-y-6 mb-20">
          <button className="text-orange-800 uppercase bg-orange-100 px-1 py-1 rounded-2xl font-bold text-sm">
            WE’RE ALWAYS INNOVATING
          </button>
          <h1 className="text-3xl">
            Smart Hospital{" "}
            <span className="text-orange-400 font-bold">
              Appointment Management System
            </span>{" "}
            For Modern Clinics
          </h1>
          <p className="text-gray-500">
            Streamline bookings, doctor schedules, and patient records in one
            secure platform designed for hospitals and clinics.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 w-full ">
          {/* image left */}
          <div className="w-full max-w-md lg:max-w-xl h-full mr-10">
            <img
              src="https://img.freepik.com/premium-photo/beautiful-doctor-pointing-fingers_1258-16474.jpg"
              className="w-full rounded-tl-[25%] rounded-br-[25%] object-cover rounded"
              alt=""
            />
          </div>

          {/* 4 box features right */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 gap-6 w-[80%] lg:w-full ">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border bg-white rounded-xl p-10 shadow-sm relative group"
              >
                <div className="mt-8">
                  <h2 className="font-semibold mb-2">{feature.title}</h2>
                  <p className="text-sm text-gray-600">{feature.text}</p>
                </div>

                <div className="absolute -top-4 left-6 size-18 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full group-hover:animate-spin"
                    style={{
                      animationDuration: "10s",
                      animationTimingFunction: "linear",
                      border: "2px solid #fb923c",
                      maskImage:
                        "repeating-conic-gradient(#000 0% 2%, transparent 2% 4%)",
                      WebkitMaskImage:
                        "repeating-conic-gradient(#000 0% 2%, transparent 2% 4%)",
                    }}
                  ></div>

                  <div className="relative border bg-white rounded-full p-5 z-10 text-orange-400">
                    {feature.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
