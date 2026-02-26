import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Search, 
  Filter, 
  ArrowUpRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { apiService, Attendance as AttendanceType } from '../services/apiService';

const Attendance: React.FC = () => {
  const [students, setStudents] = useState<AttendanceType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await apiService.getAttendance();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  const toggleAttendance = async (id: string) => {
    const target = students.find(s => s.id === id);
    if (!target) return;
    const newStatus = target.status === 'present' ? 'absent' : 'present';
    
    try {
      await apiService.updateAttendance(id, { status: newStatus });
      setStudents(prev => prev.map(s => (s.id === id ? { ...s, status: newStatus } : s)));
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const filteredStudents = students.filter(s => 
    (s.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.branch || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-10">Loading attendance...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Attendance Tracker</h2>
          <p className="text-slate-500 font-medium text-lg mt-1">Monitor student engagement and participation.</p>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-bold">Total Students</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{students.length}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-bold">Present Today</p>
              <p className="text-3xl font-black text-emerald-600 mt-1">{presentCount}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <UserCheck className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-bold">Attendance Rate</p>
              <p className="text-3xl font-black text-slate-900 mt-1">
                {students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0}%
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl">
              <TrendingUp className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or branch..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Student List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Branch</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Last Active</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {(student.studentName || 'U')[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{student.studentName || 'Unknown'}</p>
                      <p className="text-sm text-slate-500">Enrolled: {student.enrollmentDate || 'N/A'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold">
                    {student.branch || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{student.lastActive || 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all"
                        style={{ width: `${student.progress || 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{student.progress || 0}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleAttendance(student.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                      student.status === 'present'
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {student.status === 'present' ? (
                      <>
                        <CheckCircle2 size={16} />
                        Present
                      </>
                    ) : (
                      <>
                        <Circle size={16} />
                        Absent
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;