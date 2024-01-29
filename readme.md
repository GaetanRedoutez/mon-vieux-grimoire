# Mon Vieux Grimoire - Backend
Bienvenue dans le backend de "Mon Vieux Grimoire" ! Ce projet propose une API documentée avec Swagger. Le frontend correspondant est fourni par OPC, et vous pouvez le trouver ici : https://github.com/GaetanRedoutez/mon-vieux-grimoire-front.

## Prérequis
1. Avoir Node.JS

## Documentation API
Une documentation Swagger détaillée est disponible à l'adresse /api-docs. Vous y trouverez une liste complète des routes disponibles, accompagnées des schémas pour faciliter la compréhension. Pour accéder aux routes protégées, veuillez suivre ces étapes :

1. Obtenez un Bearer Token en utilisant la route de login.
2. Ajoutez le Bearer Token dans la case "Authorize" pour accéder aux routes protégées.

## Installation
Si vous souhaitez exécuter localement le backend, suivez ces étapes :

1. Clonez ce dépôt.
2. Installez les dépendances avec la commande : npm install.
3. Créer un fichier .env pour ajouter les logs de connexion à MongoDB
4. Coller ces informations dans le fichier .env : ```MONGO_USER = redoutezgaetan``` ```MONGO_PASSWORD = PVG7aTPwZdUdmPBB```
5. Démarrez le serveur avec la commande ```node server```