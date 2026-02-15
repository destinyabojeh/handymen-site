import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail, MessageCircle, Youtube } from 'lucide-react';

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SnapchatIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 3c-1.2 0-2.4.6-3.1 1.6C7.5 5.8 7.3 7 7.3 8.2c0 .6.1 1.2.2 1.8-1.5.4-2.5 1.4-2.5 2.5 0 .8.5 1.5 1.4 2 .1.1.2.1.2.2 0 .2-.4.6-.4 1.1 0 .6.5.9 1 .9.3 0 .5-.1.8-.3 1 1 2.3 1.6 4 1.6s3-.6 4-1.6c.3.2.5.3.8.3.5 0 1-.3 1-.9 0-.5-.4-.9-.4-1.1 0-.1.1-.1.2-.2.9-.5 1.4-1.2 1.4-2 0-1.1-1-2.1-2.5-2.5.1-.6.2-1.2.2-1.8 0-1.2-.2-2.4-1.6-3.6C14.4 3.6 13.2 3 12 3z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-brand-lime/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="logo.jpg" 
                alt="Logo" 
                className="h-8 w-auto object-contain" 
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <h3 className="font-heading text-xl font-bold text-white">Handymen<span className="text-brand-lime">.Ng</span></h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for home maintenance, renovation, and premium relocation services in Nigeria. We bring professionalism to your doorstep.
            </p>
            <div className="flex space-x-3 flex-wrap gap-y-3">
              <a href="#" className="text-gray-400 hover:text-brand-lime transition-all duration-300" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-lime transition-all duration-300" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-lime transition-all duration-300" aria-label="YouTube"><Youtube size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-lime transition-all duration-300" aria-label="TikTok"><TikTokIcon size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-lime transition-all duration-300" aria-label="Snapchat"><SnapchatIcon size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-brand-lime relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-0.5 after:bg-brand-lime">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400 mt-2">
              <li><Link to="/" className="hover:text-white transition-colors duration-300 flex items-center"><span className="text-brand-lime mr-2">›</span>Home</Link></li>
              <li><Link to="/handyman" className="hover:text-white transition-colors duration-300 flex items-center"><span className="text-brand-lime mr-2">›</span>Handyman Services</Link></li>
              <li><Link to="/move-in" className="hover:text-white transition-colors duration-300 flex items-center"><span className="text-brand-lime mr-2">›</span>Move-In Packages</Link></li>
              <li><Link to="/renovation" className="hover:text-white transition-colors duration-300 flex items-center"><span className="text-brand-lime mr-2">›</span>Renovation Services</Link></li>
              <li><Link to="/join" className="hover:text-white transition-colors duration-300 flex items-center"><span className="text-brand-lime mr-2">›</span>Join Our Network</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors duration-300 flex items-center"><span className="text-brand-lime mr-2">›</span>Get a Quote</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-brand-lime relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-0.5 after:bg-brand-lime">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400 mt-2">
              <li>Renovation Services</li>
              <li>Plumbing & Electrical</li>
              <li>AC Repair & Servicing</li>
              <li>Home Painting</li>
              <li>Deep Cleaning</li>
              <li>Full Move-In Setup</li>
              <li>Furniture Assembly</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-brand-lime relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-0.5 after:bg-brand-lime">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400 mt-2">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-brand-lime" />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-brand-lime" />
                <span>08111922026</span>
              </li>
              <li className="flex items-center">
                <MessageCircle size={18} className="mr-2 text-brand-lime" />
                <span>08108442042</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-brand-lime" />
                <span>Handymen.com.Ng@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Gradient Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-lime to-transparent opacity-30 my-8"></div>

        <div className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Handymen.Ng. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;