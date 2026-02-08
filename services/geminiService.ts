import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDailyBugleNews = async (): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = "Generate 3 short, sensationalist news headlines and snippets written in the style of J. Jonah Jameson for the Daily Bugle. Focus on Spider-Man causing 'trouble' or fighting a villain. Return only JSON in the format: [{ headline: string, snippet: string, date: string }].";
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return response.text || "[]";
  } catch (error) {
    console.error("Error generating news:", error);
    return "[]";
  }
};

export const chatWithSpideyLore = async (userQuestion: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = "You are an AI assistant on a Spider-Man fan website. You know everything about the Spider-Verse (Comics, Movies, Games). Answer the user's question with enthusiasm. Keep it relatively brief.";
    
    const response = await ai.models.generateContent({
      model: model,
      contents: userQuestion,
      config: {
        systemInstruction: systemInstruction
      }
    });

    return response.text || "My spider-sense is tingling, but I can't find an answer right now!";
  } catch (error) {
    console.error("Error chatting:", error);
    return "Something went wrong with the web connection!";
  }
};