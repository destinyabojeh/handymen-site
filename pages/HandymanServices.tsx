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
      <div className="bg-brand-navy text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60"></div>
        <div className="relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Professional Handymen, On-Demand</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Whatever the issue, we have a verified expert ready to help. Fair prices, guaranteed work.
          </p>
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

      {/* Process Section */}
      <div className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-brand-navy mb-8">Why Choose Handymen.Ng?</h2>
              <ul className="space-y-6">
                {[
                  "Verified Professionals: Every handyman is vetted and background checked.",
                  "Transparent Pricing: No hidden fees. You get a quote before work starts.",
                  "Quality Guarantee: Not happy? We fix it at no extra cost.",
                  "Fast Response: We typically arrive within hours for emergencies."
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="text-brand-lime mr-4 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10 p-8 bg-brand-light border-l-4 border-brand-lime rounded-r-lg shadow-sm">
                <p className="font-bold text-brand-navy text-lg mb-2">Pricing Note:</p>
                <p className="text-gray-600 leading-relaxed">Pricing varies by job complexity. Request a quote and we'll provide a transparent breakdown with no hidden fees.</p>
              </div>

              <div className="mt-10">
                <Link to="/contact" className="bg-brand-navy text-white font-bold py-4 px-10 rounded-lg hover:bg-brand-lime hover:text-brand-navy transition-all duration-300 shadow-lg inline-block">
                  Request a Handyman Now
                </Link>
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply z-10"></div>
               {/* 
                  USER INSTRUCTION: 
                  Save the image you provided as 'handyman-fixing-sink.jpg' in your project's public/ folder. 
               */}
               <img 
                 src="/handyman-fixing-sink.jpg" 
                 onError={(e) => {
                   // Fallback to previous "person with helmet" image if local file is missing
                   e.currentTarget.src = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop";
                 }}
                 alt="Professional Handyman fixing a sink" 
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandymanServices;