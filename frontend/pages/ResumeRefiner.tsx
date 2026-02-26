
import React, { useState } from 'react';
import { Sparkles, Copy, Check, Info } from 'lucide-react';
import { refineResumeBullet } from '../services/geminiService';
import { ResumeRefinement } from '../types';

const ResumeRefiner: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResumeRefinement[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const refined = await refineResumeBullet(input);
    setResults(refined);
    setLoading(false);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Resume Refiner</h2>
        <p className="text-slate-500 text-lg">Remove the jargon. Highlight the impact. Land the interview.</p>
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <form onSubmit={handleRefine} className="space-y-4">
          <label className="block text-sm font-bold text-slate-700">Paste a Military Achievement</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. NCOIC of unit maintenance, managed 15 personnel and $4M in equipment..."
            className="w-full h-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
            ) : (
              <Sparkles size={20} className="text-blue-400" />
            )}
            {loading ? 'Refining Achievement...' : 'Refine for Civilian Resume'}
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 px-2">
            Refined Options
          </h3>
          <div className="space-y-4">
            {results.map((res, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all group">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3 flex-1">
                    <p className="text-slate-800 font-medium text-lg leading-relaxed">"{res.civilianVersion}"</p>
                    <div className="flex items-start gap-2 text-slate-500 text-sm bg-slate-50 p-3 rounded-xl">
                      <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                      <p><span className="font-bold text-slate-700">Why it works:</span> {res.whyItWorks}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(res.civilianVersion, idx)}
                    className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-blue-600 hover:text-white transition-all shrink-0"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === idx ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeRefiner;
