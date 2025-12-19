import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Solution = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const cards = [
    {
      title: "Flexible Calendar Control",
      bg: "bg-white",
      text: "text-slate-600",
      titleCol: "text-slate-800",
      accent: "bg-blue-500",
      description:
        "Manage schedules across multiple locations on desktop or mobile.",
    },
    {
      title: "Multi-View Scheduling",
      bg: "bg-slate-50",
      text: "text-slate-600",
      titleCol: "text-slate-800",
      accent: "bg-teal-500",
      description:
        "Doctor View (individual), Hospital View (all doctors), or Combo View.",
    },
    {
      title: "Omni-Channel Messaging",
      bg: "bg-white",
      text: "text-slate-600",
      titleCol: "text-slate-800",
      accent: "bg-orange-400",
      description:
        "Confirm appointments and instructions via SMS, email, or app.",
    },
    {
      title: "Smart No-Show Handling",
      bg: "bg-blue-50",
      text: "text-blue-700/80",
      titleCol: "text-blue-900",
      accent: "bg-blue-600",
      description:
        "Mark no-shows and instantly rebook when patients reschedule.",
    },
    {
      title: "Optimized Workflow",
      bg: "bg-slate-900",
      text: "text-slate-300",
      titleCol: "text-white",
      accent: "bg-orange-500",
      description:
        "Optimized scheduling reduces patient delays and improves clinic flow.",
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top",
          end: `+=${cards.length * 150}%`,
          pin: true,
          scrub: 1,
        },
      });
      cardsRef.current.forEach((card, index) => {
        if (index === 0) return;
        tl.to(
          cardsRef.current.slice(0, index),
          {
            y: (i) => (index - i) * -30,
            rotate: (i) => (index - i) * -2,
            scale: (i) => 1 - (index - i) * 0.05,
            duration: 1,
            ease: "power2.out",
          },
          `card-${index}`
        );

        tl.fromTo(
          card,
          {
            yPercent: 100,
            rotate: 15,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1,
            ease: "none",
          },
          `card-${index}`
        );
      });
      tl.to(cardsRef.current, {
        x: (i) => i * 40,
        rotate: (i) => i * 3,
        stagger: 0.1,
        duration: 1,
      });
    },
    { scope: containerRef }
  );
  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full overflow-hidden bg-gray-50 py-20"
    >
      <div className="text-center space-y-6 mb-20">
        <span className="header-badge text-orange-800 uppercase bg-orange-100 px-4 py-2 rounded-2xl font-bold text-sm inline-block">
          GROW YOUR BUSINESS
        </span>
        <h1 className="text-3xl title-text font-semibold">
          HMS{" "}
          <span className="text-orange-400 font-bold ">
            Appointment Management
          </span>{" "}
          Your Complete Clinic Solution
        </h1>
        <p className="desc-text text-gray-500  max-w-2xl mx-auto">
          Boost Patient Acquisition by 60%. Powerful tools to attract patients,
          streamline onboarding, and build lasting relationships.
        </p>
      </div>

      <div className="flex items-center justify-center pt-10">
        <div className="relative w-full max-w-5xl h-[450px]">
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`absolute inset-0 ${card.bg} rounded-[40px] p-16 shadow-xl flex justify-between border border-slate-200/60 items-center overflow-hidden`}
              style={{
                zIndex: i,
                transformOrigin: "bottom left",
              }}
            >
              {/* Subtle Accent Bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-3 ${card.accent}`}
              />

              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold bg-slate-100 border border-slate-200 text-slate-500`}
                  >
                    STEP 0{i + 1}
                  </span>
                </div>
                <h2
                  className={`text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${card.titleCol}`}
                >
                  {card.title}
                </h2>
                <p
                  className={`text-lg lg:text-xl leading-relaxed font-medium ${card.text}`}
                >
                  {card.description}
                </p>
              </div>

              {/* Abstract Graphical Placeholder (Similar to your UI image) */}
              <div className="hidden lg:flex relative">
                <div
                  className={`absolute -inset-4 rounded-full blur-3xl opacity-20 ${card.accent}`}
                />
                <div className="size-64 bg-slate-100 rounded-3xl border border-slate-200 flex items-center justify-center relative z-10 shadow-inner">
                  <span className="text-slate-300 font-bold text-6xl italic opacity-50">
                    HMS
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
