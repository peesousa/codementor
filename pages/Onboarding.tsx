import React, { useState } from 'react';
import { validateName, validateLimits, VALIDATION_RULES } from '../utils/validation';
import { IconCheckCircle } from '../components/Icons';
import { useToast } from '../context/ToastContext';

interface OnboardingProps {
  onComplete: (data: any) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    photoUrl: '',
    languages: [] as string[],
    level: 'Iniciante',
    interests: ''
  });
  
  const { addToast } = useToast();

  const allowedLanguages = ['C#', 'Python', 'JavaScript'];
  const levels = ['Iniciante', 'Intermediário', 'Avançado'];

  const handleNext = () => {
    
    // Step 1 Validation
    if (step === 1) {
        const nameCheck = validateName(formData.name);
        if (!nameCheck.isValid) {
            addToast(nameCheck.error || 'Nome inválido', 'error');
            return;
        }
        if (!formData.name) {
            addToast('Nome é obrigatório', 'error');
            return;
        }
        setStep(2);
    }
    // Step 2 Validation
    else if (step === 2) {
        if (formData.languages.length === 0) {
            addToast('Selecione pelo menos uma linguagem.', 'error');
            return;
        }
        setStep(3);
    }
    // Step 3 Validation
    else if (step === 3) {
        if (!validateLimits(formData.interests, VALIDATION_RULES.INTERESTS_MAX_LENGTH)) {
            addToast(`Interesses devem ter menos de ${VALIDATION_RULES.INTERESTS_MAX_LENGTH} caracteres.`, 'error');
            return;
        }
        onComplete(formData);
    }
  };

  const toggleLang = (lang: string) => {
    const prev = formData.languages;
    if (prev.includes(lang)) {
        setFormData({ ...formData, languages: prev.filter(l => l !== lang) });
    } else {
        setFormData({ ...formData, languages: [...prev, lang] });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-primary-500' : 'bg-slate-800'}`} />
            ))}
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Construa seu Perfil</h1>
        <p className="text-slate-400 mb-6">Vamos verificar suas credenciais de desenvolvedor.</p>

        {step === 1 && (
            <div className="space-y-4 animate-fade-in">
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Nome Completo</label>
                    <input 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                        placeholder="ex: Alex Desenvolvedor"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Sem números no início. Máx 100 caracteres.</p>
                </div>
                <div>
                     <label className="block text-xs font-medium text-slate-400 mb-1">URL da Foto (Opcional)</label>
                    <input 
                        value={formData.photoUrl}
                        onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                        placeholder="https://..."
                    />
                </div>
            </div>
        )}

        {step === 2 && (
             <div className="space-y-6 animate-fade-in">
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-3">Linguagens Principais</label>
                    <div className="grid grid-cols-3 gap-3">
                        {allowedLanguages.map(lang => (
                            <button
                                key={lang}
                                onClick={() => toggleLang(lang)}
                                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${formData.languages.includes(lang) ? 'bg-primary-600/20 border-primary-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-3">Nível de Experiência</label>
                     <div className="grid grid-cols-1 gap-2">
                        {levels.map(lvl => (
                            <button
                                key={lvl}
                                onClick={() => setFormData({ ...formData, level: lvl })}
                                className={`p-3 rounded-lg border text-left text-sm transition-colors flex justify-between items-center ${formData.level === lvl ? 'bg-primary-600/20 border-primary-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                            >
                                {lvl}
                                {formData.level === lvl && <IconCheckCircle className="w-4 h-4 text-primary-500" />}
                            </button>
                        ))}
                    </div>
                </div>
             </div>
        )}

        {step === 3 && (
            <div className="space-y-4 animate-fade-in">
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Interesses & Objetivos</label>
                    <textarea 
                        value={formData.interests}
                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 resize-none"
                        placeholder="Descreva seus interesses técnicos..."
                    />
                    <p className="text-right text-[10px] text-slate-500">
                        {formData.interests.length}/{VALIDATION_RULES.INTERESTS_MAX_LENGTH}
                    </p>
                </div>
            </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
            <button 
                onClick={handleNext}
                className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
                {step === 3 ? 'Concluir Perfil' : 'Continuar'}
            </button>
        </div>
      </div>
    </div>
  );
};