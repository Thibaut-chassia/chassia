export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://chassia.be');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic rate limiting check (Vercel handles most of this)
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { model, messages, system, max_tokens } = req.body;

    // Whitelist allowed models only
    const allowedModels = ['claude-sonnet-4-20250514', 'claude-opus-4-20250514'];
    if (!allowedModels.includes(model)) {
      return res.status(400).json({ error: 'Model not allowed' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens: max_tokens || 1000,
        system,
        messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('API route error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
