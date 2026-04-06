// This is the backend (Node.js) – your API key stays secret here
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, language, context } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  // Your Ollama Cloud API key – this will be stored in Vercel's environment variables
  const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY;
  if (!OLLAMA_API_KEY) {
    return res.status(500).json({ error: 'Missing API key on server' });
  }

  const MODEL = 'llama3.2';  // you can change to 'qwen2.5' or 'mistral'

  // Build system prompt with your portfolio data
  const systemPrompt = `${context}\n\nRespond in ${language === 'hi-IN' ? 'Hindi' : (language === 'ar-AE' ? 'Gulf Arabic' : 'English')}. Keep answers concise.`;

  try {
    const response = await fetch('https://api.ollama.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OLLAMA_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Ollama API error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'Ollama API error' });
    }

    const reply = data.choices[0]?.message?.content || 'I could not generate a reply.';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Backend error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
