import React, { useState, useEffect } from 'react';
import { X, Wrench, Truck, Hammer, CheckCircle, ArrowRight, Star, ChevronLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking, initialService } = useBooking();
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', details: '' });
  const [step, setStep] = useState(1); // 1: Selection, 2: Form, 3: Success

  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
      
      // If modal opened with a specific service, skip step 1
      if (initialService) {
        setSelectedService(initialService);
        setStep(2);
      } else {
        setStep(1);
        setSelectedService('');
      }
      
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
      }
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        setStep(1);
        setFormData({ name: '', phone: '', details: '' });
        setSelectedService('');
      }, 300);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isBookingOpen, initialService]);

  if (!isBookingOpen) return null;

  const playSuccessAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = "Request sent. We will be in touch shortly.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => 
        v.name.includes('Google US English') || 
        v.name.includes('Samantha') || 
        v.name.includes('Microsoft Zira') ||
        v.name.toLowerCase().includes('female')
      );
      
      if (femaleVoice) utterance.voice = femaleVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep(2); // Proceed to form
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessAudio();
    setTimeout(() => setStep(3), 500);
  };

  const getServiceLabel = (id: string) => {
    switch(id) {
      case 'handyman': return 'Handyman Service';
      case 'move-in': return 'Move-In Package';
      case 'renovation': return 'Home Renovation';
      default: return 'Request';
    }
  };

  const getServiceIcon = (id: string, size = 20) => {
    switch(id) {
      case 'handyman': return <Wrench size={size} />;
      case 'move-in': return <Truck size={size} />;
      case 'renovation': return <Hammer size={size} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-navy/95 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeBooking}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:row min-h-[550px] animate-fade-in-up md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={closeBooking}
          className="absolute top-4 right-4 z-[110] p-2 bg-gray-100 hover:bg-brand-lime hover:text-brand-navy rounded-full text-gray-500 transition-all duration-300 shadow-sm"
        >
          <X size={24} />
        </button>

        {/* Left Panel - Brand Presence */}
        <div className="hidden md:flex md:w-2/5 bg-brand-navy p-10 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#adf802_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-lime opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="font-heading text-2xl font-bold mb-2">Handymen<span className="text-brand-lime">.Ng</span></h3>
            <p className="text-brand-lime/80 text-xs font-bold tracking-[0.2em] uppercase">Premium Standards</p>
          </div>

          <div className="relative z-10 space-y-8">
            <h4 className="font-heading text-4xl font-bold leading-tight">
              Quality you can <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-white">depend on.</span>
            </h4>
            
            <ul className="space-y-5 text-sm text-gray-300">
              <li className="flex items-center gap-4">
                <div className="bg-brand-lime/20 p-2 rounded-xl"><CheckCircle size={16} className="text-brand-lime" /></div>
                <span className="font-medium">Verified Professional Network</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-brand-lime/20 p-2 rounded-xl"><CheckCircle size={16} className="text-brand-lime" /></div>
                <span className="font-medium">Upfront Transparent Pricing</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-brand-lime/20 p-2 rounded-xl"><CheckCircle size={16} className="text-brand-lime" /></div>
                <span className="font-medium">100% Satisfaction Guarantee</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-1 text-brand-lime mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Trusted by 2000+ Households</p>
          </div>
        </div>

        {/* Right Panel - Dynamic Content */}
        <div className="w-full md:w-3/5 p-8 md:p-12 bg-white relative flex flex-col justify-center min-h-[500px]">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="animate-fade-in space-y-8">
              <div className="mb-2">
                <h2 className="font-heading text-3xl font-bold text-brand-navy mb-3">How can we help today?</h2>
                <p className="text-gray-500 text-base leading-relaxed">Select the service you need to begin your request.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'handyman', icon: <Wrench size={28} />, label: 'Handyman Service', desc: 'Plumbing, Electrical, Carpentry & AC' },
                  { id: 'move-in', icon: <Truck size={28} />, label: 'Move-In Packages', desc: 'Full Relocation, Cleaning & Home Setup' },
                  { id: 'renovation', icon: <Hammer size={28} />, label: 'Renovation & Interior', desc: 'Kitchen, Bathroom & Full Remodeling' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleServiceSelect(s.id)}
                    className="flex items-center gap-6 p-6 rounded-2xl border-2 border-gray-100 bg-gray-50 hover:bg-white hover:border-brand-lime hover:shadow-xl transition-all duration-300 text-left group"
                  >
                    <div className="bg-white p-4 rounded-xl shadow-sm text-brand-navy group-hover:bg-brand-navy group-hover:text-brand-lime transition-colors duration-300">
                      {s.icon}
                    </div>
                    <div className="flex-grow">
                      <span className="block font-bold text-lg text-brand-navy group-hover:text-brand-navy">{s.label}</span>
                      <span className="block text-sm text-gray-400">{s.desc}</span>
                    </div>
                    <ArrowRight size={20} className="text-gray-300 group-hover:text-brand-lime transform group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
              
              <p className="text-center text-xs text-gray-400 pt-4 font-medium uppercase tracking-[0.1em]">Instant priority callback for all requests</p>
            </div>
          )}

          {/* STEP 2: FORM ENTRY */}
          {step === 2 && (
            <div className="animate-fade-in flex flex-col h-full">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <button 
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-brand-navy mb-2 transition-colors group"
                  >
                    <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                    CHANGE SERVICE
                  </button>
                  <h2 className="font-heading text-2xl font-bold text-brand-navy flex items-center gap-3">
                    {getServiceIcon(selectedService, 24)}
                    {getServiceLabel(selectedService)}
                  </h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-brand-lime transition-all font-medium text-brand-navy shadow-sm"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="tel" 
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-brand-lime transition-all font-medium text-brand-navy shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <textarea 
                    required
                    placeholder={`Tell us a bit about your ${selectedService === 'handyman' ? 'issue' : 'requirements'}...`}
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full h-32 p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-brand-lime transition-all font-medium text-brand-navy resize-none shadow-sm"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-brand-navy text-white font-bold py-5 rounded-2xl hover:bg-brand-lime hover:text-brand-navy transition-all duration-500 shadow-xl hover:shadow-lime-glow flex items-center justify-center gap-3 group text-lg"
                  >
                    Request Priority Callback
                    <ArrowRight size={22} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-bold">Expect a call within 60-120 minutes</p>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in px-4">
              <div className="w-28 h-28 bg-brand-lime/10 rounded-full flex items-center justify-center mb-8 border border-brand-lime shadow-lime-glow">
                <CheckCircle size={56} className="text-brand-navy" />
              </div>
              <h3 className="font-heading text-4xl font-bold text-brand-navy mb-4">Request Sent!</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-10 text-lg leading-relaxed">
                Thank you, <span className="text-brand-navy font-bold">{formData.name}</span>. An expert has been assigned to your request and will call you at <span className="font-bold text-brand-navy underline">{formData.phone}</span> shortly.
              </p>
              <button 
                onClick={closeBooking}
                className="bg-brand-navy text-white font-bold py-4 px-12 rounded-xl hover:bg-brand-navy/90 transition-all shadow-lg transform hover:-translate-y-0.5"
              >
                Return to Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;