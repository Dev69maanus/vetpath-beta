
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Users, 
  BarChart3, 
  Clock, 
  Search, 
  MoreHorizontal, 
  ShieldCheck,
  TrendingUp,
  Target,
  ChevronRight,
  Filter,
  ArrowUpRight,
  Layers
} from 'lucide-react';
import { apiService, Program } from '../services/apiService';
import LaunchProgramModal from '../components/LaunchProgramModal';

const ProgramManagement: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'planning'>('all');
  const [loading, setLoading] = useState(true);
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await apiService.getPrograms();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter(p => 
    (activeTab === 'all' ? true : p.status === activeTab) &&
    ((p.name || p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
     (p.category || '').toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return <div className="text-center py-10">Loading programs...</div>;
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Program Command</h2>
          <p className="text-slate-500 font-medium text-lg">Manage specialized transition tracks and cohort performance.</p>
        </div>
        <button 
          onClick={() => setIsLaunchModalOpen(true)}
          className="flex items-center gap-3 px-8 py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95"
        >
          <Plus size={20} />
          Launch New Program
        </button>
      </header>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Active Cohorts', value: programs.filter(p => p.status === 'active').length.toString(), icon: Layers, color: 'emerald' },
          { label: 'Total Enrolled', value: programs.reduce((sum, p) => sum + (p.enrolledCount || 0), 0).toString(), icon: Users, color: 'blue' },
          { label: 'Avg. Readiness', value: programs.length > 0 ? Math.round(programs.reduce((sum, p) => sum + (p.performance || 0), 0) / programs.length) + '%' : '0%', icon: Target, color: 'amber' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <p className="text-4xl font-black text-slate-900">{kpi.value}</p>
            </div>
            <div className={`p-5 rounded-2xl bg-${kpi.color}-50 text-${kpi.color}-600`}>
              <kpi.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search programs by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-bold text-slate-800"
          />
        </div>
        <div className="flex bg-white p-2 rounded-[2.5rem] border border-slate-200 shadow-sm">
          {['all', 'active', 'planning'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500">
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {program.name || program.title}
                </h3>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  {program.category || 'General'}
                </p>
              </div>
              <button className="p-3 text-slate-300 hover:text-slate-900 rounded-xl transition-all">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed">{program.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Enrolled</p>
                <p className="text-2xl font-black text-slate-900">{program.enrolledCount || 0}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                <p className="text-2xl font-black text-slate-900">{program.duration || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="text-emerald-600" size={16} />
                </div>
                <span className="text-sm font-bold text-slate-700">{program.instructor || 'Instructor TBA'}</span>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all">
                View Details
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Launch Program Modal */}
      <LaunchProgramModal 
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
      />
    </div>
  );
};

export default ProgramManagement;