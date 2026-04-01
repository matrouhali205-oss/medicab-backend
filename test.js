const fetch = require('node-fetch'); // wait Node 18+ has global fetch

async function testOllama() {
  try {
    const prompt = `You are a strict, highly accurate clinical AI assistant processing dictated voice notes. Analyze this transcript and return ONLY raw JSON. Do not include markdown formatting or conversational text.
Ensure the JSON has exactly these 4 keys:
"symptoms": (array of strings, concisely listing reported symptoms),
"painLevel": (string, concisely summarizing reported pain, e.g. "None", "3/10 (Mild)", "Severe"),
"duration": (string, concisely summarizing when it started, e.g. "3 days", "Unknown"),
"context": (string, a brief professional 1 sentence summary report of the clinical context)

Transcript to analyze: "test transcript"`;

    console.log("Fetching tags...");
    const tagsRes = await fetch('http://127.0.0.1:11434/api/tags');
    const tagsData = await tagsRes.json();
    console.log("Models:", tagsData.models.map(m => m.name));
    const model = tagsData.models[0].name;

    console.log("Generating with model:", model);
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        format: 'json'
      })
    });
    
    if (!response.ok) {
        console.error("Status:", response.status, response.statusText);
        console.error(await response.text());
        return;
    }
    const data = await response.json();
    console.log("Result:", data.response);
  } catch (err) {
    console.error("CRASH:", err);
  }
}
testOllama();
