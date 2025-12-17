import React from "react";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <section className="min-h-screen max-w-full">
        <Navbar />
        <div className="h-full max-w-[90%] mx-auto p-8 flex lg:flex-row flex-col items-center justify-between lg:mt-10 lg:gap-4 gap-6">
          <div className="flex-1 space-y-4">
            <h1 className="lg:text-5xl text-3xl font-bold">
              Modern Appointment Management
              <br />
              For <span className="text-orange-400">Hospitals</span> &amp;
              <span className="text-orange-400"> Clinics</span>
            </h1>

            <p className="text-gray-500 lg:text-lg text-sm font-semibold">
              Reduce no‑shows, long queues, and manual logs with a single system
              for scheduling, confirming, and tracking patient appointments in
              real time.
            </p>

            <p className="text-gray-500 lg:text-lg text-sm">
              Doctors manage their own schedules, patients book online 24/7, and
              admins keep full control over users, slots, and availability from
              a secure dashboard.
            </p>

            <div className="space-x-4">
              <button className="lg:px-8 px-4 lg:py-4 py-2 rounded-lg bg-orange-400 shadow-xl">
                Book a Demo
              </button>
              <button className="lg:px-8 px-4 lg:py-4 py-2 border rounded-lg shadow-xl">
                See How It Works
              </button>
            </div>
          </div>

          <div className="relative flex-1">
            <img
              src="https://www.abpsus.org/wp-content/uploads/2018/08/bigstock-Portrait-of-cheerful-doctors-t-184651009.jpg"
              alt="Doctors using hospital appointment system"
              className="w-full h-full object-cover [clip-path:inset(4%_5%_7%_10%_round_5%_5%_0_10%)] relative z-20"
            />
            <div className="absolute inset-0 rounded-tr-full rounded-bl-full bg-orange-400 z-10" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
