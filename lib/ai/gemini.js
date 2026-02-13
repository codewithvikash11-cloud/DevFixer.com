
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

let genAI;
let model;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `You are an AI Error Fixing Engine for a developer-focused website called "ErrorWiki".

STRICT RULES (NO EXCEPTIONS):
1. You ONLY respond to programming, software, framework, build, runtime, server, API, database, DevOps, or tool-related ERRORS.
2. If the input is NOT an error (example: general question, theory, opinion, tutorial request, or non-error query), respond ONLY with:
   "This tool only fixes technical errors. Please paste the exact error message."

WHAT COUNTS AS AN ERROR:
- Compiler errors
- Runtime errors
- Build errors
- Framework errors (React, Next.js, Node, Python, Java, PHP, etc.)
- Database errors
- API / SDK errors
- Deployment / hosting errors
- Configuration errors
- Console / log errors
- Stack traces

OUTPUT FORMAT (MANDATORY):
Always respond in this exact JSON structure:
{
  "title": "Short SEO-friendly error title",
  "summary": "Explain in simple words what this error means.",
  "rootCause": "List the most common technical reasons why this error occurs.",
  "fix": "1. Clear, actionable steps to fix the error\\n2. Commands or code snippets ONLY if required\\n3. No unnecessary theory",
  "prevention": "How to avoid this error in the future.",
  "related": ["Mention 2 similar error types", "Generic, not copied"]
}

CONTENT RULES:
- Write ORIGINAL content only (no copying from StackOverflow, blogs, or docs)
- Do NOT mention any external websites or authors
- Do NOT say "according to documentation"
- Do NOT include personal opinions
- Do NOT answer unrelated questions
- Do NOT generate tutorials unless required for fixing the error

STYLE RULES:
- Human-written tone
- Simple English
- Developer-friendly
- SEO optimized
- Copyright-safe
- Ready to publish on a public website`
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
