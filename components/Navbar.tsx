import React from 'react';
import { ViewState, UserRole } from '../types';
import { 
    IconLayoutDashboard, 
    IconSearch, 
    IconUser, 
    IconCode, 
    IconBook, 
    IconSend, 
    IconClock, 
    IconBarChart,
    IconLogOut,
    IconHelp,
    IconAward,
    IconCalendar,
    IconShield,
    IconAlertTriangle
} from './Icons';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  userRole: UserRole;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, userRole, onLogout }) => {
  
  let navItems = [];

  // Estrutura de Navegação conforme PDF (Traduzida)
  if (userRole === UserRole.MENTEE) {
    navItems = [
        { id: 'DASHBOARD', label: 'Dashboard', icon: IconLayoutDashboard },
        { id: 'FIND_MENTOR', label: 'Buscar Mentores', icon: IconSearch },
        { id: 'MY_SESSIONS', label: 'Minhas Sessões', icon: IconClock },
        { id: 'REPOSITORY', label: 'Repositório', icon: IconBook },
        { id: 'GAMIFICATION', label: 'Gamificação', icon: IconAward },
        { id: 'REPORTS', label: 'Relatórios', icon: IconBarChart },
        { id: 'REPORTS', label: 'Suporte', icon: IconHelp },
    ];
  } else if (userRole === UserRole.MENTOR) {
      navItems = [
          { id: 'DASHBOARD', label: 'Dashboard', icon: IconLayoutDashboard },
          { id: 'REQUESTS', label: 'Solicitações', icon: IconSend },
          { id: 'AVAILABILITY', label: 'Disponibilidade', icon: IconCalendar },
          { id: 'HISTORY', label: 'Histórico', icon: IconClock },
          { id: 'REPOSITORY', label: 'Repositório', icon: IconBook },
          { id: 'GAMIFICATION', label: 'Gamificação', icon: IconAward },
          { id: 'REPORTS', label: 'Relatórios', icon: IconBarChart },
          { id: 'REPORTS', label: 'Suporte', icon: IconHelp },
      ];
  } else if (userRole === UserRole.ADMIN) {
      navItems = [
          { id: 'ADMIN_DASHBOARD', label: 'Moderação', icon: IconShield },
          { id: 'ADMIN_DASHBOARD', label: 'Usuários', icon: IconUser },
          { id: 'ADMIN_DASHBOARD', label: 'Disputas', icon: IconAlertTriangle },
          { id: 'REPORTS', label: 'Relatórios', icon: IconBarChart },
          { id: 'SETTINGS', label: 'Configurações', icon: IconCode },
      ];
  }

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 z-50">
      <div className="mb-8 p-2 bg-primary-600 rounded-xl text-white">
        <IconCode className="w-6 h-6" />
      </div>

      <div className="flex flex-col gap-6 w-full">
        {navItems.map((item, idx) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={`${item.id}-${idx}`}
              onClick={() => setView(item.id as ViewState)}
              className={`relative group w-full flex justify-center py-3 transition-colors
                ${isActive ? 'text-primary-400' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full" />
              )}
              <Icon className="w-6 h-6" />
              {/* Tooltip */}
              <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto mb-4 flex flex-col items-center gap-4">
        <button onClick={onLogout} className="text-slate-500 hover:text-red-400 transition-colors" title="Sair">
            <IconLogOut className="w-6 h-6" />
        </button>
        <img src="https://picsum.photos/id/64/200/200" className="w-10 h-10 rounded-full border-2 border-slate-700 hover:border-slate-500 transition-colors cursor-pointer" alt="Perfil" />
      </div>
    </nav>
  );
};