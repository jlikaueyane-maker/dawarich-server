module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.url === "/") {
    res.status(200).json({
      message: "Bienvenue sur l'API de base pour Dawarich !",
      status: "ok",
    });
  } else if (req.url.startsWith("/prayer-times")) {
    // Exemple statique (horaires fictifs)
    res.status(200).json({
      Fajr: "05:30",
      Dhuhr: "13:15",
      Asr: "17:45",
      Maghrib: "20:30",
      Isha: "22:00",
    });
  } else {
    res.status(404).json({ error: "Endpoint non trouvé" });
  }
};
