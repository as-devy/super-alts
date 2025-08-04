export default async function handler(req, res) {

  try {
    const apiRes = await fetch(`https://api.superalts.dev/api/ratings`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 6jSbj0smt71lLVMS3dW1R840gnXG1E'
      }
    });

    const text = await apiRes.text();
    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: 'API failed', details: text });
    }

    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}
