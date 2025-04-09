// const net = require("net");

// const PORT = 6667;
// const clients = [];

// // Création du serveur TCP
// const server = net.createServer((socket) => {
//   socket.write("Bienvenue sur le serveur IRC ! Quel est votre pseudo ?\n");

//   let pseudo = null; // Pseudo de l'utilisateur
//   let buffer = "";   // Buffer pour stocker les messages temporaires

//   // Diffuser un message à tous les clients sauf l'expéditeur
//   const broadcast = (message, sender) => {
//     clients.forEach((client) => {
//       if (client !== sender) {
//         client.write(message);
//       }
//     });
//   };

//   // Fonction pour gérer les données reçues
//   socket.on("data", (data) => {
//     buffer += data.toString(); // Ajouter les données au buffer

//     // Vérifier si l'utilisateur a validé avec "Entrée"
//     if (buffer.includes("\n")) {
//       const message = buffer.trim(); // Supprimer les espaces et retours à la ligne
//       buffer = ""; // Réinitialiser le buffer

//       if (!pseudo) {
//         // Première interaction : définir le pseudo
//         pseudo = message;
//         clients.push(socket);
//         console.log(`${pseudo} vient de se connecter.`);
//         broadcast(`-- ${pseudo} a rejoint le chat --\n\r`, socket);
//         socket.write(`Bienvenue ${pseudo} ! Vous pouvez maintenant discuter.\n\r`);
//       } else {
//         // Diffuser le message aux autres clients
//         console.log(`${pseudo}: ${message}`);
//         broadcast(`${pseudo}: ${message}\n\r`, socket);
//       }
//     }
//   });

//   // Gestion de la déconnexion
//   socket.on("end", () => {
//     console.log(`${pseudo} s'est déconnecté.`);
//     clients.splice(clients.indexOf(socket), 1);
//     broadcast(`-- ${pseudo} a quitté le chat --\n`, socket);
//   });

//   // Gestion des erreurs
//   socket.on("error", (err) => {
//     console.error(`Erreur avec ${pseudo}: ${err.message}`);
//   });
// });

// // Démarrage du serveur
// server.listen(PORT, () => {
//   console.log(`Serveur IRC en écoute sur le port ${PORT}`);
// });


// //telnet localhost 6667

//--------------------------------------------------------------------------------------------------------
// const net = require("net");

// const PORT = 6667;
// const clients = [];

// // Création du serveur TCP
// const server = net.createServer((socket) => {
//   socket.write("Bienvenue sur le serveur IRC ! Quel est votre pseudo ?\n");

//   let pseudo = null; // Pseudo de l'utilisateur
//   let buffer = "";   // Buffer pour stocker les messages temporaires

//   // Diffuser un message à tous les clients sauf l'expéditeur
//   const broadcast = (message, sender) => {
//     clients.forEach((client) => {
//       if (client !== sender) {
//         client.socket.write(message);
//       }
//     });
//   };

//   // Fonction pour gérer les données reçues
//   socket.on("data", (data) => {
//     buffer += data.toString(); // Ajouter les données au buffer

//     // Vérifier si l'utilisateur a validé avec "Entrée"
//     if (buffer.includes("\n")) {
//       const message = buffer.trim(); // Supprimer les espaces et retours à la ligne
//       buffer = ""; // Réinitialiser le buffer

//       if (!pseudo) {
//         // Première interaction : définir le pseudo
//         pseudo = message;
//         clients.push({ socket, pseudo });
//         console.log(`${pseudo} vient de se connecter.`);
//         broadcast(`-- ${pseudo} a rejoint le chat --\n`, socket);
//         socket.write(`Bienvenue ${pseudo} ! Vous pouvez maintenant discuter.\n\r`);
//       } else {
//         if (message === "/list") {
//           // Commande /list : afficher les pseudos connectés
//           const pseudos = clients.map((client) => client.pseudo).join(", ");
//           socket.write(`Utilisateurs connectés : ${pseudos}\n\r`);
//         } else {
//           // Diffuser le message aux autres clients
//           console.log(`${pseudo}: ${message}`);
//           broadcast(`${pseudo}: ${message}\n\r`, socket);
//         }
//       }
//     }
//   });

