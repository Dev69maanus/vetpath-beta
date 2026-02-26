
import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  ArrowLeft, 
  ChevronDown, 
  ShieldCheck, 
  Phone, 
  Mail, 
  AlertCircle, 
  CheckCircle2,
  X,
  ArrowRight,
  Shield,
  Star,
  Users
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole) => void;
}

type LoginStep = 'welcome' | 'role' | 'phone' | 'otp' | 'verifying';

interface CountryCode {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

const COUNTRIES: CountryCode[] = [
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'UK', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Germany' },
];

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<LoginStep>('welcome');
  const [role, setRole] = useState<UserRole>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRIES[0]);
  const [showCountryList, setShowCountryList] = useState(false);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);

  // Intelligent detection logic for country codes
  useEffect(() => {
    if (phoneNumber.startsWith('+')) {
      const prefix = phoneNumber.split(' ')[0];
      const detected = COUNTRIES.find(c => prefix === c.dial);
      if (detected && detected.code !== selectedCountry.code) {
        setSelectedCountry(detected);
      }
    }
  }, [phoneNumber, selectedCountry]);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('phone');
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('verifying');
    setTimeout(() => {
      onLoginSuccess(role);
    }, 1500);
  };

  const selectCountry = (c: CountryCode) => {
    setSelectedCountry(c);
    if (!phoneNumber || !phoneNumber.startsWith('+')) {
      setPhoneNumber(c.dial + ' ');
    } else {
      const parts = phoneNumber.split(' ');
      parts[0] = c.dial;
      setPhoneNumber(parts.join(' '));
    }
    setShowCountryList(false);
  };

  const CharacterIcon = ({ type }: { type: 'veteran' | 'teacher' }) => (
    <div className="w-32 h-32 mb-6 relative">
      <div className="absolute inset-0 bg-slate-100 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
      {type === 'veteran' ? (
        <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full text-slate-700 transform group-hover:-translate-y-2 transition-transform duration-500">
           <rect x="35" y="20" width="30" height="30" rx="15" fill="currentColor" />
           <rect x="25" y="55" width="50" height="40" rx="10" fill="#6366f1" />
           <rect x="35" y="55" width="10" height="40" fill="#4f46e5" />
           <circle cx="42" cy="30" r="2" fill="white" />
           <circle cx="58" cy="30" r="2" fill="white" />
        </svg>
      ) : (
        <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full text-slate-700 transform group-hover:-translate-y-2 transition-transform duration-500">
           <rect x="35" y="20" width="30" height="30" rx="15" fill="currentColor" />
           <rect x="25" y="55" width="50" height="40" rx="10" fill="#10b981" />
           <rect x="70" y="65" width="15" height="20" rx="2" fill="#9333ea" />
           <circle cx="42" cy="30" r="2" fill="white" />
           <circle cx="58" cy="30" r="2" fill="white" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        
        {/* STEP 1: WELCOME SCREEN */}
        {step === 'welcome' && (
          <div className="text-center space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-blue-600 p-4 rounded-3xl shadow-2xl shadow-blue-500/20 mb-4 animate-bounce">
                <GraduationCap className="text-white" size={48} />
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight">
                VetPath <span className="text-blue-500">Academy</span>
              </h1>
              <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                The premier transition platform for those who served. Translate your skills, find your purpose.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
              <button 
                onClick={() => setStep('role')}
                className="group relative bg-white text-slate-950 px-10 py-5 rounded-[2rem] font-black text-xl flex items-center gap-3 hover:bg-blue-50 transition-all shadow-xl hover:shadow-white/10 active:scale-95"
              >
                Start Your Journey
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex items-center gap-4 text-slate-500 font-bold text-sm">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/vet${i}/100/100`} alt="user" />
                    </div>
                  ))}
                </div>
                <span>Joined by 5,000+ Veterans</span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-12">
              {[
                { label: 'Skill Translator', icon: Shield },
                { label: 'Resume AI', icon: CheckCircle2 },
                { label: 'Job Matching', icon: Star },
                { label: 'Community', icon: Users },
              ].map((f, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <f.icon className="text-blue-500 mx-auto mb-2" size={20} />
                  <p className="text-white text-xs font-bold uppercase tracking-wider">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: ROLE SELECTION */}
        {step === 'role' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Choose Your Path</h2>
              <p className="text-slate-400 font-medium">Select how you'll interact with the VetPath community.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button 
                onClick={() => handleRoleSelect('veteran')}
                className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2"
              >
                <CharacterIcon type="veteran" />
                <h2 className="text-3xl font-black text-slate-900 mb-2">I am a Veteran</h2>
                <p className="text-slate-400 text-base mb-8 text-center leading-relaxed">Translate my MOS, polish my resume, and connect with peer mentors.</p>
                <div className="w-full py-5 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white rounded-2xl font-bold text-slate-600 text-lg transition-all shadow-inner">
                  Select Veteran
                </div>
              </button>

              <button 
                onClick={() => handleRoleSelect('teacher')}
                className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-500 transition-all duration-500 transform hover:-translate-y-2"
              >
                <CharacterIcon type="teacher" />
                <h2 className="text-3xl font-black text-slate-900 mb-2">I am a Teacher</h2>
                <p className="text-slate-400 text-base mb-8 text-center leading-relaxed">Share my industry expertise and guide veterans through their education.</p>
                <div className="w-full py-5 bg-slate-50 group-hover:bg-emerald-600 group-hover:text-white rounded-2xl font-bold text-slate-600 text-lg transition-all shadow-inner">
                  Select Instructor
                </div>
              </button>
            </div>

            <button 
              onClick={() => setStep('welcome')}
              className="mx-auto block text-slate-500 hover:text-white font-bold transition-colors"
            >
              Back to main
            </button>
          </div>
        )}

        {/* STEP 3 & 4: PHONE & OTP (Wrapped in a unified card style) */}
        {(step === 'phone' || step === 'otp' || step === 'verifying') && (
          <div className="max-w-md mx-auto bg-white p-12 rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-slate-100 animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-emerald-500"></div>
            
            <button 
              onClick={() => setStep('role')}
              className="mb-10 flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-sm"
            >
              <ArrowLeft size={18} />
              Back to roles
            </button>

            {step === 'phone' && (
              <form onSubmit={handlePhoneSubmit} className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 capitalize leading-tight">Identify Yourself</h2>
                  <p className="text-slate-500 font-medium">Verify your {role} status via SMS</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex bg-slate-50 border-2 border-slate-200 rounded-3xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-600 transition-all duration-300">
                      <button 
                        type="button"
                        onClick={() => setShowCountryList(!showCountryList)}
                        className="flex items-center gap-2 px-5 py-5 bg-slate-100/50 border-r-2 border-slate-200 hover:bg-slate-200 transition-colors shrink-0"
                      >
                        <span className="text-2xl">{selectedCountry.flag}</span>
                        <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 ${showCountryList ? 'rotate-180' : ''}`} />
                      </button>
                      <input 
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Mobile Number"
                        className="w-full px-6 py-5 bg-transparent outline-none font-black text-xl text-slate-800 placeholder:text-slate-300 placeholder:font-bold"
                        required
                        autoFocus
                      />
                    </div>

                    {showCountryList && (
                      <div className="absolute left-0 top-full mt-3 w-full max-h-72 overflow-y-auto bg-white border-2 border-slate-100 rounded-[2rem] shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                        {COUNTRIES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => selectCountry(c)}
                            className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-2xl">{c.flag}</span>
                              <span className="text-base font-bold text-slate-800">{c.name}</span>
                            </div>
                            <span className="text-sm font-black text-slate-400 tracking-wider">{c.dial}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  className={`w-full py-5 rounded-[2rem] font-black text-white text-xl shadow-2xl shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95 ${
                    role === 'teacher' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Send OTP Code
                </button>
              </form>
            )}

            {step === 'otp' && (
              <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-2 animate-pulse">
                    <ShieldCheck size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Enter Secret</h2>
                  <p className="text-slate-500 font-medium">Verify the code sent to {phoneNumber}</p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-8">
                  <input 
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="000 000"
                    className="w-full px-4 py-8 bg-slate-50 border-2 border-slate-200 rounded-[2.5rem] text-center text-4xl font-black tracking-[0.4em] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all placeholder:text-slate-200"
                    required
                    autoFocus
                  />
                  <button 
                    type="submit"
                    disabled={otp.length !== 6}
                    className="w-full bg-slate-900 text-white py-5 rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-slate-800 disabled:opacity-50 transition-all active:scale-95"
                  >
                    Authorize Access
                  </button>
                </form>

                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <div className="flex items-start gap-4 mb-5">
                    <AlertCircle className="text-amber-500 shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-base font-black text-slate-800">Delayed Message?</p>
                      <p className="text-sm text-slate-500 mt-1 font-medium leading-relaxed">It happens occasionally. Let's get you in through a different path if needed.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowTroubleshoot(true)}
                    className="w-full py-4 border-2 border-blue-100 text-blue-600 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all"
                  >
                    View Secure Solutions
                  </button>
                </div>
              </div>
            )}

            {step === 'verifying' && (
              <div className="py-24 text-center space-y-8 animate-in zoom-in-50 duration-500">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 border-8 border-slate-100 rounded-[2.5rem] rotate-45"></div>
                  <div className="absolute inset-0 border-8 border-blue-600 rounded-[2.5rem] border-t-transparent animate-spin rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="text-blue-600 animate-pulse" size={48} />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900">Syncing Profile...</h3>
                  <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">Security Verified</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SOLUTIONS MODAL */}
        {showTroubleshoot && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setShowTroubleshoot(false)}></div>
            <div className="bg-white w-full max-w-lg rounded-[3.5rem] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.8)] overflow-hidden relative animate-in zoom-in-95 slide-in-from-bottom-12 duration-500">
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-2xl shadow-inner">
                    <AlertCircle className="text-amber-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Quick Fixes</h3>
                </div>
                <button onClick={() => setShowTroubleshoot(false)} className="text-slate-400 hover:text-slate-900 transition-colors p-2 hover:bg-white rounded-full">
                  <X size={32} />
                </button>
              </div>
              
              <div className="p-10 space-y-8">
                <p className="text-slate-500 text-base font-medium leading-relaxed">Having trouble with the code? We've designed these backup options for a smooth transition experience.</p>
                
                <div className="space-y-5">
                  {[
                    { title: "Network Reset", text: "Toggle Airplane Mode on/off for 5 seconds to reset your SMS gateway connection.", icon: Phone },
                    { title: "Secure Email", text: "Receive a verification link to your primary civilian or military email.", icon: Mail },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 p-6 rounded-[2rem] border-2 border-slate-50 hover:border-blue-100 hover:bg-blue-50/20 transition-all duration-300">
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 h-fit">
                        <item.icon className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-900">{item.title}</p>
                        <p className="text-sm text-slate-500 mt-1 font-medium leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 space-y-4">
                  <button 
                    onClick={() => { setOtp('123456'); handleOtpSubmit(new Event('submit') as any); }}
                    className="w-full flex items-center justify-center gap-3 py-6 bg-emerald-50 text-emerald-700 rounded-[2rem] font-black text-base border-2 border-emerald-100 hover:bg-emerald-100 transition-all active:scale-95 shadow-lg shadow-emerald-500/5"
                  >
                    <CheckCircle2 size={24} />
                    Login via Demo Mode (Bypass)
                  </button>
                  <button 
                    onClick={() => setShowTroubleshoot(false)}
                    className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-base hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                  >
                    I'll Try SMS Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global CSS for unique animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-floating {
          animation: floating 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default LoginPage;
