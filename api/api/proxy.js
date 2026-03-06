export default async function handler(req, res) {
  const path = req.query.path;
  const apiKey = req.query.apiKey;
  if (!path || !apiKey) return res.status(400).json({ error: "Missing params" });
  const credentials = Buffer.from(apiKey + ":").toString("base64");
  const response = await fetch(`https://api.company-information.service.gov.uk${path}`, {
    headers: { Authorization: `Basic ${credentials}` }
  });
  const data = await response.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(response.status).json(data);
}
