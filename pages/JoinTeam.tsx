import React, { useState, useEffect } from 'react';
import { Check, ShieldCheck, Award, TrendingUp, Users, ArrowRight, Star, Youtube, Instagram, Facebook, Mail, Loader2 } from 'lucide-react';
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

const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SnapchatIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 3c-1.2 0-2.4.6-3.1 1.6C7.5 5.8 7.3 7 7.3 8.2c0 .6.1 1.2.2 1.8-1.5.4-2.5 1.4-2.5 2.5 0 .8.5 1.5 1.4 2 .1.1.2.1.2.2 0 .2-.4.6-.4 1.1 0 .6.5.9 1 .9.3 0 .5-.1.8-.3 1 1 2.3 1.6 4 1.6s3-.6 4-1.6c.3.2.5.3.8.3.5 0 1-.3 1-.9 0-.5-.4-.9-.4-1.1 0-.1.1-.1.2-.2.9-.5 1.4-1.2 1.4-2 0-1.1-1-2.1-2.5-2.5.1-.6.2-1.2.2-1.8 0-1.2-.2-2.4-1.6-3.6C14.4 3.6 13.2 3 12 3z" />
  </svg>
);

const JoinTeam: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    trade: '',
    otherTrade: '',
    ownTools: '',
    area: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1800));
    setIsSubmitting(false);
    setIsSubmitted(true);
    playSuccessVoice();
  };

  return (
    <div className="bg-brand-light min-h-screen">
      <div className="relative bg-brand-navy h-[550px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop" 
            alt="Professional craftsmanship" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-transparent"></div>
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

      <div className="max-w-7xl mx-auto px-4 py-20 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
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
                    <p className="text-gray-400 text-sm leading-relaxed">Access to premium clients in Lagos' most exclusive neighborhoods.</p>
                  </div>
                </div>
                <div className="flex gap-6 group/item">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-brand-lime/50 transition-colors">
                    <Award className="text-brand-lime" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Instant Payouts</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Get paid immediately upon successful job completion and verification.</p>
                  </div>
                </div>
                <div className="flex gap-6 group/item">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-brand-lime/50 transition-colors">
                    <Users className="text-brand-lime" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Professional Branding</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Leverage our reputation. We handle the marketing and customer support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
               {isSubmitted ? (
                  <div className="py-20 text-center animate-fade-in">
                    <div className={`w-24 h-24 bg-brand-lime/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-lime shadow-lime-glow transition-all duration-500 ${isPlayingAudio ? 'ring-4 ring-brand-lime/20 scale-110' : 'scale-100'}`}>
                      <Check size={48} className={`text-brand-navy ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                    </div>
                    <h3 className="font-heading text-4xl font-bold text-brand-navy mb-4">Application Received</h3>
                    <p className="text-gray-500 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                      Thank you for your interest. Our verification committee will contact you within 48 business hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-brand-navy font-bold hover:text-brand-lime transition-colors underline flex items-center gap-2 mx-auto"
                    >
                      Update Details <ArrowRight size={16} />
                    </button>
                  </div>
                ) : isSubmitting ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center animate-fade-in">
                    <Loader2 size={64} className="text-brand-lime animate-spin mb-6" />
                    <h3 className="text-2xl font-heading font-bold text-brand-navy mb-2">Processing Partnership...</h3>
                    <p className="text-gray-500 text-sm">Reviewing your credentials against our standard</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-10">
                      <h3 className="font-heading text-3xl font-bold text-brand-navy mb-2">Join the Elite</h3>
                      <p className="text-gray-500">Please provide accurate details for our verification process.</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-brand-navy uppercase tracking-widest mb-2 ml-1">Full Name</label>
                          <input type="text" name="fullName" required placeholder="e.g. Samuel Okoro" value={formData.fullName} onChange={handleChange} className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-brand-lime outline-none bg-gray-50/50" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-brand-navy uppercase tracking-widest mb-2 ml-1">Email Address</label>
                          <div className="relative group">
                            <div className="absolute left-0 inset-y-0 w-12 flex items-center justify-center border-r border-gray-200 text-gray-400 group-focus-within:text-brand-lime transition-colors">
                              <Mail size={18} />
                            </div>
                            <input type="email" name="email" placeholder="e.g. sam@example.com" value={formData.email} onChange={handleChange} className="w-full p-4 pl-14 border-2 border-gray-100 rounded-2xl focus:border-brand-lime outline-none bg-gray-50/50" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-brand-navy uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                          <input type="tel" name="phone" required placeholder="080 0000 0000" value={formData.phone} onChange={handleChange} className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-brand-lime outline-none bg-gray-50/50" />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-brand-navy uppercase tracking-widest mb-2 ml-1">Operational Area</label>
                           <input type="text" name="area" required placeholder="e.g. Victoria Island, Ikeja" value={formData.area} onChange={handleChange} className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-brand-lime outline-none bg-gray-50/50" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-brand-navy uppercase tracking-widest mb-2 ml-1">Core Expertise</label>
                          <select name="trade" className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-brand-lime outline-none bg-gray-50/50 appearance-none" onChange={handleChange} value={formData.trade} required>
                            <option value="">Select Your Trade</option>
                            <option value="Plumber">Plumbing Specialist</option>
                            <option value="Electrician">Electrical Engineering</option>
                            <option value="Carpenter">Fine Carpentry</option>
                            <option value="Painter">Professional Painting</option>
                            <option value="AC Technician">HVAC/AC Maintenance</option>
                            <option value="Cleaner">Premium Deep Cleaning</option>
                            <option value="Other">Other Specialty</option>
                          </select>
                        </div>
                        <div className="p-6 bg-brand-light rounded-2xl border border-gray-100 flex items-center justify-between gap-4 h-full">
                           <span className="text-brand-navy font-bold text-xs uppercase tracking-wider">Own tools?</span>
                           <div className="flex gap-4">
                              <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="ownTools" value="yes" checked={formData.ownTools === 'yes'} onChange={handleChange} required className="w-5 h-5 accent-brand-navy" /> <span className="font-bold text-sm">Yes</span></label>
                              <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="ownTools" value="no" checked={formData.ownTools === 'no'} onChange={handleChange} required className="w-5 h-5 accent-brand-navy" /> <span className="font-bold text-sm">No</span></label>
                           </div>
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-brand-navy text-white font-bold py-5 rounded-2xl hover:bg-brand-lime hover:text-brand-navy transition-all duration-500 shadow-xl hover:shadow-lime-glow text-lg flex items-center justify-center gap-3 group">
                        Submit Executive Application <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;