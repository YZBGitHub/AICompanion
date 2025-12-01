import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateStudentFeedback = async (studentName: string, strengths: string[], weaknesses: string[], language: 'zh' | 'en' = 'zh') => {
  if (!ai) {
    return language === 'zh' 
      ? "AI服务不可用。请配置API Key以接收个性化反馈。" 
      : "AI service is unavailable. Please configure the API Key to receive personalized feedback.";
  }

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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'zh' ? "暂时无法生成AI反馈。" : "Failed to generate AI feedback at this time.";
  }
};

export const autoGradeSubmission = async (code: string, assignmentType: string, language: 'zh' | 'en' = 'zh') => {
  if (!ai) {
    return {
      score: 85,
      feedback: language === 'zh' 
        ? "AI服务不可用。这是模拟评分。请配置API Key以获取真实评分。"
        : "AI service unavailable. This is a mock score. Please configure API Key for real grading."
    };
  }

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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Grading Error:", error);
    return {
      score: 0,
      feedback: language === 'zh' ? "AI评分过程中出错。" : "Error during AI grading."
    };
  }
};