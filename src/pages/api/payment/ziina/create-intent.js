export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, description } = req.body;
  const amountInCents = Math.round(Number(amount) * 100); // Convert to cents
  const accessToken = process.env.ZIINA_ACCESS_TOKEN;
  const currency_code = process.env.ZIINA_PREFERRED_CURRENCY || 'USD';
  
  const redirectUrl = process.env.ZIINA_REDIRECT_URL;

  const ziinaRes = await fetch('https://api-v2.ziina.com/api/payment_intent', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: amountInCents,
      currency_code,
      description,
      ...(redirectUrl && { redirect_url: redirectUrl })
    })
  });

  const data = await ziinaRes.json();
  // console.log(data)
  if (ziinaRes.ok) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ error: data });
  }
} 