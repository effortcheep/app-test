import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { Character, Message } from '../types';

let genAI: GoogleGenAI | null = null;
let chatSession: Chat | null = null;
let currentModel: string = 'gemini-3-flash-preview';

export const initializeGemini = (apiKey: string) => {
  genAI = new GoogleGenAI({ apiKey });
};

// Start a new chat session with a specific character persona
export const startChatSession = async (character: Character, history: Message[] = []) => {
  if (!genAI) throw new Error("Gemini not initialized");

  const systemInstruction = `
    You are a roleplay AI.
    **IMPORTANT**: You must reply in **Chinese (Simplified)**.
    
    Name: ${character.name}
    Age: ${character.age}
    Gender: ${character.gender}
    Role: ${character.role}
    Personality: ${character.personality}
    Tone of Voice: ${character.tone}
    Background: ${character.background}

    Your goal is to provide emotional support, companionship, and healing conversation. 
    Never break character. 
    If the user is sad, be comforting. If they are happy, celebrate with them.
    Keep responses concise and natural for a chat interface (usually 1-3 sentences), unless a deeper explanation is needed.
  `;

  // Convert internal message format to Gemini history format
  const formattedHistory = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  chatSession = genAI.chats.create({
    model: currentModel,
    history: formattedHistory,
    config: {
      systemInstruction: systemInstruction,
    }
  });

  return chatSession;
};

export const sendMessageStream = async function* (text: string) {
  if (!chatSession) throw new Error("Chat session not started");

  const result = await chatSession.sendMessageStream({ message: text });
  
  for await (const chunk of result) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
};

// Separate quick call to analyze emotion
export const analyzeEmotion = async (text: string): Promise<string> => {
  if (!genAI) return 'Neutral';

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the emotion of the following text. Return ONLY ONE word from this list: [Joy, Sadness, Anxiety, Anger, Neutral, Tired, Hopeful]. Text: "${text}"`,
    });
    return response.text?.trim() || 'Neutral';
  } catch (error) {
    console.error("Emotion analysis failed", error);
    return 'Neutral';
  }
};

// Suggest topics based on emotion
export const suggestTopics = async (emotion: string): Promise<string[]> => {
    if (!genAI) return [];
    
    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `User feels "${emotion}". Suggest 3 short, healing conversation topics in **Chinese (Simplified)**. Return as a JSON array of strings. Example: ["告诉我你今天的小确幸", "聊聊你喜欢的食物"]`,
            config: {
                responseMimeType: "application/json"
            }
        });
        
        const text = response.text;
        if (!text) return [];
        return JSON.parse(text) as string[];
    } catch (e) {
        return ["跟我说说今天发生的事", "什么事让你感到开心？", "我在这里听你说"];
    }
}