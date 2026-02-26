
import React, { useState, useRef, useEffect } from 'react';
import { Mic2, Send, User, Bot, Sparkles, RefreshCcw } from 'lucide-react';
import { getInterviewResponse } from '../services/geminiService';
import { InterviewMessage } from '../types';

const InterviewCoach: React.FC = () => {
  const [messages, setMessages] = useState<InterviewMessage[]>([
    { 
      role: 'coach', 
      text: "Hello Sgt. Thompson! I'm your AI Interview Coach. Let's practice. Most veterans struggle with using too many acronyms. I'll help you spot those. Ready? Let's start with an easy one: Tell me about your most significant leadership experience in the military and how it applies to a civilian team." 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: InterviewMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const response = await getInterviewResponse(newMessages.map(m => ({ role: m.role, text: m.text })));
    setMessages(prev => [...prev, { role: 'coach', text: response }]);
    setLoading(false);
  };

  const restart = () => {
    setMessages([{ 
      role: 'coach', 
      text: "Let's start over. Tell me about a time you had to lead a project under extreme pressure. How did you ensure success?" 
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Interview Coach</h2>
          <p className="text-slate-500">Practice your civilian storytelling in a safe space.</p>
        </div>
        <button 
          onClick={restart}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 transition-all"
        >
          <RefreshCcw size={16} />
          New Session
        </button>
      </header>

      <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
              <div className={`max-w-[80%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-100' 
                    : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-slate-50 p-5 rounded-3xl rounded-tl-none border border-slate-100 flex gap-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-6 pr-24 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              disabled={loading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button 
                type="button"
                className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                title="Voice input coming soon"
              >
                <Mic2 size={20} />
              </button>
              <button 
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-all shadow-md"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-3 font-medium uppercase tracking-widest">
            Pro-Tip: Avoid using military acronyms (MOS, POV, PCS) in your answers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewCoach;
