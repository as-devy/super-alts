export default async function handler(req, res) {
  const { code } = req.query;

  const apiRes = await fetch(`https://api.superalts.dev/api/coupons/${code}`, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 6jSbj0smt71lLVMS3dW1R840gnXG1E'
    },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined, // only send body if not GET
  });

  const data = await apiRes.json();
  res.status(apiRes.status).json(data);
}