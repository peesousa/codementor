import React, { useState } from 'react';
import { MOCK_MENTORS } from '../constants';
import { findSmartMatches } from '../services/geminiService';
import { IconSearch, IconZap, IconUser } from '../components/Icons';
import { Mentor } from '../types';

export const FindMentor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mentors, setMentors] = useState<Mentor[]>(MOCK_MENTORS);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
        setMentors(MOCK_MENTORS);
        return;
    }

    setIsSearching(true);
    // Chamada ao Serviço Gemini
    const results = await findSmartMatches(query, MOCK_MENTORS);
    setMentors(results);
    setIsSearching(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Encontre seu Mentor Ideal</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Use nosso sistema de matching com IA. Digite seus objetivos como "Preparação para entrevista Google" ou "Aprender Rust backend".
        </p>
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ex: Me ajude a otimizar renderização no React..."
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary-600 focus:outline-none placeholder-slate-500 shadow-xl"
          />
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isSearching ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all group relative">
             {/* Match Badge */}
            {mentor.matchScore && mentor.matchScore > 70 && (
                <div className="absolute top-3 right-3 bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    <IconZap className="w-3 h-3" />
                    {mentor.matchScore}% Match
                </div>
            )}

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-full ring-2 ring-slate-800" />
                <div>
                  <h3 className="font-bold text-white group-hover:text-primary-400 transition-colors">{mentor.name}</h3>
                  <p className="text-xs text-slate-400">{mentor.title} @ {mentor.company}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>

              {mentor.matchReason && (
                 <p className="text-xs text-slate-500 mb-4 italic">
                    "{mentor.matchReason}"
                 </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="text-sm">
                    <span className="text-white font-bold">R${mentor.hourlyRate}</span>
                    <span className="text-slate-500">/h</span>
                </div>
                 <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <span>★</span>
                    <span>{mentor.rating}</span>
                    <span className="text-slate-600">({mentor.reviews})</span>
                </div>
              </div>
            </div>
            
            <button className="w-full py-3 bg-slate-800 text-slate-300 font-medium text-sm hover:bg-slate-700 transition-colors border-t border-slate-700">
              Ver Perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};