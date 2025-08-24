// La fonction principale de l'API
module.exports = (req, res) => {
  // Définir les en-têtes pour autoriser l'accès depuis n'importe où (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  // Traiter la requête si elle est une requête de pré-vol (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Vérifiez si la requête a le bon chemin
  if (req.url === '/') {
    // Réponse de l'API pour Dawarich
    res.status(200).json({
      message: "Bienvenue sur l'API de base pour Dawarich !",
      status: "ok",
      apiVersion: "1.0",
      description: "Cette API simple est en ligne et prête à être utilisée par l'application Dawarich. Aucune donnée de livre n'est stockée ici. C'est uniquement une démonstration.",
    });
  } else {
    // Si la requête ne correspond pas, renvoyer une erreur 404
    res.status(404).json({
      error: "Point de terminaison non trouvé. L'API est disponible à la racine de l'URL du serveur.",
    });
  }
};
