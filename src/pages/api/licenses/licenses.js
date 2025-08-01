// pages/api/proxy/licenses.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);


  if (!session || !session.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const apiRes = await fetch(`https://api.superalts.dev/api/user/${session.user.id}/licenses`, {
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
