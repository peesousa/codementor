
export const VALIDATION_RULES = {
  NAME_MAX_LENGTH: 100,
  INTERESTS_MAX_LENGTH: 500,
  REQUEST_MSG_MAX_LENGTH: 500,
  CHAT_MSG_MAX_LENGTH: 1000,
  CODE_MAX_LENGTH: 10000,
  FEEDBACK_COMMENT_MAX_LENGTH: 1000,
  PROBLEM_TITLE_MAX: 200,
  PROBLEM_DESC_MAX: 5000,
  POINTS_MAX: 1000000,
};

export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (name.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    return { isValid: false, error: `Nome deve ter menos de ${VALIDATION_RULES.NAME_MAX_LENGTH} caracteres.` };
  }
  // RS01: Não pode iniciar com números ou caracteres especiais
  if (/^[\d\W]/.test(name)) {
    return { isValid: false, error: "Nome não pode começar com número ou símbolo." };
  }
  return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  // RS08: Mínimo 8 caracteres, letras, números e símbolos
  if (password.length < 8) {
    return { isValid: false, error: "Senha deve ter no mínimo 8 caracteres." };
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasLetter || !hasNumber || !hasSymbol) {
    return { isValid: false, error: "Senha deve conter letras, números e símbolos." };
  }
  return { isValid: true };
};

export const validateEmail = (email: string): boolean => {
  // Regex simples para validação
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateLimits = (text: string, limit: number): boolean => {
  return text.length <= limit;
};