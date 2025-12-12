import React, { useState, useEffect } from 'react';
import { MOCK_REQUESTS } from '../constants';
import { SessionRequest, RequestStatus } from '../types';
import { IconCheckCircle, IconXCircle, IconClock } from '../components/Icons';
import { getStoredData, saveStoredData } from '../services/storageService';

export const Requests: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | RequestStatus>('ALL');
  const [requests, setRequests] = useState<SessionRequest[]>([]);

  useEffect(() => {
    const data = getStoredData();
    if (data.requests.length === 0) {
        setRequests(MOCK_REQUESTS);
    } else {
        setRequests(data.requests);
    }
  }, []);

  const filteredRequests = requests.filter(r => filter === 'ALL' || r.status === filter);

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    const updated = requests.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setRequests(updated);
    saveStoredData({ requests: updated });
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'PENDING': return <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded text-xs">Pendente</span>;
      case 'ACCEPTED': return <span className="px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded text-xs">Aceito</span>;
      case 'REJECTED': return <span className="px-2 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded text-xs">Rejeitado</span>;
    }
  };

  const getFilterLabel = (f: string) => {
      switch(f) {
          case 'ALL': return 'Todas';
          case 'PENDING': return 'Pendentes';
          case 'ACCEPTED': return 'Aceitas';
          case 'REJECTED': return 'Rejeitadas';
          default: return f;
      }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Solicitações de Sessão</h1>

      <div className="flex gap-4 mb-6 border-b border-slate-800 pb-4">
        {['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'].map(f => (
            <button 
                key={f}
                onClick={() => setFilter(f as any)}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${filter === f ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}
            >
                {getFilterLabel(f)}
            </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredRequests.map(req => (
            <div key={req.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <img src={req.requesterAvatar} alt="" className="w-16 h-16 rounded-full border-2 border-slate-700" />
                
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg font-bold text-white">{req.requesterName}</h3>
                            <p className="text-slate-400 text-sm">{req.topic}</p>
                        </div>
                        {getStatusBadge(req.status)}
                    </div>
                    
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-sm text-slate-300 mb-3">
                        "{req.message}"
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <IconClock className="w-4 h-4" />
                        Data proposta: {req.proposedDate}
                    </div>
                </div>

                {req.status === 'PENDING' && (
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleStatusChange(req.id, 'ACCEPTED')}
                            className="p-2 bg-green-500/20 text-green-500 hover:bg-green-500/30 rounded-lg transition-colors"
                            title="Aceitar"
                        >
                            <IconCheckCircle className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => handleStatusChange(req.id, 'REJECTED')}
                            className="p-2 bg-red-500/20 text-red-500 hover:bg-red-500/30 rounded-lg transition-colors"
                            title="Rejeitar"
                        >
                            <IconXCircle className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </div>
        ))}
        {filteredRequests.length === 0 && (
            <div className="text-center py-12 text-slate-500">
                Nenhuma solicitação encontrada nesta categoria.
            </div>
        )}
      </div>
    </div>
  );
};