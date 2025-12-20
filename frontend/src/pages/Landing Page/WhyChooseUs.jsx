import React, { useState, useRef } from "react";
import {
  MousePointer2,
  Smartphone,
  TrendingUp,
  Headphones,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const WhyChooseUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const data = [
    {
      icon: <MousePointer2 size={20} />,
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      title: "Intuitive Interface",
      subtitle:
        "Easy to use by both patients and staff. Minimizes the requirement for immense training and support.",
    },
    {
      icon: <Smartphone size={20} />,
      image:
        "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
      title: "Mobile-Optimized",
      subtitle:
        "Access appointments on the go. Fully responsive design ensures a smooth experience on any device.",
    },
    {
      icon: <TrendingUp size={20} />,
      image:
        "https://images.unsplash.com/photo-1551288049-bbda4865cda1?auto=format&fit=crop&w=800&q=80",
      title: "Scalable Solution",
      subtitle:
        "Built to grow with your practice, from small clinics to multi-specialty hospitals.",
    },
    {
      icon: <Headphones size={20} />,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      title: "Dedicated Support",
      subtitle:
        "Our team is available 24/7 to ensure your operations never face a hiccup.",
    },
  ];

  const defaultImage =
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80";

  // ANIMATION LOGIC
  useGSAP(() => {
    if (hoveredIndex !== null) {
      gsap.fromTo(
        imageRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [hoveredIndex]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen z-10 overflow-hidden py-20 bg-white"
    >
      <div className="flex items-center justify-center mx-auto max-w-6xl">
        <div className="text-center space-y-6 mb-20">
          <span className="header-badge text-orange-800 uppercase bg-orange-100 px-4 py-2 rounded-2xl font-bold text-sm inline-block">
            GROW YOUR PRACTICE
          </span>
          <h1 className="text-3xl title-text font-semibold">
            Hospital Appointment Management
            <br />
            for{" "}
            <span className="text-orange-400 font-bold">Seamless Booking</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between max-w-5xl mx-auto gap-10 px-6">
        {/* LEFT SIDE: IMAGE CONTAINER */}
        <div className="flex-1 flex justify-center items-center relative">
          {/* Background decorative element (Absolute) */}
          <div className="absolute -inset-4 bg-orange-100/50 rounded-[40px] blur-2xl z-0" />

          {/* Your specific Red Absolute box for reference */}
          <div className="absolute top-10 -left-5 w-32 h-32 bg-red-500/10 rounded-full blur-xl z-0 animate-pulse" />

          {/* The Main Image Container */}
          <div className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-orange-100 z-20">
            <img
              key={hoveredIndex} // Force re-render for animation
              ref={imageRef}
              src={
                hoveredIndex !== null ? data[hoveredIndex].image : defaultImage
              }
              alt="Feature preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE: INTERACTIVE LIST */}
        <div
          className="flex-1 space-y-4"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {data.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`px-6 py-5 border transition-all duration-300 cursor-pointer rounded-2xl ${
                hoveredIndex === index
                  ? "border-orange-300 bg-orange-50/80 shadow-sm translate-x-2"
                  : "border-gray-100 bg-white hover:border-orange-200"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    hoveredIndex === index
                      ? "bg-orange-100 text-orange-600"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  {item.icon}
                </div>
                <h3
                  className={`font-bold transition-colors ${
                    hoveredIndex === index ? "text-orange-700" : "text-gray-700"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  hoveredIndex === index
                    ? "max-h-32 mt-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 text-sm leading-relaxed border-l-2 border-orange-200 pl-4">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
