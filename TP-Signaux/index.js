// // Fonction générique pour gérer les signaux
// async function handleSignal(signal) {
//     console.log(`Signal ${signal} reçu.`);
//   }
  
//   // Ecoute du signal SIGINT.
//   process.on("SIGINT", () => handleSignal("SIGINT"));
  
//   // Simulation d'une application qui reste active
//   console.log("Application en cours d'exécution.");
//   console.log(
//     "Appuyez sur CTRL+C pour envoyer un signal."
//   );
  
//   // Execute la fonction toutes les 5 secondes.
//   setInterval(() => {
//     console.log("Le processus est toujours actif...");
//   }, 5000);

//------------------------------------------------------------------------

// // Fonction générique pour gérer les signaux
// async function handleSignal(signal) {
//     console.log(`Signal ${signal} reçu.`);
//     console.log("Nettoyage en cours...");
    
//     // Arrêtez le processus après 5 secondes
//     setTimeout(() => {
//       console.log("Le processus s'arrête.");
//       process.exit(0);
//     }, 5000);
//   }
  
//   // Écoute du signal SIGINT
//   process.on("SIGINT", () => handleSignal("SIGINT"));
  
//   // Simulation d'une application qui reste active
//   console.log("Application en cours d'exécution.");
//   console.log("Appuyez sur CTRL+C pour envoyer un signal.");
  
//   // Exécute la fonction toutes les 5 secondes
//   setInterval(() => {
//     console.log("Le processus est toujours actif...");
//   }, 5000);
  
//--------------------------------------------------------------------------

let canExit = true; // Indique si le processus peut être arrêté

// Fonction générique pour gérer les signaux
async function handleSignal(signal) {
  if (canExit) {
    console.log(`Signal ${signal} reçu.`);
    console.log("Nettoyage en cours...");

    // Arrêtez le processus après 5 secondes
    setTimeout(() => {
      console.log("Le processus s'arrête.");
      process.exit(0);
    }, 5000);
  } else {
    console.log("Arrêt impossible pour le moment.");
  }
}

// Écoute du signal SIGINT
process.on("SIGINT", () => handleSignal("SIGINT"));

// Simulation d'une application qui reste active
console.log("Application en cours d'exécution.");
console.log("Appuyez sur CTRL+C pour envoyer un signal.");

// Exécute la fonction toutes les 5 secondes
setInterval(() => {
  console.log("Le processus est toujours actif...");
}, 5000);

// Change l'état toutes les 5 secondes
setInterval(() => {
  canExit = !canExit;
  console.log(
    canExit
      ? "Le processus peut être arrêté."
      : "Le processus ne peut pas être arrêté."
  );
}, 5000);
