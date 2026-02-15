import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Zap, Droplet, Paintbrush, Hammer, Fan, Tv, Eraser, CheckCircle } from 'lucide-react';

const HandymanServices: React.FC = () => {
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
      <div className="bg-brand-navy text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Professional Handymen, On-Demand</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light mb-8">
            Whatever the issue, we have a verified expert ready to help. Fair prices, guaranteed work.
          </p>

          <div className="flex flex-col items-center gap-6 w-full mb-8">
              <Link to="/contact" className="bg-brand-lime text-brand-navy font-bold py-4 px-10 rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(173,248,2,0.4)] inline-block transform hover:-translate-y-1">
                  Request a Handyman Now
              </Link>

              <div className="p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-brand-lime/30 rounded-lg shadow-sm text-sm md:text-base max-w-xl mx-auto">
                  <p className="font-bold text-brand-lime mb-1">Pricing Note:</p>
                  <p className="text-gray-300 leading-relaxed">Pricing varies by job complexity. Request a quote and we'll provide a transparent breakdown with no hidden fees.</p>
              </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section - Bullet Points Version */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="text-center mb-10">
             <h2 className="font-heading text-2xl font-bold text-brand-navy inline-block border-b-4 border-brand-lime pb-2">Why Choose Handymen.Ng?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
             {[
               { title: "Verified Professionals", desc: "Every handyman is vetted and background checked." },
               { title: "Transparent Pricing", desc: "No hidden fees. You get a quote before work starts." },
               { title: "Quality Guarantee", desc: "Not happy? We fix it at no extra cost." },
               { title: "Fast Response", desc: "We typically arrive within hours for emergencies." }
             ].map((item, idx) => (
               <div key={idx} className="flex items-start group">
                 <div className="flex-shrink-0 mt-1 bg-brand-light p-2 rounded-full group-hover:bg-brand-lime group-hover:text-brand-navy transition-colors duration-300">
                    <CheckCircle size={20} className="text-brand-lime group-hover:text-brand-navy transition-colors duration-300" />
                 </div>
                 <div className="ml-4">
                   <h3 className="font-bold text-lg text-brand-navy mb-2">{item.title}</h3>
                   <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 p-8 border border-gray-100 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-lime to-brand-navy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="text-brand-navy mb-6 bg-brand-light w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-brand-navy group-hover:text-brand-lime transition-colors duration-300 border border-gray-100">
                {service.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-navy mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HandymanServices;