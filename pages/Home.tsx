import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Truck, ShieldCheck, Star, ArrowRight, Hammer, CheckCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`}></div>
);

const RotatingHeroText: React.FC = () => {
  const messages = [
    "Partner with Handymen.NG",
    "Earn 4% on every referral",
    "Turn your network into income"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 mb-6 flex items-center justify-center">
      <p className={`text-brand-lime/90 text-base md:text-lg font-medium tracking-wide transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {messages[currentIndex]}
      </p>
    </div>
  );
};

const Home: React.FC = () => {
  const { openBooking } = useBooking();
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    // Simulate fetching testimonials
    const timer = setTimeout(() => {
      setLoadingTestimonials(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative bg-brand-navy h-[750px] flex items-center overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=2070&auto=format&fit=crop"
            alt="Handymen.Ng Professional Team" 
            className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-[30s] group-hover:scale-110 ease-out will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-navy/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/80"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#adf802_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-brand-lime/30 bg-brand-lime/10 backdrop-blur-md animate-fade-in-down shadow-[0_0_15px_rgba(173,248,2,0.2)]">
             <span className="text-brand-lime text-xs md:text-sm font-bold tracking-widest uppercase">Premium Home Services</span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Your Home, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-[#c0ff4d] drop-shadow-sm filter">Perfectly Handled.</span>
          </h1>

          <div className="max-w-xl mx-auto mb-6 relative">
            <p className="text-sm md:text-base text-gray-200 font-light leading-relaxed drop-shadow-md tracking-wide">
              From a leaking tap to a renovation plan or full luxury move-in, Handymen.Ng delivers trusted, premium service.
            </p>
            <p className="text-base md:text-lg font-medium text-white mt-2 drop-shadow-sm">
              One call. <span className="text-brand-lime/90 italic">Everything solved.</span>
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-lime to-transparent opacity-50 mx-auto mt-4"></div>
          </div>
          
          <RotatingHeroText />

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
            <Link 
              to="/handyman"
              className="px-8 py-4 bg-brand-lime text-brand-navy font-bold rounded-lg hover:bg-gradient-to-r hover:from-brand-lime hover:to-brand-limeHover transition-all duration-300 shadow-[0_0_20px_rgba(173,248,2,0.3)] hover:shadow-[0_0_30px_rgba(173,248,2,0.5)] transform hover:-translate-y-1 text-center min-w-[200px]"
            >
              Book a Handyman
            </Link>
            <Link 
              to="/move-in"
              className="px-8 py-4 border border-brand-lime/30 text-white font-bold rounded-lg hover:border-brand-lime hover:text-brand-lime transition-all duration-300 transform hover:-translate-y-1 text-center flex items-center justify-center gap-2 min-w-[200px] bg-brand-navy/40 backdrop-blur-md hover:bg-brand-navy/60"
            >
              Explore Move-In <ArrowRight size={20} />
            </Link>
            <Link 
              to="/renovation"
              className="px-8 py-4 border border-gray-600 text-white font-bold rounded-lg hover:border-brand-lime hover:text-brand-lime transition-all duration-300 transform hover:-translate-y-1 text-center flex items-center justify-center gap-2 min-w-[200px] bg-brand-navy/40 backdrop-blur-md hover:bg-brand-navy/60"
            >
               Renovations
            </Link>
          </div>
        </div>
      </div>

      {/* Trusted By Strip */}
      <div className="bg-brand-light border-b border-gray-200 py-10 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime opacity-5 rounded-bl-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by homeowners in premium locations in lagos on the island & mainland</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-brand-navy/70 font-heading font-semibold text-lg">
                <span className="hover:text-brand-lime transition-colors duration-300 cursor-default">Island</span>
                <span className="hover:text-brand-lime transition-colors duration-300 cursor-default">Mainland</span>
            </div>
        </div>
      </div>

      {/* Core Offerings (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Column 1: Handyman */}
        <Link 
          to="/handyman"
          className="bg-white p-10 md:p-14 flex flex-col justify-start items-start border-b lg:border-b-0 lg:border-r border-gray-100 relative overflow-hidden group text-left"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-lime to-brand-navy transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="bg-brand-light p-4 rounded-full mb-6 group-hover:bg-brand-lime/10 transition-colors duration-300">
            <Wrench className="text-brand-navy w-8 h-8 group-hover:text-brand-lime transition-colors duration-300" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-brand-navy mb-4">Handyman Services</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            On-demand plumbing, electrical, painting, carpentry, and more. Fast, verified, reliable service for your everyday fixes.
          </p>
          <span className="text-brand-navy font-bold group-hover:text-brand-lime transition-colors duration-300 flex items-center group/link">
            Get Started <ArrowRight size={18} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
          </span>
        </Link>

        {/* Column 2: Move-In */}
        <Link 
          to="/move-in"
          className="bg-brand-light p-10 md:p-14 flex flex-col justify-start items-start border-b lg:border-b-0 lg:border-r border-gray-100 relative overflow-hidden group text-left"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-lime to-brand-navy transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="bg-white p-4 rounded-full mb-6 shadow-sm group-hover:bg-brand-lime/10 transition-colors duration-300">
            <Truck className="text-brand-lime w-8 h-8" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-brand-navy mb-4">Premium Move-In</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Full relocation & setup. Hand us the keys. We move, clean, paint, install, and arrange. You just show up to a ready home.
          </p>
          <span className="text-brand-navy font-bold group-hover:text-brand-lime transition-colors duration-300 flex items-center group/link">
            Book a Package <ArrowRight size={18} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
          </span>
        </Link>

        {/* Column 3: Renovations */}
        <Link 
          to="/renovation"
          className="bg-white p-10 md:p-14 flex flex-col justify-start items-start relative overflow-hidden group text-left"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-lime to-brand-navy transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="bg-brand-light p-4 rounded-full mb-6 group-hover:bg-brand-lime/10 transition-colors duration-300">
            <Hammer className="text-brand-navy w-8 h-8 group-hover:text-brand-lime transition-colors duration-300" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-brand-navy mb-4">Renovate Your Space</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Kitchen transformations, bathroom remodels, home extensions, and complete interior upgrades delivered with precision.
          </p>
          <span className="text-brand-navy font-bold group-hover:text-brand-lime transition-colors duration-300 flex items-center group/link">
            Request Quote <ArrowRight size={18} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      {/* Services Grid Preview */}
      <div className="py-24 bg-brand-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-brand-navy mb-4 relative inline-block">
              Everything Your Home Needs
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-brand-lime to-transparent"></span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">One trusted source for all your home maintenance and improvement tasks.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🔧', label: 'Plumber' },
              { icon: '⚡️', label: 'Electrician' },
              { icon: '🎨', label: 'Painter' },
              { icon: '🪚', label: 'Carpenter' },
              { icon: '❄️', label: 'AC Repair' },
              { icon: '🧼', label: 'Deep Cleaning' },
              { icon: '🛋️', label: 'Assembly' },
              { icon: '📺', label: 'Installation' }
            ].map((item, idx) => (
              <Link 
                key={idx} 
                to="/handyman"
                className="flex flex-col items-center justify-center p-8 bg-white rounded-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-transparent hover:border-brand-lime/30 shadow-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-card-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110 relative z-10">{item.icon}</span>
                <span className="font-semibold text-gray-800 group-hover:text-brand-navy transition-colors duration-300 relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-lime opacity-5 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-lime opacity-5 rounded-full filter blur-3xl transform translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-heading text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Simple, transparent, and stress-free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="relative group">
              <div className="w-20 h-20 bg-transparent border-2 border-brand-lime rounded-full flex items-center justify-center mx-auto mb-8 text-brand-lime font-bold text-2xl group-hover:bg-brand-lime group-hover:text-brand-navy transition-all duration-300">1</div>
              <h3 className="text-xl font-bold mb-4 text-white">Tell Us What You Need</h3>
              <p className="text-gray-400 px-4 leading-relaxed">Fill our simple form or call us directly. Describe your issue or move-in requirements.</p>
            </div>
            <div className="relative group">
               <div className="w-20 h-20 bg-transparent border-2 border-brand-lime rounded-full flex items-center justify-center mx-auto mb-8 text-brand-lime font-bold text-2xl group-hover:bg-brand-lime group-hover:text-brand-navy transition-all duration-300">2</div>
              <h3 className="text-xl font-bold mb-4 text-white">We Connect or Take Over</h3>
              <p className="text-gray-400 px-4 leading-relaxed">We dispatch a verified pro or start your move-in project immediately.</p>
            </div>
            <div className="relative group">
               <div className="w-20 h-20 bg-transparent border-2 border-brand-lime rounded-full flex items-center justify-center mx-auto mb-8 text-brand-lime font-bold text-2xl group-hover:bg-brand-lime group-hover:text-brand-navy transition-all duration-300">3</div>
              <h3 className="text-xl font-bold mb-4 text-white">Quality Work, Guaranteed</h3>
              <p className="text-gray-400 px-4 leading-relaxed">Relax while we work. You verify the results, and payment is processed securely.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
           <h2 className="font-heading text-3xl font-bold text-center text-brand-navy mb-16">What Our Clients Say</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loadingTestimonials ? (
                <>
                  <div className="bg-brand-light p-10 rounded-xl border border-gray-100">
                    <Skeleton className="w-24 h-4 mb-6" />
                    <Skeleton className="w-full h-4 mb-2" />
                    <Skeleton className="w-full h-4 mb-2" />
                    <Skeleton className="w-3/4 h-4 mb-8" />
                    <div className="flex items-center">
                      <Skeleton className="w-12 h-12 rounded-full mr-4" />
                      <div className="space-y-2">
                        <Skeleton className="w-24 h-3" />
                        <Skeleton className="w-16 h-2" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-brand-light p-10 rounded-xl border border-gray-100">
                    <Skeleton className="w-24 h-4 mb-6" />
                    <Skeleton className="w-full h-4 mb-2" />
                    <Skeleton className="w-full h-4 mb-2" />
                    <Skeleton className="w-3/4 h-4 mb-8" />
                    <div className="flex items-center">
                      <Skeleton className="w-12 h-12 rounded-full mr-4" />
                      <div className="space-y-2">
                        <Skeleton className="w-24 h-3" />
                        <Skeleton className="w-16 h-2" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-brand-light p-10 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative animate-fade-in">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                       <ShieldCheck size={60} className="text-brand-navy" />
                    </div>
                    <div className="flex text-brand-lime mb-6">
                      {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                    </div>
                    <p className="text-brand-navy/80 italic mb-8 text-lg font-light leading-relaxed">"Handymen.Ng made my move from the UK effortless. They set up my parents' home perfectly. I could relax knowing it was in trusted hands."</p>
                    <div className="flex items-center">
                       <div className="w-12 h-12 bg-brand-navy rounded-full flex items-center justify-center text-brand-lime font-bold mr-4 border border-brand-lime/30">CA</div>
                       <div>
                          <p className="font-bold text-brand-navy">Chidi A.</p>
                          <p className="text-sm text-gray-500">London / Lagos</p>
                       </div>
                    </div>
                  </div>

                  <div className="bg-brand-light p-10 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative animate-fade-in">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                       <ShieldCheck size={60} className="text-brand-navy" />
                    </div>
                    <div className="flex text-brand-lime mb-6">
                      {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                    </div>
                    <p className="text-brand-navy/80 italic mb-8 text-lg font-light leading-relaxed">"Found a plumber through them in 10 minutes. Fair price, great work. Finally, a service I can trust in Lagos."</p>
                    <div className="flex items-center">
                       <div className="w-12 h-12 bg-brand-navy rounded-full flex items-center justify-center text-brand-lime font-bold mr-4 border border-brand-lime/30">FO</div>
                       <div>
                          <p className="font-bold text-brand-navy">Funmi O.</p>
                          <p className="text-sm text-gray-500">Lekki, Lagos</p>
                       </div>
                    </div>
                  </div>
                </>
              )}
           </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-brand-navy py-20 px-4 relative overflow-hidden">
         <div className="absolute inset-0 bg-hero-radial opacity-50 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">Ready for a Home That Just Works?</h2>
          <p className="text-gray-300 mb-10 text-lg font-light">Don't let home maintenance stress you out. Get professional help today.</p>
          <button 
            onClick={() => openBooking()}
            className="inline-block bg-brand-lime text-brand-navy font-bold text-lg py-4 px-12 rounded-lg hover:bg-brand-limeHover transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(173,248,2,0.4)]"
          >
            Get Your Free Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;