// Endpoint principal pour Dawarich
module.exports = async (req, res) => {
  // Activer CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Récupérer les paramètres city et country
  const url = new URL(req.url, `http://${req.headers.host}`);
  const city = url.searchParams.get("city") || "Paris";
  const country = url.searchParams.get("country") || "France";

  try {
    // Appel à l’API Aladhan
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`
    );
    const data = await response.json();

    const timings = data.data.timings;

    // Filtrer uniquement ce que Dawarich utilise
    const filtered = {
      Fajr: timings.Fajr,
      Dhuhr: timings.Dhuhr,
      Asr: timings.Asr,
      Maghrib: timings.Maghrib,
      Isha: timings.Isha
    };

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Erreur de récupération des horaires" });
  }
};
