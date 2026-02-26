
import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Github, 
  Globe,
  Mail,
  Phone,
  MapPin,
  Sparkles
} from 'lucide-react';

const MainFooter: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles className="text-blue-600" size={28} />
              <h2 className="text-2xl font-black text-blue-600 tracking-tight">VetPath</h2>
            </div>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Building professional and functional transition experiences with modern AI technology. We help veterans create their digital civilian presence.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <a href="#" className="text-blue-600 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-blue-600 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-blue-600 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-blue-600 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-blue-600 hover:text-white transition-colors"><Globe size={20} /></a>
            </div>
          </div>

          {/* About Us Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">About Us</h3>
            <ul className="space-y-4">
              {['Company History', 'Meet the Team', 'Employee Handbook', 'Careers'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Our Services</h3>
            <ul className="space-y-4">
              {['MOS Translation', 'Resume Refinement', 'Interview Coaching', 'Mentorship Networking'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="text-blue-600"><Mail size={18} /></div>
                <span className="text-slate-400 group-hover:text-white transition-colors text-sm font-medium">hello@vetpath.com</span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="text-blue-600"><Phone size={18} /></div>
                <span className="text-slate-400 group-hover:text-white transition-colors text-sm font-medium">+1 800-VET-PATH</span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="text-blue-600 mt-1"><MapPin size={18} /></div>
                <span className="text-slate-400 group-hover:text-white transition-colors text-sm font-medium leading-relaxed">
                  123 Academy Blvd, <br />
                  Arlington, VA 22201
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500">
          <p className="text-sm font-medium">© 2025 VetPath Academy</p>
          <div className="flex gap-10">
            <a href="#" className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Support</a>
          </div>
          <p className="text-sm font-medium">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
