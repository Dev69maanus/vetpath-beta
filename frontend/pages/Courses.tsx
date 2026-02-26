
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Play,
  GraduationCap,
  Star,
  User,
  ChevronRight,
  X,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { apiService, Course } from '../services/apiService';
import { MOCK_COURSES } from '../constants';

const Courses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my' | 'browse'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await apiService.getCourses();
        if (fetchedCourses.length === 0) {
          setCourses(MOCK_COURSES);
        } else {
          setCourses(fetchedCourses);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setCourses(MOCK_COURSES);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(c =>
    (activeTab === 'my' ? c.progress > 0 : true) &&
    (c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.provider.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Intermediate': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Advanced': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Academic Flight Deck</h2>
          <p className="text-slate-500 font-medium text-lg mt-2">Precision training for your next civilian mission.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in zoom-in-95 duration-700">
          <button 
            onClick={() => setActiveTab('browse')}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'browse' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:text-slate-800'}`}
          >
            CATALOG
          </button>
          <button 
            onClick={() => setActiveTab('my')}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'my' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:text-slate-800'}`}
          >
            ACTIVE DUTY
          </button>
        </div>
      </div>

      {/* Global Search Bar Overhaul */}
      <div className="group relative animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="absolute inset-0 bg-blue-600/5 blur-2xl rounded-full group-focus-within:bg-blue-600/10 transition-all duration-500"></div>
        <div className="relative flex items-center gap-4 p-2 bg-white/80 backdrop-blur-xl border-2 border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 group-focus-within:border-blue-500 transition-all">
          <div className="pl-6 text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <Search size={24} strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder="Search certificates, MOS codes, or skill sets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none py-5 text-lg font-bold text-slate-800 placeholder:text-slate-300"
          />
          <div className="hidden md:flex items-center gap-3 pr-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] font-black text-slate-400">CTRL</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] font-black text-slate-400">K</span>
            </div>
          </div>
          <button className="hidden lg:flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all">
            <Filter size={18} />
            Filters
          </button>
        </div>
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

      {/* Course Grid with Staggered Entry */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
          <div 
            key={course.id} 
            onClick={() => setSelectedCourse(course)}
            style={{ animationDelay: `${index * 100}ms` }}
            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col cursor-pointer hover:shadow-2xl hover:shadow-blue-200/50 hover:border-blue-200 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
          >
            <div className="relative h-56 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <p className="text-white text-sm font-bold flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                  Full Details <ArrowRight size={16} />
                </p>
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{course.provider}</p>
                <div className="flex items-center gap-1 text-slate-400 text-[11px] font-black">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  {course.rating} ({course.reviews})
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <Clock size={14} />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <BookOpen size={14} />
                  {course.syllabus.length} Modules
                </div>
              </div>

              {course.progress > 0 && (
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-[10px] font-black text-slate-400">
                    <span>MISSION PROGRESS</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Course Details Modal/Drawer */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedCourse(null)}></div>
          <div className="relative w-full max-w-2xl bg-white h-screen shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-500">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-all z-20"
            >
              <X size={24} />
            </button>

            <div className="relative h-80 overflow-hidden bg-slate-900">
              <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
            </div>

            <div className="px-12 py-8 -mt-20 relative z-10 space-y-10">
              <div className="space-y-4">
                <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${getDifficultyColor(selectedCourse.difficulty)}`}>
                  {selectedCourse.difficulty} Level
                </span>
                <h2 className="text-4xl font-black text-slate-900 leading-tight">{selectedCourse.title}</h2>
                <div className="flex items-center gap-8 text-slate-500">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                    <Clock size={16} className="text-blue-600" />
                    {selectedCourse.duration}
                  </div>
                  <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                    <Star size={16} className="text-amber-500" />
                    {selectedCourse.rating} Rating
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Instructor</p>
                  <div className="flex items-center gap-4">
                    <img src={selectedCourse.instructorAvatar} className="w-12 h-12 rounded-2xl object-cover" />
                    <div>
                      <p className="font-black text-slate-900">{selectedCourse.instructor}</p>
                      <p className="text-xs text-slate-500 font-bold">Subject Expert</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-200">
                  <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-4">Certification</p>
                  <div className="flex items-center gap-4">
                    <Trophy className="text-white" size={32} />
                    <p className="font-black leading-tight">Accredited Completion</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900">Mission Overview</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{selectedCourse.description}</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900">Course Syllabus</h3>
                <div className="space-y-3">
                  {selectedCourse.syllabus.map((mod, i) => (
                    <div key={mod.id} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-lg hover:shadow-slate-100 transition-all group">
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                          0{i + 1}
                        </span>
                        <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{mod.title}</p>
                      </div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{mod.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 sticky bottom-0 bg-white pb-12">
                <button 
                  onClick={() => {
                    if (selectedCourse.id === '1') {
                      setShowVideoPlayer(true);
                    }
                  }}
                  className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-lg hover:bg-blue-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 group"
                >
                  {selectedCourse.progress > 0 ? 'RESUME TRAINING' : 'ENROLL IN ACADEMY'}
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {showVideoPlayer && selectedCourse?.id === '1' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowVideoPlayer(false)}></div>
          <div className="relative w-full max-w-6xl mx-4 bg-black rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setShowVideoPlayer(false)}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all"
            >
              <X size={24} />
            </button>
            <div className="aspect-video">
              <video 
                className="w-full h-full"
                controls
                autoPlay
                preload="metadata"
                playsInline
                onError={(e) => console.error('Video error:', e)}
              >
                <source src="/demo-program.mp4" type="video/mp4" />
                <p className="text-white p-8 text-center">Your browser does not support the video tag or the video format.</p>
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
