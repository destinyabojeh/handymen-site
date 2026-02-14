import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Crown, Globe, Briefcase, Home, ChevronDown, ChevronUp } from 'lucide-react';

const MoveInServices: React.FC = () => {
  const [openPackageIndex, setOpenPackageIndex] = useState<number | null>(null);

  const togglePackage = (index: number) => {
    setOpenPackageIndex(openPackageIndex === index ? null : index);
  };

  const packages = [
    {
      title: "Comfort Starter",
      icon: <Home size={24} className="text-gray-500" />,
      iconBg: "bg-gray-50",
      borderColor: "border-gray-300",
      description: "Essential setup because everyone deserves comfort.",
      features: [
        "Moving logistics support",
        "Standard home cleaning",
        "Furniture placement",
        "Installations",
        "Painting (optional)"
      ],
      linkText: "Select Starter",
      linkClass: "bg-white border border-gray-300 text-brand-navy hover:bg-brand-navy hover:text-white hover:border-brand-navy"
    },
    {
      title: "Executive Arrival",
      icon: <Briefcase size={24} className="text-gray-600" />,
      iconBg: "bg-gray-100",
      borderColor: "border-gray-400",
      description: "For busy professionals who value time.",
      features: [
        "Full property moving & logistics",
        "Premium deep cleaning",
        "Professional painting (Standard)",
        "Appliance installation",
        "Furniture assembly",
        "Curtain & Blinds installation",
        "Welcome scent & flowers"
      ],
      linkText: "Select Executive",
      linkClass: "bg-white border border-gray-300 text-brand-navy hover:bg-brand-navy hover:text-white hover:border-brand-navy"
    },
    {
      title: "Diaspora Edition",
      icon: <Globe size={24} className="text-brand-navy" />,
      iconBg: "bg-brand-lime/20",
      borderColor: "border-brand-lime",
      description: "International standards and comprehensive care.",
      features: [
        "Everything in Executive +",
        "Deep cleaning + Sanitization",
        "Complete repainting (Premium)",
        "Appliances installed & tested",
        "Grocery stocking (Starter pack)",
        "Welcome package",
        "Video walkthrough"
      ],
      linkText: "Select Diaspora",
      linkClass: "bg-brand-lime text-brand-navy hover:bg-brand-limeHover shadow-lg hover:shadow-lime-glow",
      isPopular: true
    },
    {
      title: "Imperial Collection",
      icon: <Crown size={24} className="text-brand-navy" />,
      iconBg: "bg-brand-navy/10",
      borderColor: "border-brand-navy",
      description: "For those who accept nothing less than perfection.",
      features: [
        "Full Luxury Relocation",
        "Disinfection + Pest Control",
        "Designer-curated paint colors",
        "Smart Home setup",
        "Interior Design Service",
        "Professional Photography"
      ],
      linkText: "Select Imperial",
      linkClass: "bg-brand-navy text-white hover:bg-opacity-90"
    }
  ];

  return (
    <div className="bg-brand-light min-h-screen">
       {/* Hero */}
       <div className="bg-brand-navy text-white py-28 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" alt="Luxury Interior" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 to-brand-navy"></div>
          </div>
          <div className="relative z-10">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">Premium Move-In & Setup</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Your new home, ready before you arrive. Choose your package, hand us the keys, and experience a stress-free move.
            </p>
          </div>
       </div>

       {/* Packages */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-20 relative z-20">
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
            
            {packages.map((pkg, index) => {
              const isOpen = openPackageIndex === index;
              return (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 ${pkg.borderColor} flex flex-col hover:shadow-2xl transition-all duration-300 ${pkg.isPopular ? 'xl:-translate-y-6 relative z-10' : ''}`}
                >
                  {pkg.isPopular && (
                    <div className="absolute top-0 right-0 bg-brand-lime text-brand-navy text-xs font-bold px-4 py-1.5 rounded-bl-lg tracking-wide uppercase">Most Popular</div>
                  )}
                  
                  <div className="p-6 flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                       <div className={`p-2 ${pkg.iconBg} rounded-lg`}>
                          {pkg.icon}
                       </div>
                       <h3 className="font-heading text-xl font-bold text-brand-navy">{pkg.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-6 border-b border-gray-100 pb-4">{pkg.description}</p>
                    
                    <button 
                      onClick={() => togglePackage(index)}
                      className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm font-bold text-brand-navy border border-brand-lime/30 bg-gradient-to-br from-white to-brand-light hover:to-white hover:border-brand-lime hover:shadow-lime-glow hover:-translate-y-0.5 transition-all duration-300 mb-6 group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        View Offerings
                      </span>
                      {isOpen ? (
                        <ChevronUp size={20} className="text-brand-lime relative z-10" />
                      ) : (
                        <ChevronDown size={20} className="text-brand-navy/50 group-hover:text-brand-lime relative z-10 transition-colors duration-300" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="animate-fade-in-down">
                        <ul className="space-y-4 mb-8 mt-2">
                          {pkg.features.map((item, i) => (
                             <li key={i} className={`flex items-start text-sm ${pkg.isPopular ? 'text-brand-navy font-medium' : 'text-gray-600'}`}>
                               <Check size={16} className="text-brand-lime mr-3 mt-0.5 flex-shrink-0" />
                               {item}
                             </li>
                           ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className={`p-6 border-t border-gray-100 ${pkg.isPopular ? 'bg-brand-light' : 'bg-gray-50'}`}>
                    <Link to="/contact" className={`block w-full py-4 font-bold text-center rounded-lg transition-all duration-300 shadow-sm ${pkg.linkClass}`}>{pkg.linkText}</Link>
                  </div>
                </div>
              );
            })}

         </div>
       </div>

       {/* How Move-In Works */}
       <div className="bg-white py-24">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center text-brand-navy mb-16 relative inline-block left-1/2 transform -translate-x-1/2">
               The Move-In Process
               <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-brand-lime to-brand-navy"></span>
            </h2>
            <div className="space-y-10">
               {[
                 { step: 1, title: "Consultation & Quote", desc: "We discuss your specific needs, property size, and timeline." },
                 { step: 2, title: "Hand Over Keys", desc: "You provide access. We provide the security and insurance." },
                 { step: 3, title: "Transformation", desc: "Our team swarms the property: cleaning, painting, fixing, arranging." },
                 { step: 4, title: "The Reveal", desc: "You walk into a finished, fresh-smelling, fully functional home." },
                 { step: 5, title: "Walkthrough", desc: "For diaspora clients, we send a detailed HD video tour." }
               ].map((item) => (
                 <div key={item.step} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-brand-navy text-brand-lime border-2 border-brand-lime flex items-center justify-center font-bold text-xl group-hover:bg-brand-lime group-hover:text-brand-navy transition-all duration-300 shadow-md z-10">
                      {item.step}
                    </div>
                    <div className="pb-10 border-l-2 border-gray-100 ml-[-43px] pl-16 pt-2">
                      <h3 className="font-heading text-xl font-bold text-brand-navy group-hover:text-brand-lime transition-colors duration-300 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
       </div>
    </div>
  );
};

export default MoveInServices;