import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, Zap, Droplet, Paintbrush, Hammer, Fan, Tv, Eraser, CheckCircle, ChevronRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const HandymanServices: React.FC = () => {
  const navigate = useNavigate();
  const { openBooking } = useBooking();

  const handleQuickRequest = (label: string) => {
    // Removed "i need your service in" as requested and replaced with professional phrasing
    openBooking('handyman', `I require the expertise of a professional for ${label} services within my residence.`);
  };

  const quickServices = [
    { icon: <Droplet size={20} />, label: "Plumbing", color: "text-blue-400" },
    { icon: <Zap size={20} />, label: "Electrical", color: "text-yellow-400" },
    { icon: <Paintbrush size={20} />, label: "Painting", color: "text-purple-400" },
    { icon: <Hammer size={20} />, label: "Carpentry", color: "text-orange-400" },
    { icon: <Fan size={20} />, label: "AC Repair", color: "text-cyan-400" },
    { icon: <Eraser size={20} />, label: "Cleaning", color: "text-green-400" },
    { icon: <Tv size={20} />, label: "Mounting", color: "text-red-400" },
    { icon: <Wrench size={20} />, label: "General", color: "text-brand-lime" }
  ];

  const services = [
    {
      icon: <Droplet size={32} />,
      title: "Plumbing",
      desc: "Leaking pipes, tap replacement, toilet repairs, water heater installation, and pumping machine maintenance."
    },
    {
      icon: <Zap size={32} />,
      title: "Electrical",
      desc: "Wiring, fan installation, socket repairs, generator changeover switches, and inverter connections."
    },
    {
      icon: <Paintbrush size={32} />,
      title: "Painting",
      desc: "Interior and exterior painting, emulsion, gloss, screeding, and professional touch-ups."
    },
    {
      icon: <Hammer size={32} />,
      title: "Carpentry",
      desc: "Door repairs, shelf installation, furniture assembly, kitchen cabinetry, and window framing."
    },
    {
      icon: <Fan size={32} />,
      title: "AC & Appliances",
      desc: "AC repair, installation, servicing, gas filling, and fridge/washing machine connections."
    },
    {
      icon: <Eraser size={32} />,
      title: "Cleaning",
      desc: "Deep cleaning, post-construction cleaning, upholstery cleaning, and fumigation."
    },
    {
      icon: <Tv size={32} />,
      title: "TV & Electronics",
      desc: "DSTV/GOtv installation, professional TV mounting (wall/ceiling), and sound system setup."
    },
    {
      icon: <Wrench size={32} />,
      title: "General Handyman",
      desc: "Curtain installations, mosquito nets, picture hanging, lock repairs, and minor home fixes."
    }
  ];

  return (
    <div className="bg-brand-light min-h-screen">
      {/* Header */}
      <div className="bg-brand-navy text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#adf802_1px,transparent_1px)] [background-size:40px_40px]"></div>
        
        <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-brand-lime/20 bg-brand-lime/10 backdrop-blur-sm text-brand-lime text-[10px] font-bold tracking-[0.3em] uppercase">
             Verified Professionals
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 tracking-tight">Professional Handymen, <span className="text-brand-lime">On-Demand</span></h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light mb-12">
            Nigeria's most reliable network of verified home service experts. Premium quality, transparent pricing, and total peace of mind.
          </p>

          {/* Functional Quick Request Grid */}
          <div className="w-full mb-12">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-6">Select a service for a fast callback</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-6xl mx-auto">
              {quickServices.map((service, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleQuickRequest(service.label)}
                  className="flex flex-col items-center justify-center p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 group hover:bg-brand-lime hover:border-brand-lime hover:-translate-y-1 hover:shadow-lime-glow active:scale-95"
                >
                  <div className={`mb-3 transition-colors duration-300 group-hover:text-brand-navy ${service.color}`}>
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white group-hover:text-brand-navy transition-colors">
                    {service.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 md:p-6 bg-brand-dark/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl text-xs md:text-sm max-w-xl mx-auto flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-brand-lime/20 flex items-center justify-center text-brand-lime flex-shrink-0">
                <CheckCircle size={20} />
              </div>
              <p className="text-gray-400 leading-relaxed text-left">
                <span className="font-bold text-white block mb-0.5">Rapid Response Guaranteed</span>
                Click any service icon above. Our concierge team will reach out within 60 minutes to finalize your booking.
              </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-50 p-10 md:p-14 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="text-center mb-14">
             <h2 className="font-heading text-3xl font-bold text-brand-navy inline-block relative">
               The Handymen.Ng Standard
               <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-brand-lime rounded-full"></div>
             </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
             {[
               { title: "Background Verified", desc: "Every artisan undergoes strict vetting and criminal record checks for your safety." },
               { title: "No Hidden Fees", desc: "Transparent upfront pricing. You authorize every kobo before work begins." },
               { title: "Service Warranty", desc: "We provide a 14-day quality guarantee on every repair we undertake." },
               { title: "Elite Craftsmanship", desc: "We only partner with the top 5% of tradesmen in the Lagos metropolitan area." }
             ].map((item, idx) => (
               <div key={idx} className="flex items-start group">
                 <div className="flex-shrink-0 w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center group-hover:bg-brand-navy group-hover:text-brand-lime transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                    <CheckCircle size={24} className="text-brand-lime group-hover:text-brand-lime" />
                 </div>
                 <div className="ml-6">
                   <h3 className="font-bold text-lg text-brand-navy mb-2 group-hover:text-brand-lime transition-colors duration-300">{item.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
          <p className="text-brand-navy font-bold text-sm uppercase tracking-widest mb-3">Service Catalog</p>
          <h2 className="font-heading text-4xl font-bold text-brand-navy">Excellence in Every Trade</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-10 border border-gray-50 group relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-lime transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              
              <div className="text-brand-navy mb-8 w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 bg-brand-light group-hover:bg-brand-navy group-hover:text-brand-lime group-hover:shadow-xl group-hover:rotate-3">
                {service.icon}
              </div>
              
              <h3 className="font-heading text-xl font-bold text-brand-navy mb-4 group-hover:text-brand-navy">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">{service.desc}</p>
              
              <button 
                onClick={() => handleQuickRequest(service.title)} 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-navy group-hover:text-brand-lime transition-colors"
              >
                Book Expert <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-brand-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">Need an Emergency Fix?</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">Our rapid response team is standing by to assist with urgent plumbing or electrical issues across Lagos.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openBooking('handyman', 'EMERGENCY: I have an urgent repair request.')} className="bg-brand-lime text-brand-navy font-bold py-5 px-12 rounded-2xl hover:bg-brand-limeHover transition-all duration-300 shadow-xl hover:shadow-lime-glow text-lg transform active:scale-95">
              Contact Concierge
            </button>
            <a href="tel:08111922026" className="bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold py-5 px-12 rounded-2xl hover:bg-white/10 transition-all duration-300 text-lg transform active:scale-95">
              Call 0811 192 2026
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandymanServices;