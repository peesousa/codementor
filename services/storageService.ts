import { User, Session, SessionRequest, Problem } from '../types';
import { MOCK_USER, UPCOMING_SESSIONS, PAST_SESSIONS, MOCK_REQUESTS } from '../constants';

const STORAGE_KEYS = {
  USER: 'codementor_user',
  SESSIONS: 'codementor_sessions',
  REQUESTS: 'codementor_requests',
  SOLUTIONS: 'codementor_solutions'
};

interface StoredData {
  user: User | null;
  sessions: Session[];
  requests: SessionRequest[];
}

export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.SESSIONS)) {
    const allSessions = [...UPCOMING_SESSIONS, ...PAST_SESSIONS];
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(allSessions));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(MOCK_REQUESTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
     // Não salvamos o usuário mockado imediatamente para permitir o fluxo de login/onboarding
     // mas se precisar: localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(MOCK_USER));
  }
};

export const getStoredData = (): StoredData => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  const sessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  const requests = localStorage.getItem(STORAGE_KEYS.REQUESTS);

  return {
    user: user ? JSON.parse(user) : null,
    sessions: sessions ? JSON.parse(sessions) : [],
    requests: requests ? JSON.parse(requests) : []
  };
};

export const saveStoredData = (data: Partial<StoredData>) => {
  if (data.user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
  }
  if (data.sessions) {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(data.sessions));
  }
  if (data.requests) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(data.requests));
  }
};

export const clearStorage = () => {
  localStorage.clear();
  window.location.reload();
};