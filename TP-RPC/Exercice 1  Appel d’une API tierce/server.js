const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const axios = require('axios');
const PROTO_PATH = './todo.proto';

// Chargement du fichier .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const todoProto = grpc.loadPackageDefinition(packageDefinition).todo;

// Liste des tâches en mémoire
const tasks = [];

// Implémentation des méthodes du service
const addTask = (call, callback) => {
  const task = call.request;
  tasks.push(task);
  callback(null, { message: 'Task added successfully!' });
};

const getTasks = (call, callback) => {
  callback(null, { tasks });
};

const getGames = async (call, callback) => {
  try {
    const response = await axios.get('https://www.freetogame.com/api/games');
    const games = response.data.map(game => ({
      id: game.id.toString(),
      title: game.title,
      genre: game.genre,
      platform: game.platform
    }));
    callback(null, { games });
  } catch (error) {
    callback(error);
  }
};

// Démarrage du serveur
const server = new grpc.Server();
server.addService(todoProto.TodoService.service, { addTask, getTasks, getGames });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running on http://0.0.0.0:50051');
  server.start();
});