
import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  GraduationCap, 
  Users, 
  MessageSquare, 
  BookOpen, 
  LogOut,
  FileUser,
  Mic2,
  Settings,
  ClipboardCheck,
  ChevronRight,
  Layers,
  Award,
  Terminal
} from 'lucide-react';
import { AppView, UserRole } from '../types';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onLogout: () => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onLogout, userRole }) => {
  const veteranNavItems = [
    { id: AppView.DASHBOARD, label: 'DASHBOARD', icon: LayoutDashboard },
    { id: AppView.CERTIFICATIONS, label: 'CREDENTIAL VAULT', icon: Award },
    { id: AppView.SKILLS_TRANSLATOR, label: 'SKILLS TRANSLATOR', icon: Briefcase },
    { id: AppView.RESUME_REFINER, label: 'RESUME REFINER', icon: FileUser },
    { id: AppView.INTERVIEW_COACH, label: 'INTERVIEW COACH', icon: Mic2 },
  ];

  const commonNavItems = [
    { id: AppView.COURSES, label: 'ACADEMY', icon: GraduationCap },
    { id: AppView.MENTORSHIP, label: 'MENTORSHIP', icon: Users },
    { id: AppView.COMMUNITY, label: 'BATTLEGROUND', icon: MessageSquare },
    { id: AppView.RESOURCES, label: 'INTEL HUB', icon: BookOpen },
  ];

  const teacherCommonNavItems = [
    { id: AppView.COMMUNITY, label: 'BATTLEGROUND', icon: MessageSquare },
    { id: AppView.RESOURCES, label: 'INTEL HUB', icon: BookOpen },
  ];

  const navItems = userRole === 'teacher' 
    ? [
        { id: AppView.DASHBOARD, label: 'INSTRUCTOR DESK', icon: LayoutDashboard },
        { id: AppView.PROGRAMS, label: 'PROGRAM OFFICE', icon: Layers },
        { id: AppView.CERTIFICATIONS, label: 'VERIFICATION HUB', icon: Award },
        { id: AppView.ATTENDANCE, label: 'UNIT ROSTER', icon: ClipboardCheck },
        ...teacherCommonNavItems,
      ]
    : [...veteranNavItems, ...commonNavItems];

  return (
    <div className="w-64 bg-slate-950 h-screen fixed left-0 top-0 flex flex-col text-white shadow-2xl transition-all z-50">
      <div className="p-8 border-b border-white/5 flex items-center gap-4">
        <div className={`p-2.5 rounded-2xl shadow-lg ${userRole === 'teacher' ? 'bg-emerald-600 shadow-emerald-900/40' : 'bg-blue-600 shadow-blue-900/40'}`}>
          <GraduationCap className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-black tracking-tighter">VetPath</h1>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group relative ${
              currentView === item.id 
                ? (userRole === 'teacher' ? 'bg-emerald-600 shadow-xl shadow-emerald-950/50' : 'bg-blue-600 shadow-xl shadow-blue-950/50') + ' text-white' 
                : 'text-slate-500 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-4">
              <item.icon size={20} strokeWidth={currentView === item.id ? 2.5 : 2} className={currentView === item.id ? 'text-white' : 'group-hover:text-white transition-colors'} />
              <span className="font-black text-[11px] uppercase tracking-widest">{item.label}</span>
            </div>
            {currentView === item.id && (
              <ChevronRight size={14} className="animate-in fade-in slide-in-from-left-2 duration-300" />
            )}
            
            <div className={`absolute left-0 w-1 bg-white rounded-full transition-all duration-500 ${currentView === item.id ? 'h-6 opacity-100' : 'h-0 opacity-0'}`}></div>
          </button>
        ))}
      </nav>

      <div className="p-6">
        <div className="p-6 bg-white/5 rounded-[2rem] mb-6 border border-white/5 relative overflow-hidden group">
          <p className="text-[9px] text-slate-500 font-black mb-1 uppercase tracking-widest">Active Operator</p>
          <p className="text-sm font-black truncate text-white leading-tight">
            {userRole === 'teacher' ? 'Instr. Thompson' : 'Sgt. Alex Thompson'}
          </p>
          <div className={`inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${userRole === 'teacher' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
            {userRole === 'teacher' ? 'Certified Faculty' : 'Class: Tier 1'}
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-6 py-4 text-slate-500 hover:text-white hover:bg-rose-600/20 rounded-[1.5rem] transition-all font-black text-[11px] uppercase tracking-widest group"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
};

export default Sidebar;
