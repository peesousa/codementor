import { GoogleGenAI, Type } from "@google/genai";

// Inicializa Cliente Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkAiAvailability = () => {
  return !!process.env.API_KEY;
};

/**
 * Simula execução de código pedindo ao Gemini para prever a saída.
 * Também fornece uma explicação breve.
 */
export const executeCodeWithAi = async (code: string, language: string) => {
  // Fallback simulado se não houver chave API
  if (!process.env.API_KEY) {
      return { 
          output: "Simulação (Modo Offline):\n> " + "Código executado com sucesso (mock).", 
          explanation: "Esta é uma resposta simulada porque nenhuma chave de API foi detectada. Em produção, isso executaria o código via IA." 
      };
  }

  const prompt = `
    Você é um motor de execução de código. 
    Analise o seguinte código em ${language}.
    1. Preveja a saída do console exatamente como apareceria.
    2. Forneça uma explicação muito breve (1 frase) em Português do Brasil sobre a correção ou erros.
    
    Código:
    ${code}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            output: { type: Type.STRING },
            explanation: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Erro na Execução via IA:", error);
    return { output: "Erro ao executar código via IA.", explanation: "Serviço indisponível." };
  }
};

/**
 * Combina a busca do usuário com mentores disponíveis usando IA.
 */
export const findSmartMatches = async (query: string, mentors: any[]) => {
  if (!process.env.API_KEY) return mentors; // Fallback retorna todos

  const mentorsJson = JSON.stringify(mentors.map(m => ({
    id: m.id,
    name: m.name,
    skills: m.skills,
    title: m.title
  })));

  const prompt = `
    Busca do Usuário: "${query}"
    
    Mentores Disponíveis:
    ${mentorsJson}
    
    Tarefa:
    Retorne um array JSON de objetos com 'id', 'matchScore' (0-100) e uma 'reason' (string curta em Português do Brasil).
    Baseie a pontuação em quão bem as habilidades e título do mentor correspondem à busca.
    Seja rigoroso. Se não houver relação, dê nota baixa.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              matchScore: { type: Type.NUMBER },
              reason: { type: Type.STRING }
            }
          }
        }
      }
    });

    const matches = JSON.parse(response.text || '[]');
    
    // Merge AI results with original mentor objects
    return mentors.map(mentor => {
      const match = matches.find((m: any) => m.id === mentor.id);
      return {
        ...mentor,
        matchScore: match ? match.matchScore : 0,
        matchReason: match ? match.reason : 'Nenhuma correspondência específica encontrada.'
      };
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  } catch (error) {
    console.error("Erro no Matching via IA:", error);
    return mentors;
  }
};