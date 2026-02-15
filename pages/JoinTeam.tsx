import React, { useState, useEffect } from 'react';
import { Check, ShieldCheck, Award, TrendingUp, Users, ArrowRight, Star } from 'lucide-react';

const JoinTeam: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    trade: '',
    otherTrade: '',
    ownTools: '',
    area: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Pre-load voices for the premium audio experience
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const playSuccessAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = "Application sent. Our team will review your profile shortly.";
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.rate = 0.85; // Calmer, slower premium pace
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => 
        v.name.includes('Google US English') || 
        v.name.includes('Samantha') || 
        v.name.includes('Microsoft Zira') ||
        v.name.toLowerCase().includes('female')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessAudio();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-brand-light min-h-screen">
      {/* Premium Hero Section */}
      <div className="relative bg-brand-navy h-[550px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop" 
            alt="Professional craftsmanship" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-transparent"></div>
          {/* Decorative Brand Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#adf802_1px,transparent_1px)] [background-size:30px_30px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-6 py-2 rounded-full border border-brand-lime/20 bg-brand-lime/5 backdrop-blur-md animate-fade-in-down">
             <span className="text-brand-lime text-xs font-bold tracking-[0.2em] uppercase">Executive Partnership</span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Partner with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-white">Handymen.Ng</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            We don't just find you jobs. We build your legacy. Join Nigeria's most prestigious network of verified home service professionals.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-20 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Value Propositions */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-brand-navy p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="font-heading text-2xl font-bold mb-8 flex items-center gap-3">
                <Star className="text-brand-lime" fill="currentColor" size={24} />
                The Pro Advantage
              </h3>
              
              <div className="space-y-10">
                <div className="flex gap-6 group/item">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-brand-lime/50 transition-colors">
                    <TrendingUp className="text-brand-lime" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Guaranteed High-Value Jobs</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Access to premium clients in Lagos' most exclusive neighborhoods. No more bidding wars.</p>
                  </div>
                </div>

                <div className="flex gap-6 group/item">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-brand-lime/50 transition-colors">
                    <Award className="text-brand-lime" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Instant Payouts</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Get paid immediately upon successful job completion and verification. Cashflow you can rely on.</p>
                  </div>
                </div>

                <div className="flex gap-6 group/item">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-brand-lime/50 transition-colors">
                    <Users className="text-brand-lime" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Professional Branding</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Leverage our reputation. We handle the marketing, customer support, and dispute resolution.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-brand-lime">500+</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Active Partners</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-brand-lime">4.8/5</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Partner Rating</p>
                </div>
              </div>
            </div>

            {/* Testimonial Feature */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 italic text-gray-600">
               <p className="mb-4">"Handymen.Ng changed everything for my business. I focus on my craft, they handle the rest. The pay is honest and the clients are respectful."</p>
               <div className="flex items-center gap-3 not-italic">
                  <div className="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center text-brand-lime font-bold">SO</div>
                  <div>
                    <p className="font-bold text-brand-navy text-sm">Samuel O.</p>
                    <p className="text-xs text-gray-400">Master Electrician, Lekki</p>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Right Column: Application Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
               {isSubmitted ? (
                  <div className="py-20 text-center animate-fade-in">
                    <div className="w-24 h-24 bg-brand-lime/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-lime shadow-lime-glow">
                      <Check size={48} className="text-brand-navy" />
                    </div>
                    <h3 className="font-heading text-4xl font-bold text-brand-navy mb-4">Application Received</h3>
                    <p className="text-gray-500 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                      Thank you for your interest in joining Handymen.Ng. Our verification committee will review your credentials and contact you within 48 business hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-brand-navy font-bold hover:text-brand-lime transition-colors underline flex items-center gap-2 mx-auto"
                    >
                      Update Details <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-10">
                      <h3 className="font-heading text-3xl font-bold text-brand-navy mb-2">Join the Elite</h3>
                      <p className="text-gray-500">Please provide accurate details for our verification process.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="block text-xs font-bold text-brand-navy uppercase tracking-widest mb-2 ml-1">Full Professional Name</label>
                          <input 
                            type="text" 
                            name="fullName"
                            required
                            placeholder="e.g. Samuel Okoro" 
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-brand-lime focus:ring-0 outline-none transition-all bg-gray-50/50 font-medium" 
                          />
                        </div>
                        <div className="relative">
                          <label className="block text-xs font-bold text-brand-navy uppercase tracking-widest mb-2 ml-1">Direct Contact Line</label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            placeholder="080 0000 0000" 
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-brand-lime focus:ring-0 outline-none transition-all bg-gray-50/50 font-medium" 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="block text-xs font-bold text-brand-navy uppercase tracking-widest mb-2 ml-1">Core Expertise</label>
                          <select 
                            name="trade"
                            className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-brand-lime focus:ring-0 outline-none bg-gray-50/50 transition-all font-medium appearance-none"
                            onChange={handleChange}
                            value={formData.trade}
                            required
                          >
                            <option value="">Select Your Trade</option>
                            <option value="Plumber">Plumbing Specialist</option>
                            <option value="Electrician">Electrical Engineering</option>
                            <option value="Carpenter">Fine Carpentry</option>
                            <option value="Painter">Professional Painting & Finish</option>
                            <option value="AC Technician">HVAC/AC Maintenance</option>
                            <option value="Cleaner">Premium Deep Cleaning</option>
                            <option value="Other">Other Specialty</option>
                          </select>
                        </div>
                        <div className="relative">
                           <label className="block text-xs font-bold text-brand-navy uppercase tracking-widest mb-2 ml-1">Operational Area</label>
                           <input 
                            type="text" 
                            name="area"
                            required
                            placeholder="e.g. Victoria Island, Ikeja" 
                            value={formData.area}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-brand-lime focus:ring-0 outline-none transition-all bg-gray-50/50 font-medium" 
                          />
                        </div>
                      </div>

                      {formData.trade === 'Other' && (
                        <div className="animate-fade-in">
                          <label className="block text-xs font-bold text-brand-navy uppercase tracking-widest mb-2 ml-1">Specify Your Trade</label>
                          <input 
                            type="text" 
                            name="otherTrade"
                            required
                            placeholder="Please define your expertise" 
                            value={formData.otherTrade}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-brand-lime focus:ring-0 outline-none transition-all bg-gray-50/50 font-medium" 
                          />
                        </div>
                      )}

                      <div className="p-6 bg-brand-light rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                         <span className="text-brand-navy font-bold text-sm uppercase tracking-wider">Do you own professional tools?</span>
                         <div className="flex gap-4">
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input 
                                  type="radio" 
                                  name="ownTools" 
                                  value="yes" 
                                  checked={formData.ownTools === 'yes'}
                                  onChange={handleChange}
                                  required 
                                  className="w-5 h-5 accent-brand-navy cursor-pointer" 
                                /> 
                                <span className="font-bold text-sm">Yes</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input 
                                  type="radio" 
                                  name="ownTools" 
                                  value="no" 
                                  checked={formData.ownTools === 'no'}
                                  onChange={handleChange}
                                  required 
                                  className="w-5 h-5 accent-brand-navy cursor-pointer" 
                                /> 
                                <span className="font-bold text-sm">No</span>
                            </label>
                         </div>
                      </div>

                      <div className="pt-4">
                        <button 
                          type="submit" 
                          className="w-full bg-brand-navy text-white font-bold py-5 rounded-2xl hover:bg-brand-lime hover:text-brand-navy transition-all duration-500 shadow-xl hover:shadow-lime-glow transform hover:-translate-y-1 text-lg flex items-center justify-center gap-3 group"
                        >
                          Submit Executive Application
                          <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                        </button>
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-[0.15em]">
                           <ShieldCheck size={14} className="text-brand-lime" />
                           Your data is secure and verified
                        </div>
                      </div>
                    </form>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h4 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-10">Our Partners Work with Leading Property Managers</h4>
           <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Using text logos for consistency as per previous instructions */}
              <span className="text-2xl font-bold font-heading">ISLAND ESTATES</span>
              <span className="text-2xl font-bold font-heading">MAINLAND PROPS</span>
              <span className="text-2xl font-bold font-heading">LEKKI LUXURY</span>
              <span className="text-2xl font-bold font-heading">ABUJA REALTORS</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;