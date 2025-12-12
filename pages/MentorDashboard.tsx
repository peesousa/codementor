import React, { useState, useEffect } from 'react';
import { MOCK_MENTOR_USER, UPCOMING_SESSIONS, MOCK_REQUESTS } from '../constants';
import { IconAward, IconBarChart, IconUser, IconCalendar } from '../components/Icons';
import { getStoredData } from '../services/storageService';

export const MentorDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [requestsCount, setRequestsCount] = useState(0);

  useEffect(() => {
      const data = getStoredData();
      const count = (data.requests.length > 0 ? data.requests : MOCK_REQUESTS)
        .filter(r => r.status === 'PENDING').length;
      setRequestsCount(count);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
       {/* Header */}
       <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Olá, Mentora {MOCK_MENTOR_USER.name}</h1>
          <p className="text-slate-400 mt-2">Você está impactando a próxima geração de desenvolvedores.</p>
        </div>
        <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 flex gap-4">
            <div className="px-4 text-center border-r border-slate-700">
                <div className="text-2xl font-bold text-green-400">R$1.250</div>
                <div className="text-xs text-slate-400">Ganhos (Out)</div>
            </div>
            <div className="px-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">4.9 ★</div>
                <div className="text-xs text-slate-400">Avaliação</div>
            </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><IconCalendar /></div>
                <span className="text-2xl font-bold text-white">8</span>
            </div>
            <p className="text-sm text-slate-400">Sessões nesta semana</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><IconUser /></div>
                <span className="text-2xl font-bold text-white">{requestsCount}</span>
            </div>
            <p className="text-sm text-slate-400">Solicitações Pendentes</p>
            {requestsCount > 0 && <button onClick={() => onNavigate('REQUESTS')} className="text-xs text-primary-400 mt-2 hover:underline">Ver Todas</button>}
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><IconBarChart /></div>
                <span className="text-2xl font-bold text-white">124h</span>
            </div>
            <p className="text-sm text-slate-400">Tempo Total de Mentoria</p>
        </div>
         <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><IconAward /></div>
                <span className="text-2xl font-bold text-white">Top 5%</span>
            </div>
            <p className="text-sm text-slate-400">Ranking de Mentores</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-white mb-4">Próximas Sessões</h3>
            <div className="space-y-3">
                 {UPCOMING_SESSIONS.map((session) => (
                    <div key={session.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                {session.topic.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{session.topic}</h4>
                                <p className="text-xs text-slate-500">{session.date}</p>
                            </div>
                        </div>
                        <button onClick={() => onNavigate('WAR_ROOM')} className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-500">
                            Iniciar Sala
                        </button>
                    </div>
                 ))}
            </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-white mb-4">Ações Rápidas</h3>
            <div className="space-y-2">
                <button onClick={() => onNavigate('AVAILABILITY')} className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-sm transition-colors text-slate-300">
                    Atualizar Disponibilidade
                </button>
                 <button onClick={() => onNavigate('REQUESTS')} className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-sm transition-colors text-slate-300">
                    Revisar Solicitações
                </button>
                 <button onClick={() => onNavigate('REPOSITORY')} className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-sm transition-colors text-slate-300">
                    Navegar nos Problemas
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};