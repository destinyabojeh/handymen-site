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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log(formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-brand-light min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl font-bold text-brand-navy mb-4">Tell Us What You Need</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Fill the form below or call us directly. We typically respond within 2 hours.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-brand-light rounded-lg">
                <div className="w-20 h-20 bg-brand-lime/20 text-brand-navy rounded-full flex items-center justify-center mb-6 border border-brand-lime">
                  <span className="text-4xl font-bold">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-2">Request Sent!</h3>
                <p className="text-gray-600">We have received your details and will call you shortly to confirm.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-brand-navy mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-lime focus:border-transparent outline-none transition duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-brand-navy mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-lime focus:border-transparent outline-none transition duration-300 bg-gray-50 focus:bg-white"
                      placeholder="080..."
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-brand-navy mb-2">Email (Optional)</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-lime focus:border-transparent outline-none transition duration-300 bg-gray-50 focus:bg-white"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-bold text-brand-navy mb-2">Service Type</label>
                  <select 
                    id="serviceType" 
                    name="serviceType" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-lime focus:border-transparent outline-none transition duration-300 bg-gray-50 focus:bg-white"
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
                </div>

                <div>
                   <label htmlFor="description" className="block text-sm font-bold text-brand-navy mb-2">Description of Requirements</label>
                   <textarea
                     id="description"
                     name="description"
                     rows={4}
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-lime focus:border-transparent outline-none transition duration-300 bg-gray-50 focus:bg-white"
                     placeholder="Please describe the issue or your move-in needs..."
                     value={formData.description}
                     onChange={handleChange}
                   ></textarea>
                </div>

                <div>
                  <label htmlFor="dateTime" className="block text-sm font-bold text-brand-navy mb-2">Preferred Contact Time (Optional)</label>
                  <input 
                    type="text" 
                    id="dateTime" 
                    name="dateTime" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-lime focus:border-transparent outline-none transition duration-300 bg-gray-50 focus:bg-white"
                    placeholder="e.g., Tomorrow morning"
                    value={formData.dateTime}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="w-full bg-brand-lime text-brand-navy font-bold py-4 rounded-lg hover:bg-brand-limeHover transition-all duration-300 shadow-md hover:shadow-lime-glow transform hover:-translate-y-1 text-lg">
                  Send Request
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="flex flex-col gap-8">
             <div className="bg-brand-navy p-10 rounded-xl shadow-xl text-white relative overflow-hidden">
               {/* Decorative Circle */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-lime opacity-10 rounded-full"></div>
               
               <h3 className="font-heading text-xl font-bold mb-8 border-b border-brand-lime/20 pb-4">Contact Information</h3>
               <div className="space-y-8">
                 <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-5 border border-white/10">
                      <Phone className="text-brand-lime" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Call Us</p>
                      <p className="text-xl font-bold text-white">0801 234 5678</p>
                    </div>
                 </div>
                 <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-5 border border-white/10">
                      <MessageCircle className="text-brand-lime" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">WhatsApp</p>
                      <p className="text-xl font-bold text-white">0801 234 5678</p>
                    </div>
                 </div>
                 <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-5 border border-white/10">
                      <MapPin className="text-brand-lime" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Main Office</p>
                      <p className="text-white">Lagos, Nigeria</p>
                    </div>
                 </div>
                 <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-5 border border-white/10">
                      <Clock className="text-brand-lime" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Working Hours</p>
                      <p className="text-white">Mon - Sun</p>
                    </div>
                 </div>
               </div>
             </div>

             {/* Map Placeholder */}
             <div className="bg-gray-200 rounded-xl h-64 w-full flex items-center justify-center overflow-hidden relative shadow-lg border-2 border-white">
               <img src="https://images.unsplash.com/photo-1577086664693-894553052526?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-70 hover:opacity-100 transition-opacity duration-300" alt="Map Placeholder" />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-brand-navy/90 text-white px-5 py-2 rounded shadow-lg text-sm font-bold border border-brand-lime/50">Serving Lagos & Abuja</div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;