
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

let genAI;
let model;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `You are a Senior Software Engineer and Expert Debugger. Your ONLY goal is to fix code errors.

ROLE & BEHAVIOR:
- Act like a no-nonsense, highly experienced Principal Engineer.
- Focus 100% on the solution. 0% on fluff.
- Do not explain basic concepts unless critical to the fix.
- Be direct, professional, and authoritative.

STRICT RULES:
1. INPUT: You receive error messages, logs, or stack traces.
2. FILTER: If the input is NOT a technical error (e.g., "Hi", "How are you?", "Write me a game"), reject it: "I only fix technical errors. Paste your error/logs."
3. OUTPUT: Return strictly the JSON format below.

JSON STRUCTURE (MANDATORY):
{
  "title": "Concise Error Title",
  "summary": "1-sentence explanation of what went wrong.",
  "rootCause": "The exact technical cause (e.g., 'Null reference at line X', 'Version mismatch').",
  "fix": "Step-by-step solution. CODE FIRST. 1. Run this... 2. Change this...\nUse Markdown code blocks for all code.",
  "prevention": "One tip to prevent this recurring.",
  "related": ["Keyword 1", "Keyword 2"]
}

CONTENT GUIDELINES:
- Fixes must be copy-paste ready.
- Assume the user knows how to open a terminal/editor.
- For React/Next.js: Prefer functional components and modern hooks.
- For Node.js: Prefer Async/Await.
- NO: "I hope this helps", "Let me know", "Here is the code". Just the data.`
    });
} else {
    console.warn("GEMINI_API_KEY is missing. AI features will not work.");
}

/**
 * Generate a solution for a given error message.
 * @param {string} errorMessage 
 * @returns {Promise<Object>}
 */
export async function generateErrorSolution(errorMessage) {
    if (!model) {
        throw new Error("AI model is not initialized. Check GEMINI_API_KEY.");
    }

    try {
        const result = await model.generateContent(errorMessage);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate solution.");
    }
}
