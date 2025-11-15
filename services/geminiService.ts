
import { GoogleGenAI, Type } from "@google/genai";
import { FundAnalysis } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateFundAnalysis = async (fundName: string): Promise<FundAnalysis | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide a balanced analysis of the pros and cons for an investor considering the '${fundName}' mutual fund. Base your analysis on general knowledge of investment strategies.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pros: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of potential advantages or strengths of the fund.",
            },
            cons: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of potential disadvantages or risks associated with the fund.",
            },
          },
          required: ["pros", "cons"],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating fund analysis:", error);
    return {
      pros: ["AI analysis could not be generated at this time."],
      cons: ["Please try again later or check your API key configuration."],
    };
  }
};

export const generateEducationalContent = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a financial advisor explaining concepts clearly and concisely to a new investor. Use simple language and avoid jargon where possible.",
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating educational content:", error);
        return "Could not load educational content. Please check your connection or API key and try again.";
    }
};
