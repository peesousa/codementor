import React from 'react';
import { IconAward, IconZap, IconUser } from '../components/Icons';

// Mock Ranking Data
const RANKING_DATA = [
    { rank: 1, name: 'Sarah Engenheira', points: 95400, badges: 12 },
    { rank: 2, name: 'Alex Dev', points: 4500, badges: 3 },
    { rank: 3, name: 'David Chen', points: 4200, badges: 5 },
    { rank: 4, name: 'Elena Silva', points: 3800, badges: 4 },
    { rank: 5, name: 'João Júnior', points: 1200, badges: 1 },
];

const BADGES = [
    { id: '1', name: 'Caçador de Bugs', desc: 'Resolveu 5 bugs difíceis', icon: '🐛' },
    { id: '2', name: 'Coruja', desc: 'Sessão após meia-noite', icon: '🦉' },
    { id: '3', name: 'Mentor do Mês', desc: 'Mentor melhor avaliado', icon: '🏆' },
    { id: '4', name: 'Mestre da Sequência', desc: 'Sequência de 10 dias', icon: '🔥' },
];

export const Gamification: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
        <header>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <IconAward className="text-yellow-500 w-8 h-8" />
                Ranking e Conquistas
            </h1>
            <p className="text-slate-400 mt-2">Compita com os top 100 desenvolvedores da comunidade.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ranking Table */}
            <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h3 className="font-bold text-white">Ranking Global (Top 100)</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Posição</th>
                            <th className="px-6 py-4">Usuário</th>
                            <th className="px-6 py-4">Emblemas</th>
                            <th className="px-6 py-4 text-right">Pontos</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-sm">
                        {RANKING_DATA.map((user) => (
                            <tr key={user.rank} className={`hover:bg-slate-800/50 ${user.rank === 1 ? 'bg-yellow-500/5' : ''}`}>
                                <td className="px-6 py-4">
                                    <span className={`
                                        w-8 h-8 rounded-full flex items-center justify-center font-bold
                                        ${user.rank === 1 ? 'bg-yellow-500 text-slate-900' : 
                                          user.rank === 2 ? 'bg-slate-300 text-slate-900' : 
                                          user.rank === 3 ? 'bg-orange-700 text-white' : 'bg-slate-800 text-slate-400'}
                                    `}>
                                        {user.rank}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                    <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                                        <IconUser className="w-4 h-4 text-slate-500" />
                                    </div>
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 text-slate-400">{user.badges}</td>
                                <td className="px-6 py-4 text-right font-mono text-primary-400">{user.points.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Badges Grid */}
            <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-4">Seus Emblemas</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {BADGES.map(badge => (
                            <div key={badge.id} className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center text-center gap-2 hover:border-slate-700 transition-colors cursor-help group relative">
                                <span className="text-3xl">{badge.icon}</span>
                                <span className="text-xs font-bold text-slate-300">{badge.name}</span>
                                
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {badge.desc}
                                </div>
                            </div>
                        ))}
                        {[1,2,3,4].map(i => (
                            <div key={`locked-${i}`} className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50 flex flex-col items-center text-center gap-2 opacity-50 grayscale">
                                <span className="text-3xl">🔒</span>
                                <span className="text-xs font-bold text-slate-600">Bloqueado</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary-900/50 to-slate-900 border border-primary-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <IconZap className="text-yellow-400 w-6 h-6" />
                        <h3 className="font-bold text-white">Próximo Marco</h3>
                    </div>
                    <p className="text-sm text-slate-300 mb-4">Alcance 5.000 pontos para desbloquear "Code Ninja".</p>
                    <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[90%]" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>4500</span>
                        <span>5000</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};