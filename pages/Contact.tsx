import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MapPin, Clock, MessageCircle, Wrench, Truck, Hammer, CheckCircle, ChevronRight, Check, Mail, Loader2 } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

// Audio Processing Helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const Contact: React.FC = () => {
  const locationState = useLocation();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    isWhatsApp: true,
    email: '',
    serviceType: 'Request Details',
    description: '',
    dateTime: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Auto-populate based on navigation state
  useEffect(() => {
    const state = locationState.state as { service?: string };
    if (state?.service) {
      handleServiceSelect(state.service);
    } else {
      handleServiceSelect('Handyman Service');
    }
  }, [locationState.state]);

  const getProfessionalSentence = (serviceId: string) => {
    switch (serviceId) {
      case 'Handyman Service':
        return "I require the expertise of a professional handyman to address several maintenance and repair requirements within my residence.";
      case 'Move-In: Executive':
        return "I am interested in securing your executive move-in package to facilitate a seamless and premium transition into my new home.";
      case 'Renovation':
        return "I would like to discuss a comprehensive renovation plan to modernize and enhance the aesthetic and functional value of my property.";
      default:
        return "I would like to request a professional consultation regarding home services for my property.";
    }
  };

  const playSuccessVoice = async () => {
    try {
      setIsPlayingAudio(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: 'Say with a warm, premium voice: Request sent, we would get to you shortly.' }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const decodedBytes = decode(base64Audio);
        const audioBuffer = await decodeAudioData(decodedBytes, audioContext, 24000, 1);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
        source.onended = () => setIsPlayingAudio(false);
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsPlayingAudio(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({ 
      ...prev, 
      serviceType: service,
      description: getProfessionalSentence(service)
    }));
    if (window.innerWidth < 768 && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    playSuccessVoice();
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        location: '',
        isWhatsApp: true,
        email: '',
        serviceType: 'Handyman Service',
        description: getProfessionalSentence('Handyman Service'),
        dateTime: ''
      });
    }, 8000);
  };

  const serviceCards = [
    { id: 'Handyman Service', label: 'Handyman', icon: <Wrench size={24} />, desc: 'Fixes & Repairs' },
    { id: 'Move-In: Executive', label: 'Move-In', icon: <Truck size={24} />, desc: 'Home Setup' },
    { id: 'Renovation', label: 'Renovation', icon: <Hammer size={24} />, desc: 'Remodeling' }
  ];

  return (
    <div className="min-h-screen py-16 relative overflow-hidden bg-brand-light">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lime/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-brand-navy mb-3 tracking-tight">Quick Request</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base font-light">
            Need a pro? Fill the form below. <span className="text-brand-navy font-semibold">Fast response guaranteed.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {serviceCards.map((card) => (
            <button
              key={card.id}
              type="button"
              disabled={isSubmitting}
              onClick={() => handleServiceSelect(card.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-500 group relative ${
                formData.serviceType === card.id 
                ? 'bg-brand-navy border-brand-lime shadow-lg scale-[1.03] z-20' 
                : 'bg-white border-gray-100 hover:border-brand-lime/40 z-10'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                formData.serviceType === card.id ? 'bg-brand-lime text-brand-navy' : 'bg-brand-light text-brand-navy'
              }`}>
                {card.icon}
              </div>
              <div className="text-left">
                <h3 className={`font-bold text-sm transition-colors ${formData.serviceType === card.id ? 'text-white' : 'text-brand-navy'}`}>{card.label}</h3>
                <p className={`text-[10px] uppercase tracking-wider ${formData.serviceType === card.id ? 'text-brand-lime/70' : 'text-gray-400'}`}>{card.desc}</p>
              </div>
              {formData.serviceType === card.id && <CheckCircle size={18} className="ml-auto text-brand-lime" />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          <div ref={formRef} className="lg:col-span-7 bg-white rounded-[2rem] shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                <div className={`w-24 h-24 bg-brand-lime/10 text-brand-navy rounded-full flex items-center justify-center mb-6 border border-brand-lime transition-all duration-500 ${isPlayingAudio ? 'scale-110 shadow-lime-glow ring-4 ring-brand-lime/20' : 'scale-100'}`}>
                  <CheckCircle size={40} className={isPlayingAudio ? 'animate-pulse text-brand-navy' : 'text-brand-navy'} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-brand-navy mb-2">Request Logged!</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">One of our experts will call you within 60 minutes.</p>
              </div>
            ) : isSubmitting ? (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                <Loader2 size={48} className="text-brand-lime animate-spin mb-6" />
                <h3 className="text-2xl font-heading font-bold text-brand-navy mb-2">Submitting Request...</h3>
                <p className="text-gray-500 text-sm">Please wait while we log your service details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-bold text-brand-navy mb-2 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-50 focus:border-brand-lime outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                      placeholder="e.g. Samuel Okoro"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold text-brand-navy mb-2 uppercase tracking-widest">Email Address (Optional)</label>
                    <div className="relative group">
                      <div className="absolute left-0 inset-y-0 w-12 flex items-center justify-center border-r border-gray-200 text-gray-400 group-focus-within:text-brand-lime transition-colors">
                        <Mail size={18} />
                      </div>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="w-full px-5 py-3.5 pl-14 rounded-xl border-2 border-gray-50 focus:border-brand-lime outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                        placeholder="e.g. hello@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-bold text-brand-navy mb-2 uppercase tracking-widest">Phone Number</label>
                    <div className="relative group space-y-3">
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required
                        className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-50 focus:border-brand-lime outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                        placeholder="0811 000 0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <label className="flex items-center gap-3 cursor-pointer group bg-brand-light p-3 rounded-xl border border-gray-100 transition-colors hover:bg-brand-light">
                        <input 
                          type="checkbox" 
                          name="isWhatsApp"
                          checked={formData.isWhatsApp}
                          onChange={handleChange}
                          className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-lime cursor-pointer accent-brand-navy"
                        />
                        <div className="flex items-center gap-2">
                          <MessageCircle size={14} className={formData.isWhatsApp ? 'text-green-500' : 'text-gray-400'} />
                          <span className="text-[10px] font-bold text-brand-navy uppercase tracking-tight">On WhatsApp?</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="location" className="block text-[10px] font-bold text-brand-navy mb-2 uppercase tracking-widest">Service Location</label>
                      <div className="relative group">
                        <div className="absolute left-0 inset-y-0 w-12 flex items-center justify-center border-r border-gray-200 text-gray-400 group-focus-within:text-brand-lime transition-colors">
                          <MapPin size={18} />
                        </div>
                        <input 
                          type="text" 
                          id="location" 
                          name="location" 
                          required
                          className="w-full px-5 py-3.5 pl-14 rounded-xl border-2 border-gray-50 focus:border-brand-lime outline-none transition-all bg-gray-50 focus:bg-white text-sm font-medium"
                          placeholder="e.g. Victoria Island, Lagos"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                   <label htmlFor="description" className="block text-[10px] font-bold text-brand-navy mb-2 uppercase tracking-widest">{formData.serviceType}</label>
                   <textarea
                     id="description"
                     name="description"
                     rows={3}
                     className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-50 focus:border-brand-lime outline-none transition-all bg-gray-50 focus:bg-white text-sm resize-none"
                     placeholder="Tell us what needs fixing..."
                     value={formData.description}
                     onChange={handleChange}
                   ></textarea>
                </div>

                <div className="flex justify-center md:justify-start">
                  <button type="submit" className="px-8 py-3.5 bg-brand-navy text-white font-bold rounded-xl hover:bg-brand-lime hover:text-brand-navy transition-all duration-500 shadow-xl flex items-center justify-center gap-2 group text-sm transform hover:-translate-y-1">
                    Send Request
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
             <div className="bg-brand-navy p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden group border border-white/5">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-lime/10 rounded-full blur-3xl group-hover:bg-brand-lime/20 transition-all duration-700"></div>
               
               <h3 className="font-heading text-xl font-bold mb-8 flex items-center gap-3">
                 Connect faster
                 <div className="flex-grow h-px bg-white/10"></div>
               </h3>
               
               <div className="space-y-8">
                 <div className="flex items-center group/item cursor-pointer">
                    <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center mr-4 border border-white/5 group-hover/item:bg-brand-lime transition-all duration-500">
                      <Phone className="text-brand-lime group-hover/item:text-brand-navy" size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-0.5 font-bold">Call Line</p>
                      <p className="text-lg font-bold text-white group-hover/item:text-brand-lime transition-colors">0811 192 2026</p>
                    </div>
                 </div>

                 <div className="flex items-center group/item cursor-pointer">
                    <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center mr-4 border border-white/5 group-hover/item:bg-brand-lime transition-all duration-500">
                      <MessageCircle className="text-brand-lime group-hover/item:text-brand-navy" size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-0.5 font-bold">WhatsApp Business</p>
                      <p className="text-lg font-bold text-white group-hover/item:text-brand-lime transition-colors">0810 844 2042</p>
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