import React, { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
const FAQ = () => {
  const faqData = [
    {
      question:
        "What are the benefits of a Hospital Appointment Management System?",
      answer:
        "Streamlines patient booking, doctor scheduling, and admin management. Patients book 24/7, doctors control availability, and admins manage users/roles—all from secure dashboards.",
    },
    {
      question: "Can patients see other patients' appointments?",
      answer:
        "No. Role-based access ensures patients only see their own appointments. Doctors see their patients only. Admins have full visibility with proper permissions.",
    },
    {
      question: "Is this suitable for small clinics or just large hospitals?",
      answer:
        "Perfect for any size. Single-doctor clinics use patient booking + doctor dashboard. Multi-location hospitals scale with admin user/role management.",
    },
    {
      question: "Does it work internationally or just local clinics?",
      answer:
        "Fully international-ready. Supports multiple time zones, languages, and scales from local clinics to hospital networks across regions.",
    },
    {
      question: "Does the system send appointment reminders?",
      answer:
        "Yes. Configurable email notifications for patients, doctors, and admins. Patients get booking confirmations, doctors get daily schedules.",
    },
    {
      question: "How do doctors manage their availability?",
      answer:
        "Doctors have personal dashboards to set available slots, block time off, and review upcoming appointments with patient details.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleActions = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen py-10 px-4">
      <div className="flex flex-col items-center justify-center space-y-10 max-w-6xl mx-auto ">
        <h1 className="text-4xl">Frequently Asked Questions</h1>
        <div className="max-w-6xl w-full">
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                onClick={() => toggleActions(index)}
                className={`w-full mb-4 border p-6 rounded-lg shadow-lg ${
                  isOpen
                    ? "shadow-md border-orange-200 bg-orange-50/30"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-4 justify-between ">
                  <h3
                    className={`font-semibold ${
                      isOpen ? "text-orange-700" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  {isOpen ? (
                    <Minus size={16} className="text-orange-600" />
                  ) : (
                    <Plus size={16} />
                  )}
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm leading-relaxed border-t border-orange-100 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
