import React, { useState } from 'react';
import { IconPlay, IconZap } from '../Icons';
import { executeCodeWithAi } from '../../services/geminiService';

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
  onOutput: (output: string, explanation: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ code, setCode, onOutput }) => {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleRun = async () => {
    setIsExecuting(true);
    onOutput("Executando...", "Consultando o motor de IA...");
    
    // Simula delay de rede para realismo
    setTimeout(async () => {
      const result = await executeCodeWithAi(code, 'javascript');
      onOutput(result.output, result.explanation);
      setIsExecuting(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
      {/* Toolbar */}
      <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">main.js</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 text-[10px]">JavaScript</span>
        </div>
        <button
          onClick={handleRun}
          disabled={isExecuting}
          className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-medium transition-colors
            ${isExecuting ? 'bg-slate-700 text-slate-400 cursor-wait' : 'bg-primary-600 hover:bg-primary-500 text-white'}`}
        >
          {isExecuting ? <IconZap className="w-3 h-3 animate-pulse" /> : <IconPlay className="w-3 h-3" />}
          {isExecuting ? 'Rodando...' : 'Executar Código'}
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative font-mono text-sm">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-slate-900 border-r border-slate-800 text-slate-600 text-right pr-2 pt-4 select-none">
            {code.split('\n').map((_, i) => (
                <div key={i} className="leading-relaxed">{i + 1}</div>
            ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-slate-950 text-slate-300 p-4 pl-10 resize-none focus:outline-none leading-relaxed"
          spellCheck={false}
        />
      </div>
    </div>
  );
};