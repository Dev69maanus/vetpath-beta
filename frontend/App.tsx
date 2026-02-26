
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainFooter from './components/MainFooter';
import Dashboard from './pages/Dashboard';
import ProgramManagement from './pages/ProgramManagement';
import Certifications from './pages/Certifications';
import SkillsTranslator from './pages/SkillsTranslator';
import ResumeRefiner from './pages/ResumeRefiner';
import InterviewCoach from './pages/InterviewCoach';
import Courses from './pages/Courses';
import Mentorship from './pages/Mentorship';
import Community from './pages/Community';
import Resources from './pages/Resources';
import Attendance from './pages/Attendance';
import LoginPage from './pages/LoginPage';
import FloatingAssistant from './components/FloatingAssistant';
import { AppView, UserRole } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.PROGRAMS: return <ProgramManagement />;
      case AppView.CERTIFICATIONS: return <Certifications userRole={userRole} />;
      case AppView.SKILLS_TRANSLATOR: return <SkillsTranslator />;
      case AppView.RESUME_REFINER: return <ResumeRefiner />;
      case AppView.INTERVIEW_COACH: return <InterviewCoach />;
      case AppView.COURSES: return <Courses />;
      case AppView.MENTORSHIP: return <Mentorship />;
      case AppView.COMMUNITY: return <Community />;
      case AppView.RESOURCES: return <Resources />;
      case AppView.ATTENDANCE: return <Attendance />;
      default: return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onLogout={handleLogout}
        userRole={userRole}
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col relative bg-slate-50 overflow-hidden rounded-tl-[3rem]">
        {/* Content View Area */}
        <div className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
          <div className="animate-in fade-in duration-700">
            {renderView()}
          </div>
        </div>

        {/* Global AI Assistant */}
        <FloatingAssistant />

        {/* Professional Footer Component */}
        <MainFooter />
      </main>
    </div>
  );
};

export default App;
