
import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { translateMilitarySkills } from '../services/geminiService';
import { TranslationResult } from '../types';

const SkillsTranslator: React.FC = () => {
  const [mos, setMos] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TranslationResult[] | null>(null);

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await translateMilitarySkills(mos, description);
    setResults(res);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Military Skills Translator</h2>
        <p className="text-slate-500 text-lg">Convert your military experience into high-demand civilian career paths.</p>
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <form onSubmit={handleTranslate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2">MOS / Rating Code</label>
              <input
                type="text"
                value={mos}
                onChange={(e) => setMos(e.target.value)}
                placeholder="e.g. 11B, 0311"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-slate-700 mb-2">Brief Description of Experience</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Team leader, logistics management, equipment maintenance..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
            ) : (
              <Sparkles size={20} className="text-blue-400" />
            )}
            {loading ? 'Analyzing Skills...' : 'Translate to Civilian Roles'}
          </button>
        </form>
      </div>

      {results && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" />
            Top Matches for You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((result, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-blue-600 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-lg leading-tight">{result.civilianRole}</h4>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{result.relevance}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Matching Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {result.matchingSkills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-md border border-slate-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Skill Gaps</p>
                  <ul className="space-y-1">
                    {result.skillGaps.map((gap, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1">
                        <span className="text-amber-500 mt-0.5">•</span> {gap}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-100 transition-colors">
                  <BookOpen size={16} />
                  View Related Courses
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsTranslator;
