import React, { useState } from 'react';
import { IconCalendar } from '../components/Icons';
import { useToast } from '../context/ToastContext';

export const Availability: React.FC = () => {
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set(['Seg-09:00', 'Qua-14:00']));
  const { addToast } = useToast();

  const toggleSlot = (day: string, time: string) => {
    const key = `${day}-${time}`;
    const newSlots = new Set(selectedSlots);
    if (newSlots.has(key)) {
        newSlots.delete(key);
    } else {
        newSlots.add(key);
    }
    setSelectedSlots(newSlots);
  };

  const handleSave = () => {
      addToast('Disponibilidade atualizada com sucesso!', 'success');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
             <h1 className="text-3xl font-bold text-white">Gerenciar Disponibilidade</h1>
             <p className="text-slate-400 mt-2">Clique nos horários para habilitar/desabilitar para agendamentos.</p>
        </div>
        <button 
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
            Salvar Alterações
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-6">
        <div className="grid grid-cols-8 gap-4">
            <div className="col-span-1"></div>
            {days.map(day => (
                <div key={day} className="text-center font-bold text-slate-300 pb-4">
                    {day}
                </div>
            ))}

            {times.map(time => (
                <React.Fragment key={time}>
                    <div className="text-right pr-4 text-slate-500 text-sm font-mono pt-3">
                        {time}
                    </div>
                    {days.map(day => {
                        const isSelected = selectedSlots.has(`${day}-${time}`);
                        return (
                            <button
                                key={`${day}-${time}`}
                                onClick={() => toggleSlot(day, time)}
                                className={`
                                    h-12 rounded-lg border transition-all duration-200
                                    ${isSelected 
                                        ? 'bg-primary-600 border-primary-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                                        : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                                    }
                                `}
                            >
                                {isSelected && <span className="text-xs text-white font-medium">Livre</span>}
                            </button>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};