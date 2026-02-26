
import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  FileText, 
  Calendar, 
  ShieldCheck,
  History,
  MoreVertical,
  ChevronRight,
  Filter,
  ArrowUpRight,
  Eye,
  Check,
  X
} from 'lucide-react';
import { MOCK_CERTS } from '../constants';
import { Certification, CertificationStatus, UserRole } from '../types';
import { apiService, Certification as ApiCertification } from '../services/apiService';

interface CertificationsProps {
  userRole?: 'teacher' | 'veteran';
}

const Certifications: React.FC<CertificationsProps> = ({ userRole = 'veteran' }) => {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'verified'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const fetchedCerts = await apiService.getCertifications();
        setCerts(fetchedCerts);
      } catch (err) {
        setError('Failed to load certifications');
        console.error('Error fetching certifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const filteredCerts = certs.filter(c => {
    const matchesRole = userRole === 'teacher' ? true : c.userId === 'current-user'; // TODO: Get current user ID
    const matchesTab = activeTab === 'all' ? true :
                       activeTab === 'pending' ? c.status === 'pending' :
                       c.status === 'active';
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: CertificationStatus) => {
    switch (status) {
      case 'completed': return { icon: CheckCircle2, text: 'Verified', class: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
      case 'pending-review': return { icon: Clock, text: 'Pending Review', class: 'bg-amber-50 text-amber-700 border-amber-100' };
      case 'in-progress': return { icon: History, text: 'In Progress', class: 'bg-blue-50 text-blue-700 border-blue-100' };
      case 'expired': return { icon: AlertCircle, text: 'Expired', class: 'bg-rose-50 text-rose-700 border-rose-100' };
      case 'rejected': return { icon: XCircle, text: 'Rejected', class: 'bg-slate-100 text-slate-500 border-slate-200' };
      default: return { icon: FileText, text: 'Planned', class: 'bg-slate-50 text-slate-500 border-slate-100' };
    }
  };

  const handleAction = async (id: string, newStatus: CertificationStatus) => {
    try {
      // Update certification status via API
      await apiService.updateCertification(id, { status: newStatus });

      // Update local state
      setCerts(prev => prev.map(c => {
        if (c.id === id) {
          return {
            ...c,
            status: newStatus
          };
        }
        return c;
      }));
      setSelectedCert(null);
    } catch (err) {
      console.error('Error updating certification:', err);
      setError('Failed to update certification');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {userRole === 'teacher' ? 'Verification Command' : 'Credential Vault'}
          </h2>
          <p className="text-slate-500 font-medium text-lg mt-1">
            {userRole === 'teacher' 
              ? 'Review and validate high-stakes veteran certifications.' 
              : 'Formalize your military and civilian expertise for professional validation.'}
          </p>
        </div>
        {userRole === 'veteran' && (
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
          >
            <Plus size={20} />
            Submit New Proof
          </button>
        )}
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Verified', value: certs.filter(c => c.status === 'completed').length, icon: ShieldCheck, color: 'emerald' },
          { label: 'Awaiting Action', value: certs.filter(c => c.status === 'pending-review').length, icon: Clock, color: 'amber' },
          { label: 'Expiring Soon', value: '2', icon: AlertCircle, color: 'rose' },
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

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-bold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search credentials by name, issuer, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-bold text-slate-800"
          />
        </div>
        <div className="flex bg-white p-2 rounded-[2.5rem] border border-slate-200 shadow-sm">
          {['all', 'pending', 'verified'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? (userRole === 'teacher' ? 'bg-emerald-600' : 'bg-blue-600') + ' text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List / Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCerts.map((cert) => {
          const badge = getStatusBadge(cert.status);
          return (
            <div 
              key={cert.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col lg:flex-row lg:items-center gap-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 relative overflow-hidden"
            >
              <div className="flex items-center gap-6 flex-1">
                <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${badge.class.split(' ')[0]} ${badge.class.split(' ')[1]}`}>
                  <Award size={32} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black text-slate-900">{cert.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${badge.class} flex items-center gap-1.5`}>
                      <badge.icon size={12} />
                      {badge.text}
                    </span>
                  </div>
                  <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{cert.issuer} • ID: {cert.credentialId || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 shrink-0 lg:border-l border-slate-100 lg:pl-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Date</p>
                  <p className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    {cert.issueDate || 'Unset'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Validity</p>
                  <p className={`font-bold text-sm flex items-center gap-2 ${cert.status === 'expired' ? 'text-rose-600' : 'text-slate-800'}`}>
                    <Clock size={14} className="text-slate-400" />
                    {cert.expiryDate || 'N/A'}
                  </p>
                </div>
                <div className="col-span-2 md:col-span-1 flex items-center gap-3 justify-end">
                  {userRole === 'teacher' && cert.status === 'pending-review' ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAction(cert.id, 'completed')}
                        className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all"
                        title="Approve"
                      >
                        <Check size={20} />
                      </button>
                      <button 
                        onClick={() => handleAction(cert.id, 'expired')}
                        className="p-3 bg-rose-600 text-white rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-100 transition-all"
                        title="Reject"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setSelectedCert(cert)}
                      className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                    >
                      <Eye size={20} />
                    </button>
                  )}
                  <button className="p-3 text-slate-300 hover:text-slate-900 rounded-xl transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal / Sidebar */}
      {selectedCert && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedCert(null)}></div>
          <div className="relative w-full max-w-xl bg-white h-screen shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-500 p-12 space-y-12">
            <header className="flex justify-between items-start">
              <div className="space-y-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${getStatusBadge(selectedCert.status).class}`}>
                  {getStatusBadge(selectedCert.status).text}
                </div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">{selectedCert.name}</h3>
                <p className="text-slate-500 font-bold uppercase tracking-[0.2em]">{selectedCert.issuer}</p>
              </div>
              <button onClick={() => setSelectedCert(null)} className="p-3 bg-slate-50 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-all">
                <X size={24} />
              </button>
            </header>

            <div className="space-y-6">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <History size={16} /> Digital Audit Trail
              </h4>
              <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {selectedCert.auditTrail.map((entry, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[1.65rem] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-600"></div>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-1">
                      <div className="flex justify-between items-center">
                        <p className="font-black text-slate-900 uppercase text-xs">{entry.action}</p>
                        <p className="text-[10px] font-bold text-slate-400">{entry.date}</p>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">By {entry.actor}</p>
                      {entry.comment && (
                        <p className="text-xs text-slate-400 italic mt-2 bg-white/50 p-3 rounded-xl border border-slate-200">"{entry.comment}"</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[3rem] text-white flex items-center justify-between group cursor-pointer hover:bg-blue-600 transition-all">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-blue-400 group-hover:text-white/70 uppercase tracking-widest">Digital Proof</p>
                <p className="font-black">View Verified Document</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 group-hover:bg-white/20">
                <Eye size={24} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal (Simulation) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowUploadModal(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-2xl shadow-inner">
                  <Award className="text-blue-600" size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Add External Credential</h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                <X size={32} />
              </button>
            </div>
            
            <form className="p-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Certification Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="e.g. AWS Security Specialist" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Issuer</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" placeholder="e.g. Amazon" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Credential ID</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" placeholder="e.g. ID-9981" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Issue Date</label>
                  <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Expiry Date</label>
                  <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center space-y-4 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Plus size={32} />
                </div>
                <p className="font-black text-slate-900">Upload PDF or JPG Proof</p>
                <p className="text-xs text-slate-400 font-medium">Max file size: 10MB. Official transcripts preferred.</p>
              </div>

              <button 
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95"
              >
                Submit for Verification
              </button>
            </form>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default Certifications;
