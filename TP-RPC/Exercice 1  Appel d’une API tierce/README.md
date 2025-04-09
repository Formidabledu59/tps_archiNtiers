# TP-RPC

Ce projet implémente un serveur gRPC pour gérer des tâches et récupérer des jeux à partir de l'API FreeToGame.

## Structure du projet

```
client.js
package.json
README.md
server.js
todo.proto
```

## Prérequis

- Node.js
- npm (Node Package Manager)

## Installation

1. Clonez le dépôt ou téléchargez les fichiers.
2. Installez les dépendances en exécutant la commande suivante dans le répertoire du projet :

```sh
npm install
```

## Utilisation

### Démarrer le serveur

Pour démarrer le serveur gRPC, exécutez la commande suivante :

```sh
npm start
```

Le serveur écoutera sur `0.0.0.0:50051`.

### Utiliser le client

Pour utiliser le client gRPC, exécutez la commande suivante dans un autre terminal :

```sh
node client.js
```

Le client effectuera les opérations suivantes :
1. Ajouter une tâche avec l'ID `1` et la description `Learn gRPC`.
2. Récupérer la liste des tâches.
3. Récupérer la liste des jeux à partir de l'API FreeToGame.

### Services gRPC

#### AddTask

Ajoute une tâche à la liste des tâches.

- **Requête** : `Task`
  - `string id` : ID de la tâche.
  - `string description` : Description de la tâche.
- **Réponse** : `AddTaskResponse`
  - `string message` : Message de confirmation.

#### GetTasks

Récupère la liste des tâches.

- **Requête** : `Empty`
- **Réponse** : `TaskList`
  - `repeated Task tasks` : Liste des tâches.

#### GetGames

Récupère la liste des jeux à partir de l'API FreeToGame.

- **Requête** : `Empty`
- **Réponse** : `GameList`
  - `repeated Game games` : Liste des jeux.

### Protocole gRPC

Le fichier `todo.proto` définit les services et les messages utilisés par le serveur et le client gRPC.

```proto
syntax = "proto3";

package todo;

// Définition du service
service TodoService {
  rpc AddTask (Task) returns (AddTaskResponse);
  rpc GetTasks (Empty) returns (TaskList);
  rpc GetGames (Empty) returns (GameList); // Nouvelle méthode
}

// Messages utilisés par le service
message Task {
  string id = 1;
  string description = 2;
}

message AddTaskResponse {
  string message = 1;
}

message TaskList {
  repeated Task tasks = 1;
}

message Game {
  string id = 1;
  string title = 2;
  string genre = 3;
  string platform = 4;
}

message GameList {
  repeated Game games = 1;
}

message Empty {}
```

## Auteur

Ayoub FATHALLAH

## Licence

Ce projet est sous licence ISC.