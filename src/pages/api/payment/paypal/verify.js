// src/pages/api/paypal/verify.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { orderID } = req.body;

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;

  const basicAuth = Buffer.from(`${clientId}:${secret}`).toString('base64');
  const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const orderRes = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const orderData = await orderRes.json();

  if (orderData.status === 'COMPLETED') {
    return res.status(200).json({ success: true, order: orderData });
  } else {
    return res.status(400).json({ success: false, order: orderData });
  }
}
