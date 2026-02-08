import { GoogleGenAI } from "@google/genai";

// Helper to initialize client lazily and safely
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") return null;
  return new GoogleGenAI({ apiKey });
};

export const generateDailyBugleNews = async (): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // Fallback if no API key is present (prevents crash)
    if (!ai) {
      console.warn("API Key missing, returning mock news data.");
      return JSON.stringify([
        { 
          headline: "Spider-Man: Menace or Masked Menace?", 
          snippet: "J. Jonah Jameson asks the tough questions about the web-crawler's latest 'heroics' that destroyed a hot dog stand.", 
          date: "Today" 
        },
        { 
          headline: "Vulture Sightings Reported in Queens", 
          snippet: "Local residents claim to have seen a winged figure circling the skies. Is it a bird? A plane? No, it's trouble!", 
          date: "Yesterday" 
        },
        { 
          headline: "Oscorp Stock Plummets After Lab Accident", 
          snippet: "Mysterious green smoke seen billowing from Oscorp Tower. Norman Osborn unavailable for comment.", 
          date: "2 Days Ago" 
        }
      ]);
    }

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
    const ai = getAiClient();
    
    if (!ai) {
      return "My spider-sense isn't tingling... (API Key is missing from configuration)";
    }

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