import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, PaintBucket, Grid, LayoutDashboard, Ruler, ArrowRight, CheckCircle } from 'lucide-react';

const RenovationServices: React.FC = () => {
  const services = [
    {
      icon: <LayoutDashboard size={32} />,
      title: "Full Home Renovation",
      desc: "Complete overhaul of your living space. We handle demolition, restructuring, and finishing to give you a brand new home."
    },
    {
      icon: <Grid size={32} />,
      title: "Kitchen Remodeling",
      desc: "Modern cabinetry, granite countertops, island installation, and smart appliance integration for a chef-worthy kitchen."
    },
    {
      icon: <PaintBucket size={32} />,
      title: "Bathroom Upgrades",
      desc: "Luxury tiling, modern sanitary ware, glass shower enclosures, and water heater systems."
    },
    {
      icon: <Ruler size={32} />,
      title: "Tiling & Flooring",
      desc: "Premium Italian tiles, marble, granite, or wooden laminate flooring installed with precision."
    },
    {
      icon: <Hammer size={32} />,
      title: "POP & Ceiling Works",
      desc: "Contemporary POP designs, suspended ceilings, and integrated lighting solutions."
    },
    {
      icon: <LayoutDashboard size={32} />,
      title: "Extensions & Partitioning",
      desc: "Add more room to your house or create functional office spaces with drywall partitioning."
    }
  ];

  return (
    <div className="bg-brand-light min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-brand-navy text-white h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-hero-radial opacity-70 mix-blend-screen z-10 pointer-events-none"></div>
          {/* High-end interior image */}
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Modern Kitchen"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">Transform Your Space</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
            From outdated to outstanding. We deliver high-end renovations with precision and speed.
          </p>
          <Link to="/contact" className="bg-brand-lime text-brand-navy font-bold py-4 px-10 rounded-lg hover:bg-brand-limeHover transition-all duration-300 shadow-[0_0_20px_rgba(173,248,2,0.4)] hover:shadow-lime-glow inline-flex items-center gap-2 transform hover:-translate-y-1">
            Get a Renovation Quote <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Intro Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-navy mb-6 relative inline-block">
             Expert Renovation Services in Nigeria
             <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-brand-lime"></span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed mt-4">
            Whether you just bought an old property in Yaba or want to modernize your duplex in Lekki, Handymen.Ng brings the expertise, materials, and project management to handle your renovation from start to finish. No stress, no stories.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-brand-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 border border-gray-100 group border-b-4 border-b-transparent hover:border-b-brand-lime">
                <div className="text-brand-navy mb-6 bg-brand-light w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-brand-navy group-hover:text-brand-lime transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-navy mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-brand-navy/10 mix-blend-multiply z-10"></div>
               {/* Image of a Black professional construction worker */}
               <img
                 src="https://images.unsplash.com/photo-1537255265538-89c5665b169b?q=80&w=2070&auto=format&fit=crop"
                 alt="Professional Contractor"
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
               />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-brand-navy mb-8">Why Trust Us With Your Home?</h2>
              <div className="space-y-8">
                {[
                  { title: "Project Management", desc: "You get a dedicated project manager who updates you weekly. You don't need to chase workers." },
                  { title: "Quality Materials", desc: "We source authentic materials directly from importers to ensure durability and finish." },
                  { title: "Timely Delivery", desc: "We agree on a timeline and stick to it. We understand the cost of delay." },
                  { title: "Transparent Budgeting", desc: "Detailed BOQ (Bill of Quantities) before we start. No hidden costs." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="text-brand-lime mr-5 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-brand-navy mb-1 text-lg">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link to="/contact" className="bg-brand-navy text-white font-bold py-4 px-10 rounded-lg hover:bg-brand-lime hover:text-brand-navy transition-all duration-300 shadow-lg transform hover:-translate-y-1 inline-block border border-transparent hover:border-brand-navy">
                  Schedule a Site Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenovationServices;