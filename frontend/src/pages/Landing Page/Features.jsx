import React, { useRef } from "react";
import { Clock9, BellRing, Rocket, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

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
      icon: <Star />,
      title: "Centralized Admin Control",
      text: "Admins manage users, roles, and appointments from a single, unified interface.",
    },
  ];

  const containerRef = useRef(null);

  useGSAP(
    () => {
      const titleSplit = new SplitText(".title-text", { type: "chars, words" });
      const descriptionSplit = new SplitText(".desc-text", { type: "lines" });

      // Animate header and title on scroll into view
      gsap.from(".header-badge", {
        scrollTrigger: {
          trigger: ".header-badge",
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(titleSplit.chars, {
        scrollTrigger: {
          trigger: ".title-text",
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(descriptionSplit.lines, {
        scrollTrigger: {
          trigger: ".desc-text",
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".feature-image", {
        scrollTrigger: {
          trigger: ".feature-image",
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -100,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".feature-card",
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 80,
        rotate: 5,
        scale: 0.9,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="features"
      className="min-h-screen max-w-full bg-gray-100 p-6 rounded-tl-[30%]"
    >
      <div className="lg:max-w-7xl mx-auto mt-20">
        <div className="text-center space-y-6 mb-20">
          <span className="header-badge text-orange-800 uppercase bg-orange-100 px-4 py-2 rounded-2xl font-bold text-sm inline-block">
            WE'RE ALWAYS INNOVATING
          </span>
          <h1 className="text-3xl title-text font-semibold">
            Smart Hospital{" "}
            <span className="text-orange-400 font-bold">
              Appointment Management System
            </span>{" "}
            For Modern Clinics
          </h1>
          <p className="desc-text text-gray-500  max-w-2xl mx-auto">
            Streamline bookings, doctor schedules, and patient records in one
            secure platform designed for hospitals and clinics.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 w-full">
          {/* image left */}
          <div className="w-full max-w-md lg:max-w-xl h-full lg:mr-10">
            <img
              src="https://img.freepik.com/premium-photo/beautiful-doctor-pointing-fingers_1258-16474.jpg"
              className="feature-image w-full rounded-tl-[25%] rounded-br-[25%] object-cover rounded"
              alt="Doctor pointing"
            />
          </div>

          {/* 4 box features right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-auto lg:flex-1">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card border bg-white rounded-xl p-10 shadow-sm relative group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mt-8">
                  <h2 className="font-semibold mb-2 text-lg">
                    {feature.title}
                  </h2>
                  <p className="text-sm text-gray-600">{feature.text}</p>
                </div>

                <div className="absolute -top-4 left-6 w-18 h-18 flex items-center justify-center">
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
