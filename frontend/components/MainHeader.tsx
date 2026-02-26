
import React from 'react';
import { 
  Bell, 
  Search, 
  UserCircle, 
  Menu,
  ChevronDown,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { UserRole, AppView } from '../types';

interface MainHeaderProps {
  userRole: UserRole;
  currentView: AppView;
}

const MainHeader: React.FC<MainHeaderProps> = ({ userRole }) => {
  return (
    <header className="h-20 bg-[#0a0a0a] border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-12 flex-1">
        {/* Brand/Logo Area */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform">
            <Sparkles className="text-white" size={20} />
          </div>
          <span className="text-white font-black text-xl tracking-tight">VetPath</span>
        </div>

        {/* Navigation Links (Acme Style) */}
        <nav className="hidden lg:flex items-center gap-8">
          {['Dashboard', 'Learning', 'Mentors', 'Community'].map((item) => (
            <button 
              key={item} 
              className="text-slate-400 hover:text-white font-bold text-sm transition-colors flex items-center gap-1.5"
            >
              {item}
              {item === 'Learning' && <ChevronDown size={14} className="mt-0.5" />}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* Global Search - Minimalist */}
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-rose-500/50 transition-all">
          <Search size={16} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-xs text-white px-3 w-32 focus:w-48 transition-all font-medium"
          />
        </div>

        {/* Notifications */}
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0a0a0a]"></span>
        </button>

        <div className="h-6 w-[1px] bg-white/10"></div>

        {/* Get Started Button (Acme Style) */}
        <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-black text-sm flex items-center gap-2 hover:shadow-xl hover:shadow-rose-500/20 transition-all active:scale-95 whitespace-nowrap">
          Quick Start
          <ArrowRight size={16} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/10 bg-white/5 text-white transition-all group-hover:border-rose-500`}>
            <UserCircle size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
