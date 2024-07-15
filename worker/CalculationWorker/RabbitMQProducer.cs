using System;
using RabbitMQ.Client;
using System.Text;

public class RabbitMQProducer {
    private const string HostName = "localhost";
    private const string QueueName = "calculations";
    private const string UserName = "guest";
    private const string Password = "guest";

    public static void SendMessage(string message) {
        var factory = new ConnectionFactory() {
            HostName = HostName,
            UserName = UserName,
            Password = Password
        };

        using (var connection = factory.CreateConnection())
        using (var channel = connection.CreateModel()) {
            channel.QueueDeclare(queue: QueueName,
                                 durable: true,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

            var body = Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(exchange: "",
                                 routingKey: QueueName,
                                 basicProperties: null,
                                 body: body);
            Console.WriteLine(" [x] Sent {0}", message);
        }
    }
}
