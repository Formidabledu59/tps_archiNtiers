# TP-RPC

Ce projet implémente un serveur gRPC pour gérer des tâches et récupérer des jeux à partir de l'API FreeToGame, ainsi que pour gérer une liste de produits dans une base de données MongoDB.

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
- Docker

## Installation

1. Clonez le dépôt ou téléchargez les fichiers.
2. Installez les dépendances en exécutant la commande suivante dans le répertoire du projet :

```sh
npm install
```

3. Lancez une instance MongoDB en local avec Docker :

```sh
docker run --name mongodb -p 27017:27017 -d mongo
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
4. Ajouter un produit.
5. Récupérer la liste des produits.
6. Mettre à jour un produit.
7. Supprimer un produit.

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

#### AddProduct

Ajoute un produit à la liste des produits.

- **Requête** : `Product`
  - `string name` : Nom du produit.
  - `string description` : Description du produit.
  - `double price` : Prix du produit.
- **Réponse** : `ProductResponse`
  - `string message` : Message de confirmation.

#### UpdateProduct

Met à jour un produit dans la liste des produits.

- **Requête** : `Product`
  - `string id` : ID du produit.
  - `string name` : Nom du produit.
  - `string description` : Description du produit.
  - `double price` : Prix du produit.
- **Réponse** : `ProductResponse`
  - `string message` : Message de confirmation.

#### DeleteProduct

Supprime un produit de la liste des produits.

- **Requête** : `ProductId`
  - `string id` : ID du produit.
- **Réponse** : `ProductResponse`
  - `string message` : Message de confirmation.

#### GetProducts

Récupère la liste des produits.

- **Requête** : `Empty`
- **Réponse** : `ProductList`
  - `repeated Product products` : Liste des produits.

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
  rpc AddProduct (Product) returns (ProductResponse); // Nouvelle méthode
  rpc UpdateProduct (Product) returns (ProductResponse); // Nouvelle méthode
  rpc DeleteProduct (ProductId) returns (ProductResponse); // Nouvelle méthode
  rpc GetProducts (Empty) returns (ProductList); // Nouvelle méthode
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

message Product {
  string id = 1;
  string name = 2;
  string description = 3;
  double price = 4;
}

message ProductResponse {
  string message = 1;
}

message ProductList {
  repeated Product products = 1;
}

message ProductId {
  string id = 1;
}

message Empty {}
```

## Auteur

Ayoub FATHALLAH

## Licence

Ce projet est sous licence ISC.