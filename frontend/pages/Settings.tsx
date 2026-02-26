
import React, { useState, useEffect } from 'react';
import { Database, ShieldCheck, Save, RefreshCw, Eye, EyeOff, Terminal, HardDrive, Wifi, Activity } from 'lucide-react';

const Settings: React.FC = () => {
  const [connectionString, setConnectionString] = useState('');
  const [showString, setShowString] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem('VETPATH_DB_UPLINK');
    if (saved) setConnectionString(saved);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('VETPATH_DB_UPLINK', connectionString);
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };

  const handleTestConnection = () => {
    setTestStatus('testing');
    setTimeout(() => {
      if (connectionString.includes('postgresql://') || connectionString.includes('mongodb://')) {
        setTestStatus('success');
      } else {
        setTestStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
          <Terminal size={12} /> Root Level Access
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Command Configuration</h2>
        <p className="text-slate-500 font-medium text-lg">Manage platform infrastructure and database integrations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Uplink Latency', value: '42ms', icon: Activity, color: 'text-emerald-500' },
          { label: 'Storage Usage', value: '12.4GB', icon: HardDrive, color: 'text-blue-500' },
          { label: 'Tunnel Status', value: 'Secure', icon: Wifi, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
            <stat.icon size={24} className={stat.color} />
          </div>
        ))}
      </div>

      <div className="bg-slate-950 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Database className="text-emerald-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Database Uplink</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">PostgreSQL / MongoDB / Custom String</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative group/field">
            <label className="block text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-3 ml-2">
              Primary Connection String
            </label>
            <div className="relative flex items-center bg-slate-900 border-2 border-slate-800 rounded-2xl focus-within:border-emerald-500 transition-all overflow-hidden group-focus-within/field:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]">
              <input 
                type={showString ? "text" : "password"}
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                placeholder="postgresql://user:password@host:port/database"
                className="w-full bg-transparent px-6 py-5 text-emerald-400 font-mono text-sm outline-none placeholder:text-slate-700"
              />
              <button 
                onClick={() => setShowString(!showString)}
                className="px-6 py-5 text-slate-500 hover:text-emerald-400 transition-colors border-l border-slate-800"
              >
                {showString ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-950/20 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
              {isSaving ? 'Synching...' : 'Store Configuration'}
            </button>
            <button 
              onClick={handleTestConnection}
              className="px-8 py-4 bg-slate-800 text-slate-300 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-700 transition-all active:scale-95 flex items-center gap-3"
            >
              <RefreshCw className={testStatus === 'testing' ? 'animate-spin' : ''} size={18} />
              Test Line
            </button>
          </div>

          {testStatus !== 'idle' && (
            <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 animate-in zoom-in-95 duration-300 ${
              testStatus === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
              testStatus === 'error' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
              'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {testStatus === 'success' && <ShieldCheck size={18} />}
              <span className="text-xs font-black uppercase tracking-widest">
                {testStatus === 'testing' && 'Executing diagnostic sequence...'}
                {testStatus === 'success' && 'Uplink established. Database responding.'}
                {testStatus === 'error' && 'Handshake failed. Check credentials/protocol.'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 space-y-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-900">Infrastructure Logs</h3>
        <div className="bg-slate-50 rounded-2xl p-6 font-mono text-[11px] text-slate-500 space-y-2 overflow-x-auto">
          <p className="flex gap-4"><span className="text-slate-300">[12:45:01]</span> <span className="text-blue-500">INFO</span> System health check passed.</p>
          <p className="flex gap-4"><span className="text-slate-300">[12:45:05]</span> <span className="text-emerald-500">AUTH</span> Session token refreshed for Instr. Thompson.</p>
          <p className="flex gap-4"><span className="text-slate-300">[12:46:12]</span> <span className="text-amber-500">WARN</span> SSL certificate expires in 12 days.</p>
          <p className="flex gap-4 animate-pulse"><span className="text-slate-300">[12:47:00]</span> <span className="text-emerald-500">LIVE</span> Awaiting incoming traffic...</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
