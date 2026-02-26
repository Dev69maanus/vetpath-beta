import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { TrendingUp, Clock, Award, Target, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { apiService, Course } from '../services/apiService';

const progressData = [
  { name: 'Mon', hours: 2 },
  { name: 'Tue', hours: 4.5 },
  { name: 'Wed', hours: 3 },
  { name: 'Thu', hours: 5.5 },
  { name: 'Fri', hours: 4 },
  { name: 'Sat', hours: 1 },
  { name: 'Sun', hours: 0 },
];

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiService.getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="space-y-10">
      {/* Welcome Hero Overhaul */}
      <div className="relative bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100">
              <Sparkles size={12} /> Status: Transitioning Excellence
            </div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Welcome back, <span className="text-blue-600">Sgt. Thompson</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              Your mission readiness is at <span className="text-slate-900 font-black underline decoration-blue-500 underline-offset-4">82%</span>. 
              You've completed 45% of your Project Management certification—the final objective is within reach.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
              Resume Training
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview with Cascading Entry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Active Missions', value: '3', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Accreditations', value: '1', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Skill Hours', value: '142', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Impact Score', value: '82%', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <div 
            key={i} 
            style={{ animationDelay: `${i * 100}ms` }}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-2xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
          >
            <div className={`${stat.bg} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
              <stat.icon className={stat.color} size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300 fill-mode-both flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Deployment Analytics</h3>
            <button className="text-blue-600 text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
              Full Report <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="flex-1" style={{minHeight: '320px'}}>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '16px' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#2563eb" strokeWidth={5} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Courses */}
        <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-both">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Active Tracks</h3>
          {loading ? (
            <div className="text-center py-8 text-slate-400">Loading courses...</div>
          ) : (
            <div className="space-y-10">
              {courses.slice(0, 2).map((course) => (
                <div key={course.id} className="group space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-slate-800 tracking-tight text-lg group-hover:text-blue-600 transition-colors">{course.title}</span>
                    <span className="text-blue-600 font-black text-sm">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" /> MISSION CRITICAL • {course.difficulty}
                  </div>
                </div>
              ))}
              <button className="w-full py-5 bg-slate-50 border-2 border-slate-100 text-slate-600 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                Launch Course Center
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;