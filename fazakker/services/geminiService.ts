import { GoogleGenAI } from "@google/genai";
import { Hadith } from "../types";

// Initialize Gemini Client
// We use a safe check for process to prevent browser crashes if the shim is missing.
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) 
  ? process.env.API_KEY 
  : '';

const ai = new GoogleGenAI({ apiKey });

export const generateSocialCaption = async (hadith: Hadith, platform: string): Promise<string> => {
  try {
    const prompt = `
      You are a social media manager for an Islamic content page. 
      Generate a short, engaging, and respectful caption for ${platform} based on the following Hadith.
      
      Hadith Source: ${hadith.source}
      Hadith Text: "${hadith.translation}"
      
      Requirements:
      - Include relevant hashtags.
      - Keep the tone spiritual and reflective.
      - For Instagram, include line breaks.
      - Do not include the Hadith text itself in the caption, just the reflection/hook, as the text is in the image.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Low latency preferred for UI interactions
      }
    });

    return response.text || "Could not generate caption.";
  } catch (error) {
    console.error("Error generating caption:", error);
    return "Error generating caption. Please write one manually.";
  }
};

export const suggestScheduleTime = async (): Promise<string> => {
  try {
    const prompt = "Suggest the best time of day (in HH:MM format, 24h) to post religious content on social media for maximum engagement globally.";
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "18:00";
  } catch (error) {
    return "18:00";
  }
}