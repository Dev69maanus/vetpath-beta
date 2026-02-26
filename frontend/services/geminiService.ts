
/// <reference types="vite/client" />
import { GoogleGenAI, Type } from "@google/genai";
import { TranslationResult, ResumeRefinement } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

export const translateMilitarySkills = async (mosCode: string, description: string): Promise<TranslationResult[]> => {
  const prompt = `As a veteran career coach, translate the following Military Occupational Specialty (MOS) or role into 3 relevant civilian career paths.
  MOS Code: ${mosCode}
  Experience Description: ${description}
  
  Provide a detailed analysis for each including skill gaps and suggested course topics.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              civilianRole: { type: Type.STRING },
              relevance: { type: Type.STRING },
              matchingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestedCourses: { type: Type.ARRAY, items: { type: Type.STRING } },
              skillGaps: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["civilianRole", "relevance", "matchingSkills", "suggestedCourses", "skillGaps"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const refineResumeBullet = async (bullet: string): Promise<ResumeRefinement[]> => {
  const prompt = `Translate this military resume bullet point into 3 different high-impact civilian versions suitable for corporate resumes. 
  Military Bullet: "${bullet}"
  Focus on translating jargon like 'command', 'accountability', 'NCOIC', 'deployment' into business terms like 'management', 'inventory control', 'team lead', 'global operations'.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              civilianVersion: { type: Type.STRING },
              whyItWorks: { type: Type.STRING }
            },
            required: ["civilianVersion", "whyItWorks"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getInterviewResponse = async (history: {role: string, text: string}[]) => {
  const lastUserMsg = history[history.length - 1].text;
  const prompt = `You are an expert Interview Coach for Veterans.
  Context: The user is a transitioning veteran practicing for a civilian job interview.
  Last user response: "${lastUserMsg}"
  
  Your task: 
  1. Provide a short, encouraging feedback on their response (max 2 sentences). Point out any "military-speak" they should avoid.
  2. Ask the NEXT relevant interview question.
  
  Keep the tone professional yet supportive.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "I'm having trouble connecting right now, but keep practicing!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong. Let's try another question.";
  }
};

/**
 * General AI Assistant using Gemini 3 Pro
 */
export const getGeneralAssistantResponse = async (history: {role: 'user' | 'model', text: string}[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      config: {
        systemInstruction: "You are the VetPath Command Assistant, a highly advanced AI designed to support veterans in their transition to civilian life. Your tone is professional, respectful, disciplined yet supportive. You can answer questions about the VetPath Academy LMS, career advice, benefits navigation, or general veteran support topics. Be concise and helpful.",
      }
    });
    return response.text || "I'm here to help, but I'm having trouble with the communication uplink. Please try again.";
  } catch (error) {
    console.error("General Assistant Error:", error);
    return "My systems are currently experiencing an outage. Please check back shortly, Sgt.";
  }
};
