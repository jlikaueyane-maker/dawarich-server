// api/index.js
module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    message: "Bienvenue sur l'API Dawarich 🚀",
    endpoints: ["/api/location (GET, POST)"],
    status: "ok",
  });
};
