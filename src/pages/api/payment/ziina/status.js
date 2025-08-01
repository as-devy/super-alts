export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing payment intent ID' });
  }

  try {
    const ziinaRes = await fetch(`https://api-v2.ziina.com/api/payment_intent/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.ZIINA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await ziinaRes.json();

    if (!ziinaRes.ok) {
      return res.status(ziinaRes.status).json({ error: data });
    }

    return res.status(200).json({
      status: data.status, // e.g. 'paid', 'pending', 'failed'
      payment_intent_id: data.id,
    });
  } catch (err) {
    console.error('Error verifying Ziina payment status:', err);
    return res.status(500).json({ error: 'Failed to verify payment status' });
  }
}
