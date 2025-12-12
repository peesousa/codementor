import React, { useState, useEffect } from 'react';
import { Editor } from '../components/WarRoom/Editor';
import { Whiteboard } from '../components/WarRoom/Whiteboard';
import { INITIAL_CODE } from '../constants';
import { IconVideo, IconMic, IconSend, IconZap, IconSignal } from '../components/Icons';
import { ChatMessage } from '../types';
import { validateLimits, VALIDATION_RULES } from '../utils/validation';
import { useToast } from '../context/ToastContext';

interface WarRoomProps {
  onLeave: () => void;
}

export const WarRoom: React.FC<WarRoomProps> = ({ onLeave }) => {
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState('');
  const [explanation, setExplanation] = useState('');
  const [activeTab, setActiveTab] = useState<'CHAT' | 'WHITEBOARD' | 'OUTPUT'>('CHAT');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Sistema', text: 'Conectado à sessão.', timestamp: new Date(), isSystem: true },
  ]);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'Conectado' | 'Desconectado'>('Conectado');
  const [latency, setLatency] = useState(45); // Latência simulada ms
  
  const { addToast } = useToast();

  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
        const lat = Math.floor(Math.random() * 80) + 20;
        setLatency(lat);
        setConnectionStatus(lat > 500 ? 'Desconectado' : 'Conectado');
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleOutput = (out: string, exp: string) => {
    setOutput(out);
    setExplanation(exp);
    setActiveTab('OUTPUT');
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    if (!validateLimits(chatInput, VALIDATION_RULES.CHAT_MSG_MAX_LENGTH)) {
        addToast(`Mensagem muito longa. Limite é ${VALIDATION_RULES.CHAT_MSG_MAX_LENGTH} caracteres.`, 'error');
        return;
    }

    const newMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'Eu',
        text: chatInput,
        timestamp: new Date()
    };
    setMessages([...messages, newMsg]);
    setChatInput('');
  };

  const handleCodeChange = (newCode: string) => {
      if (newCode.length > VALIDATION_RULES.CODE_MAX_LENGTH) {
          return; 
      }
      setCode(newCode);
  };

  const handleEndSession = () => {
      setShowFeedback(true);
  };

  const submitFeedback = () => {
      if (comment.length > VALIDATION_RULES.FEEDBACK_COMMENT_MAX_LENGTH) {
          addToast('Comentário muito longo.', 'error');
          return;
      }
      if (rating === 0) {
          addToast('Por favor, selecione uma avaliação.', 'warning');
          return;
      }
      addToast('Sessão encerrada e feedback enviado!', 'success');
      onLeave();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 overflow-hidden relative">
      
      {showFeedback && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl animate-fade-in">
                  <h2 className="text-2xl font-bold text-white mb-2">Sessão Concluída!</h2>
                  <p className="text-slate-400 mb-6">Por favor, avalie sua experiência com o mentor.</p>
                  
                  <div className="flex justify-center gap-2 mb-6">
                      {[1, 2, 3, 4, 5].map(star => (
                          <button 
                            key={star} 
                            onClick={() => setRating(star)}
                            className={`text-3xl transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-slate-700'}`}
                          >
                            ★
                          </button>
                      ))}
                  </div>
                  
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escreva uma breve avaliação (max 1000 chars)..."
                    className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:outline-none mb-2"
                  />
                  <p className="text-right text-xs text-slate-500 mb-6">{comment.length}/1000</p>

                  <button 
                    onClick={submitFeedback}
                    className="w-full bg-primary-600 hover:bg-primary-500 text-white py-3 rounded-lg font-bold"
                  >
                      Enviar & Sair
                  </button>
              </div>
          </div>
      )}

      <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                <div className={`w-2 h-2 rounded-full ${connectionStatus === 'Conectado' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-xs text-slate-300 font-mono">{connectionStatus}</span>
                <span className="text-[10px] text-slate-500 border-l border-slate-600 pl-2 ml-1">{latency}ms</span>
            </div>
            <span className="text-slate-400 text-sm">Simulação de Entrevista: System Design</span>
        </div>
        <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors" onClick={handleEndSession}>
                Encerrar Sessão
            </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        <div className="flex-[0.65] p-2 flex flex-col min-w-0">
           <Editor code={code} setCode={handleCodeChange} onOutput={handleOutput} />
           <div className="absolute bottom-4 left-4 text-[10px] text-slate-600 font-mono pointer-events-none">
               Chars: {code.length}/{VALIDATION_RULES.CODE_MAX_LENGTH}
           </div>
        </div>

        <div className="flex-[0.35] bg-slate-900 border-l border-slate-800 flex flex-col min-w-[320px]">
            
            <div className="h-48 bg-black relative border-b border-slate-800 group">
                <img 
                    src="https://picsum.photos/id/65/600/400" 
                    className={`w-full h-full object-cover opacity-80 ${!camOn ? 'grayscale' : ''}`} 
                    alt="Mentor" 
                />
                
                <div className="absolute bottom-4 right-4 w-24 h-16 bg-slate-800 rounded-lg overflow-hidden border border-slate-600 shadow-lg">
                    <div className="w-full h-full bg-slate-700 flex items-center justify-center text-xs text-slate-500">
                        Você
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2">
                    <button onClick={() => setMicOn(!micOn)} className={`p-2 rounded-full ${micOn ? 'bg-slate-800/80 text-white' : 'bg-red-500 text-white'}`}>
                        <IconMic className="w-4 h-4" />
                    </button>
                    <button onClick={() => setCamOn(!camOn)} className={`p-2 rounded-full ${camOn ? 'bg-slate-800/80 text-white' : 'bg-red-500 text-white'}`}>
                        <IconVideo className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex border-b border-slate-800">
                <button 
                    onClick={() => setActiveTab('CHAT')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'CHAT' ? 'border-primary-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    Chat
                </button>
                 <button 
                    onClick={() => setActiveTab('WHITEBOARD')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'WHITEBOARD' ? 'border-primary-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    Quadro
                </button>
                 <button 
                    onClick={() => setActiveTab('OUTPUT')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'OUTPUT' ? 'border-primary-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    Console
                </button>
            </div>

            <div className="flex-1 overflow-hidden relative">
                {activeTab === 'CHAT' && (
                    <div className="absolute inset-0 flex flex-col">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender === 'Eu' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${msg.isSystem ? 'bg-slate-800 text-slate-400 w-full text-center italic' : msg.sender === 'Eu' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
                                        {msg.text}
                                    </div>
                                    {!msg.isSystem && <span className="text-[10px] text-slate-600 mt-1">{msg.sender}</span>}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={sendMessage} className="p-4 border-t border-slate-800 flex gap-2 relative">
                            <input 
                                className="flex-1 bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                                placeholder="Digite uma mensagem..."
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                            />
                             <span className="absolute bottom-1 right-14 text-[9px] text-slate-600">{chatInput.length}</span>
                            <button type="submit" className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-500">
                                <IconSend className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'WHITEBOARD' && (
                    <div className="absolute inset-0 p-2">
                        <Whiteboard />
                    </div>
                )}

                {activeTab === 'OUTPUT' && (
                    <div className="absolute inset-0 p-4 overflow-y-auto font-mono text-sm">
                        <div className="mb-4">
                            <span className="text-slate-500 block text-xs mb-1">Resultado da Execução:</span>
                            <pre className="text-green-400 bg-slate-950 p-3 rounded border border-slate-800 overflow-x-auto">
                                {output || "// Sem output ainda. Execute o código."}
                            </pre>
                        </div>
                        {explanation && (
                            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded">
                                <span className="text-blue-400 block text-xs font-bold mb-1 flex items-center gap-1">
                                    <IconZap className="w-3 h-3" /> Insight da IA
                                </span>
                                <p className="text-slate-300">{explanation}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};