import express from "express";

// Création de l'app Express
const app = express();

// Fonction utilitaire pour récupérer les horaires
async function getPrayerTimes(city = "Brussels", country = "Belgium") {
  const response = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`
  );

  if (!response.ok) throw new Error(`API externe renvoie ${response.status}`);

  const data = await response.json();
  const timings = data.data.timings;

  return {
    Fajr: timings.Fajr,
    Dhuhr: timings.Dhuhr,
    Asr: timings.Asr,
    Maghrib: timings.Maghrib,
    Isha: timings.Isha,
  };
}

// 👉 Racine et /prayer-times font la même chose
app.get(["/", "/prayer-times"], async (req, res) => {
  const { city = "Brussels", country = "Belgium" } = req.query;

  try {
    const timings = await getPrayerTimes(city, country);
    res.json({ code: 200, status: "OK", data: { timings } });
  } catch (error) {
    console.error("Erreur API:", error.message);
    res.status(500).json({
      code: 500,
      status: "Erreur",
      message: "Erreur de récupération des horaires",
    });
  }
});

// 👉 Export spécial pour Vercel
export default app;
