import React, { useState } from 'react';
import { MOCK_PROBLEMS } from '../constants';
import { Problem } from '../types';
import { Editor } from '../components/WarRoom/Editor';
import { IconCheckCircle, IconCode } from '../components/Icons';
import { VALIDATION_RULES } from '../utils/validation';
import { useToast } from '../context/ToastContext';

export const Repository: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  
  const { addToast } = useToast();

  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setOutput('');
  };

  const handleSubmitSolution = () => {
      if (code.length > VALIDATION_RULES.CODE_MAX_LENGTH) {
          addToast('Código da solução muito longo.', 'error');
          return;
      }
      addToast('Solução enviada com sucesso!', 'success');
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400';
    }
  };

  const getDifficultyLabel = (diff: string) => {
      switch (diff) {
          case 'Easy': return 'Fácil';
          case 'Medium': return 'Médio';
          case 'Hard': return 'Difícil';
          default: return diff;
      }
  };

  if (selectedProblem) {
    return (
      <div className="h-screen flex flex-col pt-4">
        <div className="px-8 mb-4 flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setSelectedProblem(null)}
                    className="text-slate-400 hover:text-white transition-colors"
                >
                    ← Voltar
                </button>
                <h2 className="text-xl font-bold text-white">{selectedProblem.title}</h2>
                <span className={`px-2 py-0.5 rounded text-xs border ${getDifficultyColor(selectedProblem.difficulty)}`}>
                    {getDifficultyLabel(selectedProblem.difficulty)}
                </span>
            </div>
            <button 
                onClick={handleSubmitSolution}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
                Enviar Solução
            </button>
        </div>

        <div className="flex-1 flex overflow-hidden border-t border-slate-800">
          <div className="w-1/3 bg-slate-900 border-r border-slate-800 p-6 overflow-y-auto">
             <h3 className="text-lg font-bold text-white mb-4">Descrição</h3>
             <p className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">{selectedProblem.description}</p>
             
             <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {selectedProblem.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">
                            {tag}
                        </span>
                    ))}
                </div>
             </div>

             <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-300">Soluções da Comunidade</span>
                    <span className="text-xs text-slate-500">{selectedProblem.acceptanceRate}% Aceitação</span>
                </div>
                <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded text-sm transition-colors">
                    Ver Outras Soluções
                </button>
             </div>
          </div>

          <div className="w-2/3 flex flex-col p-2 bg-slate-950">
             <Editor 
                code={code} 
                setCode={setCode} 
                onOutput={(out, exp) => setOutput(`Saída: ${out}\nNota: ${exp}`)} 
            />
            {output && (
                <div className="h-32 bg-slate-900 border-t border-slate-800 p-4 font-mono text-sm text-slate-300 overflow-y-auto">
                    <pre>{output}</pre>
                </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Repositório de Problemas</h1>
        <p className="text-slate-400 mt-2">Pratique com mais de 2000 problemas curados.</p>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Título</th>
              <th className="px-6 py-4 font-medium">Dificuldade</th>
              <th className="px-6 py-4 font-medium">Tags</th>
              <th className="px-6 py-4 font-medium">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_PROBLEMS.map((problem, idx) => (
              <tr key={problem.id} className="hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4">
                    {idx === 0 ? <IconCheckCircle className="text-green-500 w-5 h-5" /> : <div className="w-5 h-5 rounded-full border border-slate-600" />}
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-white block">{problem.title}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                    {getDifficultyLabel(problem.difficulty)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {problem.tags.slice(0, 2).map(tag => (
                         <span key={tag} className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleSelectProblem(problem)}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg text-sm font-medium transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Resolver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};