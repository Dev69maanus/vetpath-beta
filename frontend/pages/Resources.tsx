
import React from 'react';
import { ExternalLink, FileText, Globe, Landmark, ShieldCheck } from 'lucide-react';

const Resources: React.FC = () => {
  const categories = [
    {
      title: "VA Benefits & GI Bill",
      icon: Landmark,
      color: "text-blue-600",
      bg: "bg-blue-50",
      links: [
        { name: "VA Education Benefits Portal", url: "https://www.va.gov/education/" },
        { name: "Post-9/11 GI Bill Guide", url: "#" },
        { name: "VR&E (Chapter 31) Info", url: "#" }
      ]
    },
    {
      title: "Career & Resume",
      icon: FileText,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      links: [
        { name: "Resume Builder for Vets", url: "#" },
        { name: "Interview Prep Guide", url: "#" },
        { name: "LinkedIn for Veterans", url: "#" }
      ]
    },
    {
      title: "External Partners",
      icon: Globe,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      links: [
        { name: "Hire Heroes USA", url: "https://www.hireheroesusa.org" },
        { name: "Hiring Our Heroes", url: "https://www.hiringourheroes.org" },
        { name: "American Legion Careers", url: "#" }
      ]
    },
    {
      title: "Health & Wellness",
      icon: ShieldCheck,
      color: "text-rose-600",
      bg: "bg-rose-50",
      links: [
        { name: "Veterans Crisis Line", url: "https://www.veteranscrisisline.net" },
        { name: "PTSD Support Resources", url: "#" },
        { name: "VA Appointments Scheduler", url: "#" }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Resource Library</h2>
        <p className="text-slate-500">Essential tools and documentation to support your transition.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center gap-4">
              <div className={`${cat.bg} p-4 rounded-2xl`}>
                <cat.icon className={cat.color} size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{cat.title}</h3>
            </div>
            
            <ul className="space-y-3">
              {cat.links.map((link, j) => (
                <li key={j}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 group transition-all"
                  >
                    <span className="font-semibold text-slate-700 group-hover:text-blue-600">{link.name}</span>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-600" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-10 rounded-3xl text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 max-w-xl space-y-4">
          <h3 className="text-2xl font-bold">Need Personal Assistance?</h3>
          <p className="text-slate-400 leading-relaxed">Our veteran advocates are available 24/7 to help you navigate your benefits, medical appointments, or educational hurdles.</p>
          <button className="bg-white text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
            Chat with an Advocate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resources;
