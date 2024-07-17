const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Module pour gérer les chemins de fichiers

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Définir le dossier des ressources statiques (pour servir les fichiers HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname)));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Gestion des connexions socket.io
io.on('connection', (socket) => {
    console.log('Nouvelle connexion socket.io');

    // Écouter l'événement 'message' depuis le client
    socket.on('message', (message) => {
        console.log('Message reçu:', message);

        // Envoyer le message à tous les clients connectés (broadcast)
        io.emit('message', message);
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
