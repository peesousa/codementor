import { Mentor, Session, User, UserRole, Problem, SessionRequest } from "./types";

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Dev',
  email: 'alex.dev@exemplo.com',
  avatar: 'https://picsum.photos/id/64/200/200',
  role: UserRole.MENTEE,
  level: 'Iniciante',
  xp: 4500,
  streak: 5,
  languages: ['JavaScript', 'TypeScript'],
  interests: 'Desenvolvimento Frontend'
};

export const MOCK_MENTOR_USER: Mentor = {
  id: 'm_curr',
  name: 'Sarah Engenheira',
  email: 'sarah.engineer@exemplo.com',
  avatar: 'https://picsum.photos/id/65/200/200',
  role: UserRole.MENTOR,
  title: 'Engenheira Sênior',
  company: 'Google',
  skills: ['React', 'System Design'],
  hourlyRate: 150,
  rating: 4.9,
  reviews: 124,
  isOnline: true,
  level: 'Avançado',
  xp: 99999,
  streak: 100,
  languages: ['Inglês', 'Espanhol'],
  interests: 'Arquitetura de Sistemas'
};

export const MOCK_ADMIN_USER: User = {
  id: 'admin1',
  name: 'Admin do Sistema',
  email: 'admin@codementor.com',
  avatar: 'https://picsum.photos/id/2/200/200',
  role: UserRole.ADMIN,
  level: 'Avançado',
  xp: 0,
  streak: 0,
  languages: [],
  interests: 'Gerenciamento da Plataforma'
};

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Sarah Engenheira',
    email: 'sarah.engineer@exemplo.com',
    avatar: 'https://picsum.photos/id/65/200/200',
    role: UserRole.MENTOR,
    title: 'Engenheira Sênior',
    company: 'Google',
    skills: ['React', 'System Design', 'Go', 'Kubernetes'],
    hourlyRate: 150,
    rating: 4.9,
    reviews: 124,
    isOnline: true,
    level: 'Avançado',
    xp: 99999,
    streak: 100,
    languages: ['Inglês', 'Espanhol'],
    interests: 'Sistemas Distribuídos'
  },
  {
    id: 'm2',
    name: 'David Chen',
    email: 'david.chen@exemplo.com',
    avatar: 'https://picsum.photos/id/91/200/200',
    role: UserRole.MENTOR,
    title: 'Líder Técnico',
    company: 'Netflix',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
    hourlyRate: 180,
    rating: 5.0,
    reviews: 89,
    isOnline: false,
    level: 'Avançado',
    xp: 80000,
    streak: 40,
    languages: ['Inglês', 'Mandarim'],
    interests: 'Microsserviços'
  },
  {
    id: 'm3',
    name: 'Elena Silva',
    email: 'elena.silva@exemplo.com',
    avatar: 'https://picsum.photos/id/129/200/200',
    role: UserRole.MENTOR,
    title: 'Arquiteta Frontend',
    company: 'Vercel',
    skills: ['Next.js', 'TypeScript', 'Tailwind', 'Performance'],
    hourlyRate: 200,
    rating: 4.8,
    reviews: 210,
    isOnline: true,
    level: 'Avançado',
    xp: 85000,
    streak: 12,
    languages: ['Inglês', 'Português'],
    interests: 'Performance Web'
  }
];

export const UPCOMING_SESSIONS: Session[] = [
  {
    id: 's1',
    mentorId: 'm1',
    mentorName: 'Sarah Engenheira',
    topic: 'System Design: App de Chat Escalável',
    date: 'Hoje, 16:00',
    status: 'UPCOMING'
  },
  {
    id: 's2',
    mentorId: 'm3',
    mentorName: 'Elena Silva',
    topic: 'Padrões Avançados de React',
    date: 'Amanhã, 10:00',
    status: 'UPCOMING'
  }
];

export const PAST_SESSIONS: Session[] = [
  {
    id: 's3',
    mentorId: 'm2',
    mentorName: 'David Chen',
    topic: 'Fundamentos de Microsserviços',
    date: 'Semana Passada',
    status: 'COMPLETED',
    rating: 5,
    earnings: 150
  },
  {
    id: 's4',
    mentorId: 'm1',
    mentorName: 'Sarah Engenheira',
    topic: 'Concorrência em Go',
    date: '2 Semanas Atrás',
    status: 'COMPLETED',
    rating: 4,
    earnings: 150
  }
];

export const MOCK_PROBLEMS: Problem[] = [
  {
    id: 'p1',
    title: 'Soma de Dois (Two Sum)',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    acceptanceRate: 48.5,
    description: 'Dado um array de inteiros "nums" e um inteiro "target", retorne os índices dos dois números de modo que a soma deles seja igual ao "target".',
    starterCode: `function twoSum(nums, target) {
  // Seu código aqui
}`
  },
  {
    id: 'p2',
    title: 'Cache LRU',
    difficulty: 'Medium',
    tags: ['Hash Table', 'Linked List', 'Design'],
    acceptanceRate: 40.2,
    description: 'Projete uma estrutura de dados que siga as restrições de um cache LRU (Least Recently Used).',
    starterCode: `class LRUCache {
  constructor(capacity) {
    // Inicialização
  }
  
  get(key) {
    // Implementação
  }
  
  put(key, value) {
    // Implementação
  }
}`
  },
  {
    id: 'p3',
    title: 'Água da Chuva (Trapping Rain Water)',
    difficulty: 'Hard',
    tags: ['Array', 'Two Pointers', 'Dynamic Programming'],
    acceptanceRate: 55.1,
    description: 'Dados n inteiros não negativos representando um mapa de elevação onde a largura de cada barra é 1, calcule quanta água ele pode reter após chover.',
    starterCode: `function trap(height) {
  // Sua solução
}`
  }
];

export const MOCK_REQUESTS: SessionRequest[] = [
  {
    id: 'r1',
    requesterName: 'João Júnior',
    requesterAvatar: 'https://picsum.photos/id/55/100/100',
    topic: 'Ajuda com React Hooks',
    proposedDate: 'Seg, 14 Ago - 10:00',
    status: 'PENDING',
    message: 'Estou com dificuldades em loops no useEffect.'
  },
  {
    id: 'r2',
    requesterName: 'Alice Silva',
    requesterAvatar: 'https://picsum.photos/id/66/100/100',
    topic: 'Simulação de Entrevista: Frontend',
    proposedDate: 'Ter, 15 Ago - 14:00',
    status: 'ACCEPTED',
    message: 'Me preparando para entrevista na Meta.'
  },
  {
    id: 'r3',
    requesterName: 'Beto Coder',
    requesterAvatar: 'https://picsum.photos/id/77/100/100',
    topic: 'Code Review: API Node',
    proposedDate: 'Qua, 16 Ago - 16:00',
    status: 'REJECTED',
    message: 'Preciso de ajuda urgente.'
  }
];

export const INITIAL_CODE = `// Bem-vindo à Sala de Código
// Escreva sua solução aqui. 
// Clique em 'Executar Código' para simular a execução via IA.

function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
`;