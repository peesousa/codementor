import React, { useState } from 'react';
import { IconDownload, IconHelp, IconAlertTriangle } from '../components/Icons';
import { useToast } from '../context/ToastContext';

export const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'REPORTS' | 'SUPPORT'>('REPORTS');
  const [bugDesc, setBugDesc] = useState('');
  const { addToast } = useToast();

  const handleDownload = (format: 'JSON' | 'PDF') => {
      addToast(`Baixando relatório em formato ${format}...`, 'success');
  };

  const handleBugSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addToast('Relatório de bug enviado com sucesso para o suporte.', 'success');
      setBugDesc('');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white">Relatórios & Suporte</h1>
                <p className="text-slate-400 mt-2">Acompanhe o progresso e obtenha ajuda.</p>
            </div>
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                    onClick={() => setActiveTab('REPORTS')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'REPORTS' ? 'bg-slate-800 text-white shadow' : 'text-slate-400'}`}
                >
                    Meus Relatórios
                </button>
                <button
                    onClick={() => setActiveTab('SUPPORT')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'SUPPORT' ? 'bg-slate-800 text-white shadow' : 'text-slate-400'}`}
                >
                    Suporte & FAQ
                </button>
            </div>
        </header>

        {activeTab === 'REPORTS' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-4">Progresso da Mentoria</h3>
                    <p className="text-sm text-slate-400 mb-6">Análise detalhada das suas sessões, habilidades adquiridas e feedback recebido.</p>
                    <div className="flex gap-3">
                        <button onClick={() => handleDownload('JSON')} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm border border-slate-700 transition-colors">
                            <IconDownload className="w-4 h-4" /> Exportar JSON
                        </button>
                        <button onClick={() => handleDownload('PDF')} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm border border-slate-700 transition-colors">
                            <IconDownload className="w-4 h-4" /> Exportar PDF
                        </button>
                    </div>
                </div>

                 <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 opacity-60">
                    <h3 className="font-bold text-white mb-4">Relatórios Financeiros (Apenas Mentores)</h3>
                    <p className="text-sm text-slate-400 mb-6">Histórico de ganhos e status de pagamento.</p>
                     <div className="flex gap-3">
                        <button disabled className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-500 rounded-lg text-sm border border-slate-700 cursor-not-allowed">
                            <IconDownload className="w-4 h-4" /> Exportar CSV
                        </button>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'SUPPORT' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* FAQ Section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">Perguntas Frequentes (FAQ)</h3>
                    <div className="space-y-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <h4 className="font-bold text-slate-200 mb-2">Como funciona o sistema de matching?</h4>
                            <p className="text-sm text-slate-400">Nosso algoritmo de IA analisa suas lacunas de habilidades e interesses para sugerir os melhores mentores disponíveis no seu fuso horário.</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <h4 className="font-bold text-slate-200 mb-2">Posso gravar as sessões?</h4>
                            <p className="text-sm text-slate-400">Sim, as sessões são gravadas automaticamente de forma segura e ficam disponíveis para reprodução por 30 dias.</p>
                        </div>
                         <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <h4 className="font-bold text-slate-200 mb-2">O que acontece se um mentor não aparecer?</h4>
                            <p className="text-sm text-slate-400">Você pode reportar o problema aqui. Os créditos serão reembolsados e o mentor penalizado.</p>
                        </div>
                    </div>
                </div>

                {/* Bug Report Form */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-fit">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <IconAlertTriangle className="text-red-500" />
                        Reportar um Problema
                    </h3>
                    <form onSubmit={handleBugSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Descrição do Problema</label>
                            <textarea 
                                value={bugDesc}
                                onChange={(e) => setBugDesc(e.target.value)}
                                className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 resize-none text-sm"
                                placeholder="Descreva o bug ou problema que você encontrou..."
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 py-2 rounded-lg font-medium transition-colors">
                            Enviar Relatório
                        </button>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};