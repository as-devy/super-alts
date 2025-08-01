export default async function handler(req, res) {
  const apiRes = await fetch('https://api.superalts.dev/api/queue/reset-ip', {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 6jSbj0smt71lLVMS3dW1R840gnXG1E'
    },
    body: JSON.stringify(req.body),
  });

  const data = await apiRes.json();
  res.status(apiRes.status).json(data);
}