import React, { useState, useEffect } from 'react';
import { X, Wrench, Truck, Hammer, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking, initialService } = useBooking();
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', details: '' });
  const [step, setStep] = useState(1); // 1: Form, 2: Success

  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
      if (initialService) setSelectedService(initialService);
    } else {
      document.body.style.overflow = 'unset';
      // Reset form after delay
      setTimeout(() => {
        setStep(1);
        setFormData({ name: '', phone: '', details: '' });
        setSelectedService('');
      }, 300);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isBookingOpen, initialService]);

  if (!isBookingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => setStep(2), 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-navy/95 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeBooking}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={closeBooking}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-black/5 rounded-full text-gray-500 hover:text-brand-navy transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left Panel - Visual & Value Props */}
        <div className="hidden md:flex md:w-2/5 bg-brand-navy p-8 md:p-10 text-white flex-col justify-between relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#adf802_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-lime opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="font-heading text-2xl font-bold mb-2">Handymen<span className="text-brand-lime">.Ng</span></h3>
            <p className="text-brand-lime/80 text-sm font-medium tracking-wide uppercase">Premium Home Services</p>
          </div>

          <div className="relative z-10 space-y-6">
            <h4 className="font-heading text-3xl font-bold leading-tight">
              Let's get your home <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-white">sorted out.</span>
            </h4>
            
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <div className="bg-brand-lime/20 p-1 rounded-full"><CheckCircle size={14} className="text-brand-lime" /></div>
                <span>Verified & Background Checked Pros</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-brand-lime/20 p-1 rounded-full"><CheckCircle size={14} className="text-brand-lime" /></div>
                <span>Transparent Quotes, No Hidden Fees</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-brand-lime/20 p-1 rounded-full"><CheckCircle size={14} className="text-brand-lime" /></div>
                <span>Full Money-Back Guarantee</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-1 text-brand-lime mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-xs text-gray-400">"Excellent service. My go-to for everything." - <span className="text-white">Tunde L.</span></p>
          </div>
        </div>

        {/* Right Panel - Interactive Form */}
        <div className="w-full md:w-3/5 p-6 md:p-10 bg-white relative">
          {step === 1 ? (
            <div className="h-full flex flex-col">
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-bold text-brand-navy mb-2">How can we help today?</h2>
                <p className="text-gray-500 text-sm">Select a service and tell us a bit about your needs.</p>
              </div>

              {/* Service Selection */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: 'handyman', icon: <Wrench size={20} />, label: 'Handyman' },
                  { id: 'move-in', icon: <Truck size={20} />, label: 'Move-In' },
                  { id: 'renovation', icon: <Hammer size={20} />, label: 'Renovate' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(s.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedService === s.id 
                        ? 'border-brand-lime bg-brand-lime/5 text-brand-navy shadow-sm' 
                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`mb-2 ${selectedService === s.id ? 'text-brand-lime' : 'text-gray-400'}`}>{s.icon}</div>
                    <span className="text-xs font-bold">{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <input 
                      type="text" 
                      required
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="peer w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl outline-none focus:bg-white focus:border-brand-navy/10 transition-all font-medium text-brand-navy"
                    />
                    <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-brand-navy peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 pointer-events-none">Your Name</label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="tel" 
                      required
                      placeholder=" "
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="peer w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl outline-none focus:bg-white focus:border-brand-navy/10 transition-all font-medium text-brand-navy"
                    />
                     <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-brand-navy peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 pointer-events-none">Phone Number</label>
                  </div>
                </div>
                
                <div className="relative group flex-grow">
                  <textarea 
                    required
                    placeholder=" "
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="peer w-full h-full min-h-[100px] p-4 bg-gray-50 border-2 border-transparent rounded-xl outline-none focus:bg-white focus:border-brand-navy/10 transition-all font-medium text-brand-navy resize-none"
                  ></textarea>
                   <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-brand-navy peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 pointer-events-none">Describe your request...</label>
                </div>

                <button 
                  type="submit" 
                  className="mt-2 w-full bg-brand-navy text-white font-bold py-4 rounded-xl hover:bg-brand-lime hover:text-brand-navy transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
                >
                  Get Priority Callback
                  <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-24 h-24 bg-brand-lime/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} className="text-brand-lime" />
              </div>
              <h3 className="font-heading text-3xl font-bold text-brand-navy mb-3">Request Received!</h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-8 leading-relaxed">
                Thanks, {formData.name}. We've got your details. One of our experts will call you at <span className="font-bold text-brand-navy">{formData.phone}</span> within 2 hours.
              </p>
              <button 
                onClick={closeBooking}
                className="bg-gray-100 text-brand-navy font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
