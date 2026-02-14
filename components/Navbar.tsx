import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path 
    ? 'text-brand-lime font-semibold relative after:content-[""] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-brand-lime' 
    : 'text-white hover:text-brand-lime transition-colors duration-300 ease-in-out relative after:content-[""] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-brand-lime hover:after:w-full after:transition-all';
    
  const mobileLinkClass = "block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-brand-lime hover:text-brand-navy transition-all duration-300";

  return (
    <nav className="bg-brand-navy sticky top-0 z-50 shadow-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              {/* Logo icon could be an image or SVG. Using text for now as per prompt instructions imply a text rebrand */}
              <span className="font-heading font-bold text-2xl text-white transition-colors duration-300">
                Handymen<span className="text-brand-lime">.Ng</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/handyman" className={isActive('/handyman')}>Handyman Services</Link>
              <Link to="/move-in" className={isActive('/move-in')}>Move-In Packages</Link>
              <Link to="/renovation" className={isActive('/renovation')}>Renovations</Link>
              <Link to="/join" className={isActive('/join')}>Join as Pro</Link>
              <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
             <div className="text-white flex items-center gap-2 text-sm">
                <Phone size={16} className="text-brand-lime" />
                <span className="font-medium">0801 234 5678</span>
             </div>
             <Link to="/contact" className="bg-brand-lime text-brand-navy font-bold py-2 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lime-glow hover:bg-brand-limeHover transform hover:-translate-y-0.5">
               Get Quote
             </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-brand-lime focus:outline-none transition-colors duration-300"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-navy border-t border-gray-800 transition-all duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={mobileLinkClass} onClick={toggleMenu}>Home</Link>
            <Link to="/handyman" className={mobileLinkClass} onClick={toggleMenu}>Handyman Services</Link>
            <Link to="/move-in" className={mobileLinkClass} onClick={toggleMenu}>Move-In Packages</Link>
            <Link to="/renovation" className={mobileLinkClass} onClick={toggleMenu}>Renovations</Link>
            <Link to="/join" className={mobileLinkClass} onClick={toggleMenu}>Join as Pro</Link>
            <Link to="/contact" className={mobileLinkClass} onClick={toggleMenu}>Contact Us</Link>
            <Link to="/contact" className="block w-full text-center mt-4 bg-brand-lime text-brand-navy font-bold py-3 rounded-md hover:bg-brand-limeHover transition-colors duration-300" onClick={toggleMenu}>
              Get Free Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;