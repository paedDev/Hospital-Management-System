import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  Plus,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Plus size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                HM<span className="text-orange-500">S</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Streamlining healthcare management with intelligent appointment
              scheduling and doctor-patient synchronization.
            </p>
            <div className="flex space-x-4">
              <SocialIcon
                icon={<Facebook size={18} />}
                href="https://www.facebook.com/jannoel.paed/"
              />

              <SocialIcon
                icon={<Twitter size={18} />}
                href="https://twitter.com/yourhandle"
              />

              <SocialIcon
                icon={<Instagram size={18} />}
                href="https://instagram.com/yourhandle"
              />

              <SocialIcon
                icon={<Linkedin size={18} />}
                href="https://www.linkedin.com/in/jan-noel-s-paed-paed-115358347/"
              />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-gray-900 font-bold uppercase text-xs tracking-widest">
              Platform
            </h4>
            <ul className="space-y-4">
              <FooterLink label="How it Works" href={"#features"} />
              <FooterLink label="For Doctors" />
              <FooterLink label="For Patients" />
              <FooterLink label="Pricing Plans" />
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-gray-900 font-bold uppercase text-xs tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-500">
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span>
                  123 Health Ave, Suite 500
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-500">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-500">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span>support@medsync.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-gray-900 font-bold uppercase text-xs tracking-widest">
              Newsletter
            </h4>
            <p className="text-gray-500 text-sm">
              Get the latest updates on healthcare tech.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-xs">
            © {currentYear} MedSync Healthcare. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-400">
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ label, href = "#" }) => (
  <li>
    <a
      href={href}
      className="text-sm text-gray-500 hover:text-orange-600 hover:translate-x-1 inline-block transition-all"
    >
      {label}
    </a>
  </li>
);

const SocialIcon = ({ icon, href = "#" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
  >
    {icon}
  </a>
);
export default Footer;
