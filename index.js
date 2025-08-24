import React, { useState, useEffect } from 'react';

// Le composant principal de l'application
const App = () => {
  // État pour stocker la réponse de l'API
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour simuler un appel d'API
    const fetchData = async () => {
      // Obtenir le chemin de l'URL actuelle
      const path = window.location.pathname;

      if (path === '/api') {
        try {
          // Si le chemin est '/api', simuler la réponse de l'API
          const response = {
            message: "Serveur Dawarich en ligne !",
            status: "success",
            timestamp: new Date().toISOString()
          };
          setApiResponse(response);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        // Pour tous les autres chemins, c'est la page d'accueil
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction pour afficher le contenu en fonction du chemin de l'URL
  const renderContent = () => {
    const path = window.location.pathname;

    switch (path) {
      case '/api':
        // C'est le point de terminaison de l'API. Nous affichons une réponse JSON.
        return (
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-xl max-w-lg mx-auto text-center font-mono animate-fade-in">
            <h1 className="text-2xl font-bold mb-4 text-green-400">Réponse de l'API</h1>
            {loading ? (
              <p>Chargement...</p>
            ) : error ? (
              <p className="text-red-400">Erreur : {error}</p>
            ) : (
              <pre className="text-left bg-gray-900 p-4 rounded-md overflow-x-auto">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            )}
          </div>
        );
      default:
        // Page d'accueil pour l'utilisateur
        return (
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl max-w-xl mx-auto text-center transform transition-all hover:scale-105 duration-300">
            <h1 className="text-4xl font-extrabold mb-4 text-indigo-600">Serveur Dawarich</h1>
            <p className="text-lg mb-6">
              Votre serveur est en ligne ! Vous pouvez maintenant utiliser cette URL pour configurer votre application Dawarich sur votre iPhone.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <p className="font-semibold text-sm text-gray-600 mb-2">
                URL du Serveur :
              </p>
              <code className="bg-indigo-100 text-indigo-800 font-mono p-2 rounded-md break-all">
                {window.location.origin}
              </code>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Note : Cette page est une simple interface pour vérifier le statut. L'API pour Dawarich est disponible à l'URL ci-dessus, suivie de "/api".
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  );
};

// Export du composant App par défaut
export default App;

