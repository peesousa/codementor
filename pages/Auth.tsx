import React, { useState } from 'react';
import { UserRole } from '../types';
import { IconCode, IconUser, IconZap } from '../components/Icons';
import { validatePassword, validateEmail } from '../utils/validation';
import { useToast } from '../context/ToastContext';

interface AuthProps {
  onLogin: (role: UserRole) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.MENTEE);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
        addToast('Por favor, insira um email válido.', 'error');
        return;
    }

    if (!isLogin) {
        // Validação rigorosa de senha
        const pwCheck = validatePassword(password);
        if (!pwCheck.isValid) {
            addToast(pwCheck.error || 'Senha inválida', 'error');
            return;
        }
    } else {
        if (password.length < 1) {
            addToast('Por favor, insira sua senha.', 'error');
            return;
        }
    }

    addToast(isLogin ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!', 'success');
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-primary-600 rounded-xl text-white mb-4">
            <IconCode className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">CodeMentor</h1>
          <p className="text-slate-400 mt-2">Domine sua arte com os melhores.</p>
        </div>

        <div className="flex bg-slate-800 p-1 rounded-lg mb-6">
          <button 
            onClick={() => { setIsLogin(true); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${isLogin ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Entrar
          </button>
          <button 
            onClick={() => { setIsLogin(false); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${!isLogin ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Criar Conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
             <div className="grid grid-cols-2 gap-4 mb-4">
                <div 
                    onClick={() => setSelectedRole(UserRole.MENTEE)}
                    className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${selectedRole === UserRole.MENTEE ? 'border-primary-500 bg-primary-500/10' : 'border-slate-700 bg-slate-800 hover:border-slate-600'}`}
                >
                    <IconUser className="w-6 h-6 text-slate-300" />
                    <span className="text-sm font-bold text-white">Mentorado</span>
                </div>
                 <div 
                    onClick={() => setSelectedRole(UserRole.MENTOR)}
                    className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${selectedRole === UserRole.MENTOR ? 'border-primary-500 bg-primary-500/10' : 'border-slate-700 bg-slate-800 hover:border-slate-600'}`}
                >
                    <IconZap className="w-6 h-6 text-slate-300" />
                    <span className="text-sm font-bold text-white">Mentor</span>
                </div>
             </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@exemplo.com" 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Senha</label>
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500" 
            />
            {!isLogin && (
                <p className="text-[10px] text-slate-500 mt-1">
                    Deve conter 8+ caracteres, números, letras e símbolos.
                </p>
            )}
          </div>

          <button type="submit" className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-primary-500/20">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">Acesso Direto (Demo):</p>
            <div className="flex justify-center gap-2 mt-2">
                 <button onClick={() => onLogin(UserRole.MENTEE)} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">Aluno</button>
                 <button onClick={() => onLogin(UserRole.MENTOR)} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">Mentor</button>
                 <button onClick={() => onLogin(UserRole.ADMIN)} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">Admin</button>
            </div>
        </div>
      </div>
    </div>
  );
};