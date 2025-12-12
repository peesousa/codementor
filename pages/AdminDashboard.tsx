import React, { useState } from 'react';
import { 
  IconUser, 
  IconBarChart, 
  IconZap, 
  IconShield, 
  IconTrash, 
  IconAlertTriangle, 
  IconCheckCircle, 
  IconXCircle,
  IconMoreHorizontal
} from '../components/Icons';
import { UserRole } from '../types';

// Mock Data para Admin (Traduzido)
const ADMIN_USERS = [
  { id: '1', name: 'Sarah Engenheira', role: UserRole.MENTOR, status: 'VERIFIED', joinDate: '2023-01-15', reports: 0 },
  { id: '2', name: 'João Júnior', role: UserRole.MENTEE, status: 'ACTIVE', joinDate: '2023-06-20', reports: 1 },
  { id: '3', name: 'Spam Bot 3000', role: UserRole.MENTEE, status: 'BANNED', joinDate: '2023-08-01', reports: 12 },
  { id: '4', name: 'David Chen', role: UserRole.MENTOR, status: 'VERIFIED', joinDate: '2023-02-10', reports: 0 },
  { id: '5', name: 'Alice Silva', role: UserRole.MENTEE, status: 'ACTIVE', joinDate: '2023-07-05', reports: 0 },
];

const ADMIN_DISPUTES = [
  { id: 'D-102', reporter: 'João Júnior', accused: 'MentorX (Deletado)', type: 'NO_SHOW', status: 'RESOLVED', date: '2023-10-01' },
  { id: 'D-104', reporter: 'Alice Silva', accused: 'Beto Coder', type: 'HARASSMENT', status: 'PENDING', date: '2023-10-05' },
  { id: 'D-105', reporter: 'Sarah Engenheira', accused: 'NovoUsuario123', type: 'PAYMENT_FAIL', status: 'INVESTIGATING', date: '2023-10-06' },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'USERS' | 'DISPUTES'>('OVERVIEW');

  // KPI Cards Component
  const MetricCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-start justify-between hover:border-slate-700 transition-colors">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className={`text-xs ${color}`}>{sub}</p>
      </div>
      <div className={`p-3 rounded-lg ${color.replace('text', 'bg').replace('500', '500/10')}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <IconShield className="text-primary-500 w-8 h-8" />
            Centro de Comando Admin
          </h1>
          <p className="text-slate-400 mt-2">Observabilidade e governança do sistema.</p>
        </div>
        
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          {[
              { id: 'OVERVIEW', label: 'Visão Geral' },
              { id: 'USERS', label: 'Usuários' },
              { id: 'DISPUTES', label: 'Disputas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-slate-800 text-white shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6 animate-fade-in">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Receita Total" 
              value="R$ 45.200" 
              sub="+15% vs mês passado" 
              icon={IconBarChart} 
              color="text-green-500" 
            />
            <MetricCard 
              title="Usuários Ativos" 
              value="12.450" 
              sub="+120 novos hoje" 
              icon={IconUser} 
              color="text-blue-500" 
            />
             <MetricCard 
              title="Sessões Ao Vivo" 
              value="85" 
              sub="Pico: 92" 
              icon={IconZap} 
              color="text-yellow-500" 
            />
             <MetricCard 
              title="Disputas Abertas" 
              value="3" 
              sub="Atenção necessária" 
              icon={IconAlertTriangle} 
              color="text-red-500" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Health */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-white mb-6">Saúde do Sistema & Infraestrutura</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Latência API (Global)</span>
                    <span className="text-green-400 font-mono">45ms</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[20%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Nós de Execução (Carga CPU)</span>
                    <span className="text-yellow-400 font-mono">78%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[78%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Pool de Conexão (DB)</span>
                    <span className="text-blue-400 font-mono">340/1000</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[34%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Actions Feed */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-white mb-4">Log de Auditoria</h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-300">Nova Mentora Aprovada: <span className="text-white">Elena S.</span></p>
                    <p className="text-xs text-slate-500">2 min atrás</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-300">Login Suspeito Bloqueado</p>
                    <p className="text-xs text-slate-500">15 min atrás • IP 192.168.x.x</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-300">Pagamento Processado: Lote #402</p>
                    <p className="text-xs text-slate-500">1 hora atrás</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === 'USERS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-white">Gerenciamento de Usuários</h3>
            <div className="flex gap-2">
               <input placeholder="Buscar usuários..." className="bg-slate-950 border border-slate-700 text-sm text-white px-3 py-1.5 rounded-lg focus:outline-none" />
               <button className="bg-primary-600 px-3 py-1.5 rounded-lg text-sm text-white">Exportar CSV</button>
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Papel</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Entrou em</th>
                <th className="px-6 py-4">Denúncias</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {ADMIN_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'MENTOR' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1 ${
                        user.status === 'VERIFIED' ? 'bg-green-500/10 text-green-500' :
                        user.status === 'BANNED' ? 'bg-red-500/10 text-red-500' :
                        'bg-slate-700 text-slate-300'
                     }`}>
                        {user.status === 'VERIFIED' && <IconCheckCircle className="w-3 h-3" />}
                        {user.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{user.joinDate}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {user.reports > 0 ? <span className="text-red-400 font-bold">{user.reports}</span> : '0'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                      <IconMoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DISPUTES TAB */}
      {activeTab === 'DISPUTES' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-fade-in">
           <div className="p-4 border-b border-slate-800">
            <h3 className="font-bold text-white">Centro de Resolução de Disputas</h3>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4">ID Caso</th>
                <th className="px-6 py-4">Partes</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {ADMIN_DISPUTES.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-300 font-mono">{dispute.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-white text-xs">De: {dispute.reporter}</span>
                        <span className="text-red-400 text-xs">Contra: {dispute.accused}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs text-slate-300 border border-slate-700">
                        {dispute.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                        dispute.status === 'PENDING' ? 'text-yellow-500 bg-yellow-500/10' : 
                        dispute.status === 'RESOLVED' ? 'text-green-500 bg-green-500/10' :
                        'text-orange-500 bg-orange-500/10'
                    }`}>
                        {dispute.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{dispute.date}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                     <button title="Ver Evidências" className="p-1.5 bg-blue-500/10 text-blue-500 rounded hover:bg-blue-500/20">
                        <IconShield className="w-4 h-4" />
                     </button>
                     <button title="Fechar Caso" className="p-1.5 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20">
                        <IconCheckCircle className="w-4 h-4" />
                     </button>
                     <button title="Banir Usuário" className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20">
                        <IconTrash className="w-4 h-4" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};