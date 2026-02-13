
const { generateErrorSolution } = require('../lib/ai/gemini');

// Polyfill fetch for Node environment if needed, though lib/ai/gemini uses GoogleGenerativeAI client directly.
// However, if the library uses fetch internally (it does), Node 18+ has it.
// We need to support ES modules or transpile. 
// Simpler: Just make a small standalone script that mimics the lib logic for testing, 
// OR run the next.js app and hit the endpoint.
// Let's hit the endpoint to test the full flow.

async function testEndpoint() {
    console.log("Testing POST /api/ai/fix-error...");
    try {
        const res = await fetch('http://localhost:3000/api/ai/fix-error', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: "ReferenceError: document is not defined" })
        });

        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Test Failed:", e.message);
    }
}

testEndpoint();
