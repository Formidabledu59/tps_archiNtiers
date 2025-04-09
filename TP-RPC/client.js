const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './todo.proto';

// Chargement du fichier .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const todoProto = grpc.loadPackageDefinition(packageDefinition).todo;

// Création du client
const client = new todoProto.TodoService('127.0.0.1:50051', grpc.credentials.createInsecure());

// Ajouter une tâche
client.AddTask({ id: '1', description: 'Learn gRPC' }, (err, response) => {
  if (err) console.error(err);
  else console.log(response.message);

  // Récupérer les tâches
  client.GetTasks({}, (err, response) => {
    if (err) console.error(err);
    else console.log('Tasks:', response.tasks);

    // Récupérer les jeux
    client.GetGames({}, (err, response) => {
      if (err) console.error(err);
      else console.log('Games:', response.games);

      // Ajouter un produit
      client.AddProduct({ name: 'Product1', description: 'Description1', price: 10.0 }, (err, response) => {
        if (err) console.error(err);
        else console.log(response.message);

        // Récupérer les produits
        client.GetProducts({}, (err, response) => {
          if (err) console.error(err);
          else {
            console.log('Products:', response.products);

            // Vérifier s'il y a des produits avant de continuer
            if (response.products.length > 0) {
              const productId = response.products[0].id;

              // Mettre à jour un produit
              client.UpdateProduct({ id: productId, name: 'Updated Product1', description: 'Updated Description1', price: 20.0 }, (err, response) => {
                if (err) console.error(err);
                else console.log(response.message);

                // Supprimer un produit
                client.DeleteProduct({ id: productId }, (err, response) => {
                  if (err) console.error(err);
                  else console.log(response.message);
                });
              });
            } else {
              console.log('No products found to update or delete.');
            }
          }
        });
      });
    });
  });
});