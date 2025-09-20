export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, currency_code, message } = req.body;
  const accessToken = process.env.ZIINA_ACCESS_TOKEN;
  
  const redirectUrl = process.env.ZIINA_REDIRECT_URL;

  const ziinaRes = await fetch('https://api-v2.ziina.com/api/payment_intent', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: amount,
      currency_code: currency_code || 'AED',
      message: message || 'Order payment',
      ...(redirectUrl && { redirect_url: redirectUrl })
    })
  });

  const data = await ziinaRes.json();
  if (ziinaRes.ok) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ error: data });
  }
} 