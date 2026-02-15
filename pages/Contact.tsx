import React, { useState } from 'react';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Not Sure',
    description: '',
    dateTime: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessAudio();
    // Simulate API call
    console.log(formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen py-20 relative overflow-hidden bg-brand-light">
      {/* Decorative Background Elements for Glassmorphism Context */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-lime/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-navy/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-navy mb-4">Tell Us What You Need</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">Fill the form below or call us directly. We typically respond within 2 hours.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Form Section - Clean White Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative z-10">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-brand-light rounded-2xl animate-fade-in">
                <div className="w-24 h-24 bg-brand-lime/20 text-brand-navy rounded-full flex items-center justify-center mb-6 border border-brand-lime">
                  <span className="text-4xl font-bold">✓</span>
                </div>
                <h3 className="text-3xl font-heading font-bold text-brand-navy mb-2">Request Sent!</h3>
                <p className="text-gray-600 text-lg">We have received your details and will call you shortly to confirm.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-brand-navy mb-2 uppercase tracking-wide">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-lime focus:ring-0 outline-none transition duration-300 bg-gray-50 focus:bg-white font-medium"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-brand-navy mb-2 uppercase tracking-wide">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-lime focus:ring-0 outline-none transition duration-300 bg-gray-50 focus:bg-white font-medium"
                      placeholder="080..."
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-brand-navy mb-2 uppercase tracking-wide">Email (Optional)</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-lime focus:ring-0 outline-none transition duration-300 bg-gray-50 focus:bg-white font-medium"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-bold text-brand-navy mb-2 uppercase tracking-wide">Service Type</label>
                  <div className="relative">
                    <select 
                      id="serviceType" 
                      name="serviceType" 
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-lime focus:ring-0 outline-none transition duration-300 bg-gray-50 focus:bg-white font-medium appearance-none"
                      value={formData.serviceType}
                      onChange={handleChange}
                    >
                      <option value="Not Sure">Not Sure</option>
                      <option value="Handyman Service">Handyman Service (Plumbing, Electrical, etc.)</option>
                      <option value="Move-In: Comfort Starter">Move-In: Comfort Starter</option>
                      <option value="Move-In: Executive">Move-In: Executive Arrival</option>
                      <option value="Move-In: Diaspora Edition">Move-In: Diaspora Edition</option>
                      <option value="Move-In: Imperial">Move-In: Imperial Collection</option>
                      <option value="Renovation">Home Renovation</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>
                </div>

                <div>
                   <label htmlFor="description" className="block text-sm font-bold text-brand-navy mb-2 uppercase tracking-wide">Description of Requirements</label>
                   <textarea
                     id="description"
                     name="description"
                     rows={4}
                     className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-lime focus:ring-0 outline-none transition duration-300 bg-gray-50 focus:bg-white font-medium resize-none"
                     placeholder="Please describe the issue or your move-in needs..."
                     value={formData.description}
                     onChange={handleChange}
                   ></textarea>
                </div>

                <div>
                  <label htmlFor="dateTime" className="block text-sm font-bold text-brand-navy mb-2 uppercase tracking-wide">Preferred Contact Time</label>
                  <input 
                    type="text" 
                    id="dateTime" 
                    name="dateTime" 
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-lime focus:ring-0 outline-none transition duration-300 bg-gray-50 focus:bg-white font-medium"
                    placeholder="e.g., Tomorrow morning"
                    value={formData.dateTime}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="w-full bg-brand-navy text-white font-bold py-5 rounded-xl hover:bg-brand-lime hover:text-brand-navy transition-all duration-300 shadow-xl hover:shadow-lime-glow transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2 group">
                  Send Request
                </button>
              </form>
            )}
          </div>

          {/* Contact Info - Glassmorphism Blue Box */}
          <div className="sticky top-28">
             <div className="bg-brand-navy/90 backdrop-blur-xl p-10 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(26,34,57,0.4)] text-white relative overflow-hidden border border-white/10 group">
               
               {/* Glassy Shine & Decor */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40 pointer-events-none"></div>
               <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-lime/20 rounded-full blur-[60px] group-hover:bg-brand-lime/30 transition-all duration-700"></div>
               <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-lime/10 rounded-full blur-[50px]"></div>
               
               <h3 className="font-heading text-2xl font-bold mb-10 border-b border-white/10 pb-6 relative z-10">
                 Contact Information
                 <span className="block h-1.5 w-16 bg-brand-lime mt-6 rounded-full shadow-[0_0_10px_rgba(173,248,2,0.5)]"></span>
               </h3>
               
               <div className="space-y-10 relative z-10">
                 <div className="flex items-center group/item cursor-default">
                    <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mr-6 border border-white/10 group-hover/item:bg-brand-lime group-hover/item:text-brand-navy group-hover/item:border-brand-lime transition-all duration-500 shadow-lg">
                      <Phone className="text-brand-lime group-hover/item:text-brand-navy transition-colors duration-300" size={28} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-semibold">Call Us</p>
                      <p className="text-2xl font-bold text-white group-hover/item:text-brand-lime transition-colors duration-300 font-heading">0811 192 2026</p>
                    </div>
                 </div>

                 <div className="flex items-center group/item cursor-default">
                    <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mr-6 border border-white/10 group-hover/item:bg-brand-lime group-hover/item:text-brand-navy group-hover/item:border-brand-lime transition-all duration-500 shadow-lg">
                      <MessageCircle className="text-brand-lime group-hover/item:text-brand-navy transition-colors duration-300" size={28} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-semibold">WhatsApp</p>
                      <p className="text-2xl font-bold text-white group-hover/item:text-brand-lime transition-colors duration-300 font-heading">0810 844 2042</p>
                    </div>
                 </div>

                 <div className="flex items-center group/item cursor-default">
                    <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mr-6 border border-white/10 group-hover/item:bg-brand-lime group-hover/item:text-brand-navy group-hover/item:border-brand-lime transition-all duration-500 shadow-lg">
                      <MapPin className="text-brand-lime group-hover/item:text-brand-navy transition-colors duration-300" size={28} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-semibold">Main Office</p>
                      <p className="text-xl font-bold text-white group-hover/item:text-brand-lime transition-colors duration-300">Lagos, Nigeria</p>
                    </div>
                 </div>

                 <div className="flex items-center group/item cursor-default">
                    <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mr-6 border border-white/10 group-hover/item:bg-brand-lime group-hover/item:text-brand-navy group-hover/item:border-brand-lime transition-all duration-500 shadow-lg">
                      <Clock className="text-brand-lime group-hover/item:text-brand-navy transition-colors duration-300" size={28} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-semibold">Working Hours</p>
                      <p className="text-xl font-bold text-white group-hover/item:text-brand-lime transition-colors duration-300">Mon - Sun (8am - 6pm)</p>
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;