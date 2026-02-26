import React, { useState, useEffect } from 'react';
import { UserCheck, Star, Calendar, MessageCircle, CheckCircle } from 'lucide-react';
import { apiService, Mentor } from '../services/apiService';
import { MOCK_MENTORS } from '../constants';
import BookIntroCallModal from '../components/BookIntroCallModal';

const Mentorship: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const fetchedMentors = await apiService.getMentors();
        if (fetchedMentors.length === 0) {
          setMentors(MOCK_MENTORS);
        } else {
          setMentors(fetchedMentors);
        }
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setMentors(MOCK_MENTORS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleBook = (mentor: Mentor) => {
    setSelectedMentor(mentor);
  };

  const closeModal = () => {
    setSelectedMentor(null);
  };

  if (loading) {
    return <div className="text-center py-10">Loading mentors...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative shadow-2xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="flex-1 space-y-4 relative z-10 text-center md:text-left">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight">Find Your Battle Buddy in Business</h2>
          <p className="text-slate-400 text-lg max-w-2xl">Connect with experienced veterans who have successfully navigated the transition to the civilian workforce.</p>
          <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all">
              Become a Mentor
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold backdrop-blur-md transition-all border border-white/10">
              Browse Success Stories
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 group hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-slate-200/50">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <img src={mentor.avatar} alt={mentor.name} className="w-24 h-24 rounded-2xl object-cover shadow-lg" />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-md border-2 border-white">
                  <UserCheck size={16} />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{mentor.name}</h3>
                    <p className="text-sm font-semibold text-slate-500">{mentor.role} at <span className="text-blue-600">{mentor.company}</span></p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl text-xs font-bold">
                    <Star size={12} fill="currentColor" />
                    4.9
                  </div>
                </div>
                
                <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {mentor.militaryBranch} Veteran
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                  {mentor.specialties.map((spec, i) => (
                    <span key={i} className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button 
                onClick={() => handleBook(mentor)}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all shadow-md bg-slate-900 text-white hover:bg-blue-600 shadow-slate-200 active:scale-95"
              >
                <Calendar size={18} />
                Book Intro Call
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border-2 border-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-50 hover:border-slate-200 transition-all">
                <MessageCircle size={18} />
                Direct Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <BookIntroCallModal
          isOpen={!!selectedMentor}
          onClose={closeModal}
          mentorId={selectedMentor.id}
          mentorName={selectedMentor.name}
          mentorAvatar={selectedMentor.avatar}
        />
      )}
    </div>
  );
};

export default Mentorship;
