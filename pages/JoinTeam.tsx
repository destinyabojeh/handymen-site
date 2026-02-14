import React, { useState } from 'react';
import { Check } from 'lucide-react';

const JoinTeam: React.FC = () => {
  const [selectedTrade, setSelectedTrade] = useState('');

  return (
    <div className="bg-brand-light min-h-screen">
       <div className="bg-brand-navy text-white py-24 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-radial opacity-50"></div>
          <h1 className="font-heading text-4xl font-bold mb-6 relative z-10">Partner with Handymen.Ng</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto relative z-10">
            Join Nigeria's fastest-growing network of trusted professionals. Get consistent jobs, fair pay, and respect.
          </p>
       </div>

       <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-brand-lime h-fit">
               <h3 className="font-bold text-2xl mb-6 text-brand-navy">Why Join Us?</h3>
               <ul className="space-y-4">
                 {[
                   "Steady flow of verified jobs",
                   "Fast payment after each job",
                   "No more hunting for clients",
                   "Be part of a trusted premium brand",
                   "Professional support team"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center text-gray-700">
                     <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center mr-3 flex-shrink-0">
                        <Check size={14} className="text-brand-lime font-bold" />
                     </div>
                     {item}
                   </li>
                 ))}
               </ul>
             </div>
             
             <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="font-heading text-2xl font-bold mb-6 text-brand-navy">Apply Now</h3>
                <form className="space-y-5">
                  <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-brand-lime outline-none transition duration-300 bg-gray-50" />
                  <input type="tel" placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-brand-lime outline-none transition duration-300 bg-gray-50" />
                  
                  <select 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-brand-lime outline-none bg-gray-50 transition duration-300"
                    onChange={(e) => setSelectedTrade(e.target.value)}
                    value={selectedTrade}
                  >
                    <option value="">Select Your Trade</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Painter">Painter</option>
                    <option value="AC Technician">AC Technician</option>
                    <option value="Cleaner">Cleaner</option>
                    <option value="Other">Other (Please Specify)</option>
                  </select>

                  {selectedTrade === 'Other' && (
                    <input 
                      type="text" 
                      placeholder="Please specify your trade" 
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-brand-lime outline-none transition duration-300 animate-fade-in bg-gray-50" 
                    />
                  )}

                  <div className="flex items-center gap-6 py-2">
                     <span className="text-gray-700 font-medium">Own Tools?</span>
                     <label className="flex items-center gap-2 cursor-pointer">
                       <input type="radio" name="tools" value="yes" className="accent-brand-lime" /> Yes
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                       <input type="radio" name="tools" value="no" className="accent-brand-lime" /> No
                     </label>
                  </div>
                  <input type="text" placeholder="Area of Operation (e.g. Lekki, Ikeja)" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-brand-lime outline-none transition duration-300 bg-gray-50" />
                  
                  <button className="w-full bg-brand-navy text-white font-bold py-4 rounded hover:bg-brand-lime hover:text-brand-navy transition-all duration-300 shadow-lg transform hover:-translate-y-1">Submit Application</button>
                  <p className="text-xs text-center text-gray-500 mt-2">We'll contact you within 48 hours.</p>
                </form>
             </div>
          </div>
       </div>
    </div>
  );
};

export default JoinTeam;