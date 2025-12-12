import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { MentorDashboard } from './pages/MentorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { FindMentor } from './pages/FindMentor';
import { WarRoom } from './pages/WarRoom';
import { Repository } from './pages/Repository';
import { Requests } from './pages/Requests';
import { Availability } from './pages/Availability';
import { History } from './pages/History';
import { Auth } from './pages/Auth';
import { Onboarding } from './pages/Onboarding';
import { Gamification } from './pages/Gamification';
import { Reports } from './pages/Reports';
import { ViewState, UserRole } from './types';
import { checkAiAvailability } from './services/geminiService';
import { MOCK_USER, MOCK_MENTOR_USER, MOCK_ADMIN_USER } from './constants';
import { ToastProvider } from './context/ToastContext';
import { initializeStorage, getStoredData } from './services/storageService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('AUTH');
  const [currentUser, setCurrentUser] = useState(MOCK_USER);
  const [hasApiKey] = useState(checkAiAvailability());

  useEffect(() => {
    initializeStorage();
  }, []);

  const handleLogin = (role: UserRole) => {
    // Carrega usuário persistido se existir
    const stored = getStoredData();
    
    if (role === UserRole.MENTOR) {
        setCurrentUser(MOCK_MENTOR_USER);
        setView('DASHBOARD');
    } else if (role === UserRole.ADMIN) {
        setCurrentUser(MOCK_ADMIN_USER);
        setView('ADMIN_DASHBOARD');
    } else {
        // Usa o usuário mockado ou o armazenado se disponível
        setCurrentUser(stored.user || MOCK_USER);
        // Mentee Flow: Força onboarding se não tiver nome (simulação)
        if (stored.user && stored.user.name) {
             setView('DASHBOARD');
        } else {
             setView('ONBOARDING');
        }
    }
  };

  const handleOnboardingComplete = (data: any) => {
      // Mescla dados no estado atual
      setCurrentUser({ ...currentUser, ...data });
      setView('DASHBOARD');
  };

  const handleLogout = () => {
    setView('AUTH');
  };

  const handleJoinSession = () => {
    setView('WAR_ROOM');
  };

  const renderContent = () => {
      if (view === 'AUTH') return <Auth onLogin={handleLogin} />;
      if (view === 'ONBOARDING') return <Onboarding onComplete={handleOnboardingComplete} />;
      if (view === 'WAR_ROOM') return <WarRoom onLeave={() => setView('DASHBOARD')} />;

      return (
        <div className="flex">
            <Navbar 
                currentView={view} 
                setView={setView} 
                userRole={currentUser.role} 
                onLogout={handleLogout}
            />
            <main className="pl-20 min-h-screen w-full">
                {!hasApiKey && (
                    <div className="bg-orange-500/10 border-b border-orange-500/20 text-orange-400 px-4 py-2 text-xs text-center">
                        Aviso: Chave da API Gemini não encontrada. Recursos de IA (Matching, Execução) serão simulados.
                    </div>
                )}

                {view === 'DASHBOARD' && (
                    currentUser.role === UserRole.MENTOR ? 
                    <MentorDashboard onNavigate={(path) => setView(path as ViewState)} /> :
                    currentUser.role === UserRole.ADMIN ?
                    <AdminDashboard /> :
                    <Dashboard onJoinSession={handleJoinSession} />
                )}
                
                {view === 'ADMIN_DASHBOARD' && <AdminDashboard />}
                {view === 'FIND_MENTOR' && <FindMentor />}
                
                {view === 'REPOSITORY' && <Repository />}
                {view === 'REQUESTS' && <Requests />}
                {view === 'AVAILABILITY' && <Availability />}
                {view === 'HISTORY' && <History />}
                {view === 'MY_SESSIONS' && <History />}
                
                {view === 'GAMIFICATION' && <Gamification />}
                {view === 'REPORTS' && <Reports />}
                
                {view === 'SETTINGS' && (
                <div className="p-8 text-center text-slate-500 mt-20">
                    Configurações (Placeholder)
                </div>
                )}
            </main>
        </div>
      );
  };

  return (
    <ToastProvider>
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-primary-500/30">
            {renderContent()}
        </div>
    </ToastProvider>
  );
};

export default App;