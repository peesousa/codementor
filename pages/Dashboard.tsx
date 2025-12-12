import React, { useState, useEffect } from 'react';
import { MOCK_USER, UPCOMING_SESSIONS } from '../constants';
import { IconAward, IconCalendar, IconZap, IconCode } from '../components/Icons';
import { Session } from '../types';
import { getStoredData } from '../services/storageService';

interface DashboardProps {
  onJoinSession: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onJoinSession }) => {
  const [sessions, setSessions] = useState<Session[]>(UPCOMING_SESSIONS);

  useEffect(() => {
    // Carrega dados persistidos
    const data = getStoredData();
    if(data.sessions) {
        setSessions(data.sessions.filter(s => s.status === 'UPCOMING'));
    }
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Bem-vindo, {MOCK_USER.name}</h1>
          <p className="text-slate-400 mt-2">Pronto para evoluir suas habilidades de engenharia?</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 px-3">
            <IconZap className="text-yellow-400 w-5 h-5" />
            <div>
              <p className="text-xs text-slate-400">Sequência</p>
              <p className="font-bold text-white">{MOCK_USER.streak} Dias</p>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div className="flex items-center gap-2 px-3">
            <IconAward className="text-purple-400 w-5 h-5" />
            <div>
              <p className="text-xs text-slate-400">Nível</p>
              <p className="font-bold text-white">{MOCK_USER.level}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <IconCalendar className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-200">Próximas Sessões</h3>
          </div>
          <div className="space-y-3">
            {sessions.length > 0 ? sessions.map((session: Session) => (
              <div key={session.id} className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 flex justify-between items-center hover:border-slate-700 transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">{session.topic}</p>
                  <p className="text-xs text-slate-500">{session.mentorName} • {session.date}</p>
                </div>
                <button 
                  onClick={onJoinSession}
                  className="px-3 py-1 bg-primary-600 hover:bg-primary-500 text-white text-xs rounded-md transition-colors"
                >
                  Entrar
                </button>
              </div>
            )) : (
                <p className="text-sm text-slate-500">Nenhuma sessão agendada.</p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
              <IconCode className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-200">Árvore de Habilidades</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Estrutura de Dados</span>
                <span className="text-slate-500">75%</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-3/4" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">System Design</span>
                <span className="text-slate-500">40%</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-2/5" />
              </div>
            </div>
             <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">React & Performance</span>
                <span className="text-slate-500">90%</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[90%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
              <IconAward className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-200">Conquistas Recentes</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-center flex flex-col items-center justify-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-xs text-slate-400">Sequência Semanal</span>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-center flex flex-col items-center justify-center gap-2">
              <span className="text-2xl">🐛</span>
              <span className="text-xs text-slate-400">Caçador de Bugs</span>
            </div>
             <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-center flex flex-col items-center justify-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="text-xs text-slate-400">Deploy Realizado</span>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-center flex flex-col items-center justify-center gap-2 opacity-50 border-dashed">
              <span className="text-2xl grayscale">⚔️</span>
              <span className="text-xs text-slate-500">Bloqueado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};