//   // Gestion de la déconnexion
//   socket.on("end", () => {
//     console.log(`${pseudo} s'est déconnecté.`);
//     const index = clients.findIndex((client) => client.socket === socket);
//     if (index !== -1) {
//       clients.splice(index, 1);
//     }
//     broadcast(`-- ${pseudo} a quitté le chat --\n`, socket);
//   });

//   // Gestion des erreurs
//   socket.on("error", (err) => {
//     console.error(`Erreur avec ${pseudo}: ${err.message}`);
//   });
// });

// // Démarrage du serveur
// server.listen(PORT, () => {
//   console.log(`Serveur IRC en écoute sur le port ${PORT}`);
// });

//-----------------------------------------------------------------------------------------------------------------

const net = require("net");

const PORT = 6667;
const clients = [];

// Création du serveur TCP
const server = net.createServer((socket) => {
  socket.write("Bienvenue sur le serveur IRC ! Quel est votre pseudo ?\n");

  let pseudo = null; // Pseudo de l'utilisateur
  let buffer = "";   // Buffer pour stocker les messages temporaires

  // Diffuser un message à tous les clients sauf l'expéditeur
  const broadcast = (message, sender) => {
    clients.forEach((client) => {
      if (client.socket !== sender) {
        client.socket.write(message);
      }
    });
  };

  // Envoyer un message privé à un utilisateur
  const whisper = (targetPseudo, message, sender) => {
    const targetClient = clients.find((client) => client.pseudo === targetPseudo);
    if (targetClient) {
      targetClient.socket.write(`[Whisper][${pseudo}] ${message}\n\r`);
      sender.write(`[Whisper à ${targetPseudo}] ${message}\n\r`);
    } else {
      sender.write(`Utilisateur ${targetPseudo} introuvable.\n\r`);
    }
  };

  // Fonction pour gérer les données reçues
  socket.on("data", (data) => {
    buffer += data.toString(); // Ajouter les données au buffer

    // Vérifier si l'utilisateur a validé avec "Entrée"
    if (buffer.includes("\n")) {
      const message = buffer.trim(); // Supprimer les espaces et retours à la ligne
      buffer = ""; // Réinitialiser le buffer

      if (!pseudo) {
        // Première interaction : définir le pseudo
        pseudo = message;
        clients.push({ socket, pseudo });
        console.log(`${pseudo} vient de se connecter.`);
        broadcast(`-- ${pseudo} a rejoint le chat --\n`, socket);
        socket.write(`Bienvenue ${pseudo} ! Vous pouvez maintenant discuter.\n\r`);
      } else {
        if (message.startsWith("/whisper")) {
          // Commande /whisper
          const parts = message.split(" ");
          const targetPseudo = parts[1];
          const whisperMessage = parts.slice(2).join(" ");

          if (targetPseudo && whisperMessage) {
            whisper(targetPseudo, whisperMessage, socket);
          } else {
            socket.write("Usage : /whisper <pseudo> <message>\n\r");
          }
        } else if (message === "/list") {
          // Commande /list : afficher les pseudos connectés
          const pseudos = clients.map((client, index) => `# ${index + 1}. ${client.pseudo}`).join("\n");
          socket.write(`Utilisateurs connectés :\n${pseudos}\n\r`);
        } else {
          // Diffuser le message aux autres clients
          console.log(`${pseudo}: ${message}`);
          broadcast(`${pseudo}: ${message}\n\r`, socket);
        }
      }
    }
  });

  // Gestion de la déconnexion
  socket.on("end", () => {
    console.log(`${pseudo} s'est déconnecté.`);
    const index = clients.findIndex((client) => client.socket === socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
    broadcast(`-- ${pseudo} a quitté le chat --\n`, socket);
  });

  // Gestion des erreurs
  socket.on("error", (err) => {
    console.error(`Erreur avec ${pseudo}: ${err.message}`);
  });
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Serveur IRC en écoute sur le port ${PORT}`);
});
