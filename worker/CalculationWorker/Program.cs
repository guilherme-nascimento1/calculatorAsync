using System;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Text;
using Newtonsoft.Json;

namespace CalculationWorker {
    class Program {
        private static IMongoCollection<BsonDocument> _calculationCollection;

        static void Main(string[] args) {
            // Conectar ao MongoDB
            var mongoClient = new MongoClient("mongodb://localhost:27017");
            var database = mongoClient.GetDatabase("calculationDB");
            _calculationCollection = database.GetCollection<BsonDocument>("calculations");

            // Conectar ao RabbitMQ
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();

            // Declarar a fila
            channel.QueueDeclare(queue: "numbers", durable: true, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) => {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine($"Received message: {message}");

                var calculation = JsonConvert.DeserializeObject<Calculation>(message);
                if (calculation != null) {
                    ProcessCalculation(calculation);
                } else {
                    Console.WriteLine("Failed to deserialize calculation message.");
                }
            };

            channel.BasicConsume(queue: "numbers", autoAck: true, consumer: consumer);

            Console.WriteLine("Press [enter] to exit.");
            Console.ReadLine();
        }

        private static void ProcessCalculation(Calculation calculation) {
            try {
                var sum = calculation.Number1 + calculation.Number2;
                var difference = calculation.Number1 - calculation.Number2;
                var product = calculation.Number1 * calculation.Number2;
                var quotient = calculation.Number2 != 0 ? (double?)calculation.Number1 / calculation.Number2 : null;

                var result = new {
                    Sum = sum,
                    Difference = difference,
                    Product = product,
                    Quotient = quotient
                };

                Console.WriteLine($"Calculation results: Sum = {sum}, Difference = {difference}, Product = {product}, Quotient = {quotient}");

                // Atualizar o status no MongoDB
                var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(calculation.Id));
                var update = Builders<BsonDocument>.Update
                    .Set("status", "finalizado")
                    .Set("result", BsonDocument.Parse(JsonConvert.SerializeObject(result)));

                _calculationCollection.UpdateOne(filter, update);
            } catch (Exception ex) {
                Console.WriteLine($"Failed to process calculation: {ex.Message}");
            }
        }
    }
}
