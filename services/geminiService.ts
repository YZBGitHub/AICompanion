
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates personalized learning feedback for a student based on their strengths and weaknesses.
 */
export const generateStudentFeedback = async (studentName: string, strengths: string[], weaknesses: string[], language: 'zh' | 'en' = 'zh') => {
  try {
    const langPrompt = language === 'zh' ? "Please respond in Chinese (Simplified)." : "Please respond in English.";
    const prompt = `
      Act as an educational AI mentor.
      ${langPrompt}
      Student Name: ${studentName}
      Strengths: ${strengths.join(', ')}
      Weaknesses: ${weaknesses.join(', ')}
      
      Provide a concise, encouraging, and actionable learning summary for this student (max 100 words).
      Also suggest 2 specific career roles they might be suited for.
    `;

    // Use gemini-3-flash-preview for general text generation tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Directly access the text property from the response
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'zh' ? "暂时无法生成AI反馈。" : "Failed to generate AI feedback at this time.";
  }
};

/**
 * Automatically grades an assignment submission and provides structured feedback.
 */
export const autoGradeSubmission = async (code: string, assignmentType: string, language: 'zh' | 'en' = 'zh') => {
  try {
    const langPrompt = language === 'zh' ? "Please respond in Chinese (Simplified)." : "Please respond in English.";
    const prompt = `
      Act as a strict but fair teaching assistant.
      ${langPrompt}
      Assignment Type: ${assignmentType}
      Submission Content:
      ${code}

      Task:
      1. Give a score out of 100.
      2. Provide 3 bullet points of constructive feedback.
      3. Return ONLY a JSON object in this format: { "score": number, "feedback": "string" }
    `;

    // Use gemini-3-flash-preview for automated grading tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    // response.text directly returns the extracted string output
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Grading Error:", error);
    return {
      score: 0,
      feedback: language === 'zh' ? "AI评分过程中出错。" : "Error during AI grading."
    };
  }
};
