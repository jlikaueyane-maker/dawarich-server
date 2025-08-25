// api/location.js
let logs = []; // stockage temporaire en mémoire

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const buffers = [];
      for await (const chunk of req) buffers.push(chunk);
      const body = JSON.parse(Buffer.concat(buffers).toString());

      logs.push({ ...body, timestamp: new Date() });

      res.status(200).json({ message: "Location saved ✅", entry: body });
    } catch (e) {
      res.status(400).json({ error: "Invalid JSON" });
    }
  } else if (req.method === "GET") {
    res.status(200).json({ logs });
  } else {
    res.status(405).json({ error: "Méthode non supportée" });
  }
};
