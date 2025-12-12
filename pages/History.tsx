import React, { useState, useEffect } from 'react';
import { PAST_SESSIONS } from '../constants';
import { IconCheckCircle } from '../components/Icons';
import { getStoredData } from '../services/storageService';
import { Session } from '../types';

export const History: React.FC = () => {
  const [history, setHistory] = useState<Session[]>([]);

  useEffect(() => {
    const data = getStoredData();
    if(data.sessions.length > 0) {
        setHistory(data.sessions.filter(s => s.status === 'COMPLETED'));
    } else {
        setHistory(PAST_SESSIONS);
    }
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Histórico de Sessões</h1>
      
      <div className="space-y-4">
        {history.map(session => (
            <div key={session.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">{session.topic}</h3>
                    <p className="text-slate-400 text-sm">com {session.mentorName} • {session.date}</p>
                </div>
                <div className="text-right">
                    <div className="inline-flex items-center gap-1 text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-xs font-bold mb-2">
                        <IconCheckCircle className="w-3 h-3" /> Concluída
                    </div>
                    <div className="text-yellow-500 text-sm">
                        {'★'.repeat(session.rating || 0)}
                    </div>
                </div>
            </div>
        ))}
        {history.length === 0 && (
            <p className="text-slate-500 text-center">Nenhuma sessão anterior encontrada.</p>
        )}
      </div>
    </div>
  );
};