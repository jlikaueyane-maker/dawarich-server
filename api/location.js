// api/location.js

// Petit stockage en mémoire
let logs = [];

// Fonction principale de l'API
module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    // Retourne tous les arrêts stockés
    res.status(200).json({ logs });
  } 
  else if (req.method === "POST") {
    try {
      let body = "";

      // Récupérer le body de la requête
      req.on("data", chunk => {
        body += chunk.toString();
      });

      req.on("end", () => {
