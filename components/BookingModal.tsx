import React, { useState, useEffect } from 'react';
import { X, Wrench, Truck, Hammer, CheckCircle, ArrowRight, Star, MessageCircle, MapPin, Mail } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
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

const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking, initialService, initialDetails } = useBooking();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', location: '', details: '', service: '', isWhatsApp: true });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const getProfessionalSentence = (serviceId: string) => {
    switch (serviceId) {
      case 'handyman':
        return "I require the expertise of a professional handyman to address several maintenance and repair requirements within my residence.";
      case 'move-in':
        return "I am interested in securing your executive move-in package to facilitate a seamless and premium transition into my new home.";
      case 'renovation':
        return "I would like to discuss a comprehensive renovation plan to modernize and enhance the aesthetic and functional value of my property.";
      case 'emergency':
        return "I have an urgent repair requirement that needs immediate professional attention. Please contact me as soon as possible.";
      default:
        return "I am interested in learning more about your professional home services.";
    }
  };

  const getServiceLabel = (serviceId: string) => {
    switch (serviceId) {
      case 'handyman': return "Handyman Service";
      case 'move-in': return "Move-In Package";
      case 'renovation': return "Home Renovation";
      case 'emergency': return "Emergency Repair";
      default: return "Service Request";
    }
  };

  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
      const service = initialService || 'handyman';
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        service: service,
        details: initialDetails || getProfessionalSentence(service),
        isWhatsApp: true
      });
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setIsSuccess(false), 300);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isBookingOpen, initialService, initialDetails]);

  if (!isBookingOpen) return null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    playSuccessVoice();
  };

  const handleServiceChange = (service: string) => {
    setFormData({
      ...formData,
      service: service,
      details: getProfessionalSentence(service)
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-brand-navy/95 backdrop-blur-sm" onClick={closeBooking}></div>

      <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[550px] animate-fade-in-up border border-white/10">
        
        <button 
          onClick={closeBooking}
          className="absolute top-6 right-6 z-[110] p-3 bg-gray-50 hover:bg-brand-lime hover:text-brand-navy rounded-full text-gray-400 transition-all shadow-md group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Left Brand Panel */}
        <div className="hidden md:flex md:w-2/5 bg-brand-navy p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#adf802_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-lime/10 rounded-full blur-[60px]"></div>
          
          <div className="relative z-10">
            <h3 className="font-heading text-2xl font-bold mb-2">Handymen<span className="text-brand-lime">.Ng</span></h3>
            <p className="text-brand-lime/80 text-[10px] font-bold tracking-[0.3em] uppercase">Premium Standards</p>
          </div>

          <div className="relative z-10 space-y-8">
            <h4 className="font-heading text-4xl font-bold leading-tight">
              Quality you <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-white">can trust.</span>
            </h4>
            
            <ul className="space-y-6 text-sm text-gray-400 font-medium">
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-lime/20 group-hover:border-brand-lime transition-all">
                  <CheckCircle size={16} className="text-brand-lime" />
                </div>
                <span>Verified Professionals</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-lime/20 group-hover:border-brand-lime transition-all">
                  <CheckCircle size={16} className="text-brand-lime" />
                </div>
                <span>Fixed Response Times</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-lime/20 group-hover:border-brand-lime transition-all">
                  <CheckCircle size={16} className="text-brand-lime" />
                </div>
                <span>Service Guarantee</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-1 text-brand-lime mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Nigeria's Premier Service Platform</p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-3/5 p-8 md:p-12 bg-white relative flex flex-col justify-center">
          {isSuccess ? (
            <div className="text-center animate-fade-in">
              <div className={`w-24 h-24 bg-brand-lime/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-lime transition-all duration-500 ${isPlayingAudio ? 'scale-110 shadow-lime-glow ring-4 ring-brand-lime/20' : 'scale-100'}`}>
                <CheckCircle size={40} className={`text-brand-navy ${isPlayingAudio ? 'animate-pulse' : ''}`} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-brand-navy mb-2">Request Logged</h3>
              <p className="text-gray-500 mb-8 text-sm max-w-sm mx-auto">
                Our concierge team is already reviewing your request.
              </p>
              <button 
                onClick={closeBooking}
                className="bg-brand-navy text-white font-bold py-4 px-10 rounded-xl hover:bg-brand-lime hover:text-brand-navy transition-all shadow-lg"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-bold text-brand-navy mb-1 uppercase tracking-tight">{getServiceLabel(formData.service)}</h2>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Rapid callback guaranteed.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <select 
                    value={formData.service}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="w-full p-4 bg-gray-50 border-2 border-gray-50 rounded-xl outline-none focus:border-brand-lime transition-all font-bold text-brand-navy appearance-none text-sm"
                  >
                    <option value="handyman">Handyman Service</option>
                    <option value="move-in">Move-In Package</option>
                    <option value="renovation">Home Renovation</option>
                    <option value="emergency">Emergency Repair</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-50 rounded-xl outline-none focus:border-brand-lime transition-all text-sm font-medium"
                    />
                    <div className="relative group">
                      <div className="absolute left-0 inset-y-0 w-10 flex items-center justify-center border-r border-gray-200 text-gray-400 group-focus-within:text-brand-lime transition-colors">
                        <Mail size={16} />
                      </div>
                      <input 
                        type="email" 
                        placeholder="Email (Optional)"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-4 pl-12 bg-gray-50 border-2 border-gray-50 rounded-xl outline-none focus:border-brand-lime transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <input 
                        type="tel" 
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-4 bg-gray-50 border-2 border-gray-50 rounded-xl outline-none focus:border-brand-lime transition-all text-sm font-medium"
                      />
                      <label className="flex items-center gap-3 cursor-pointer group bg-brand-light/50 p-3 rounded-xl border border-gray-100 transition-colors hover:bg-brand-light">
                        <input 
                          type="checkbox" 
                          checked={formData.isWhatsApp}
                          onChange={(e) => setFormData({...formData, isWhatsApp: e.target.checked})}
                          className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-lime cursor-pointer accent-brand-navy"
                        />
                        <div className="flex items-center gap-2">
                          <MessageCircle size={14} className={formData.isWhatsApp ? 'text-green-500' : 'text-gray-400'} />
                          <span className="text-[10px] font-bold text-brand-navy uppercase tracking-tight">On WhatsApp?</span>
                        </div>
                      </label>
                    </div>

                    <div className="relative group">
                      <div className="absolute left-0 inset-y-0 w-10 flex items-center justify-center border-r border-gray-200 text-gray-400 group-focus-within:text-brand-lime transition-colors">
                        <MapPin size={16} />
                      </div>
                      <input 
                        type="text" 
                        required
                        placeholder="Location (e.g. Lekki)"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full p-4 pl-12 bg-gray-50 border-2 border-gray-50 rounded-xl outline-none focus:border-brand-lime transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-brand-navy uppercase tracking-widest px-1">{getServiceLabel(formData.service)} Details</label>
                  <textarea 
                    required
                    placeholder="Details of your request..."
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full h-24 p-4 bg-gray-50 border-2 border-gray-50 rounded-xl outline-none focus:border-brand-lime transition-all text-sm font-medium resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full md:w-auto px-10 py-4 bg-brand-navy text-white font-bold rounded-xl hover:bg-brand-lime hover:text-brand-navy transition-all shadow-lg flex items-center justify-center gap-2 group text-base"
                  >
                    Send Request
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;