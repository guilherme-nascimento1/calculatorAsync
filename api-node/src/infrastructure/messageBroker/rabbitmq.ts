import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

let channel: amqp.Channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    process.exit(1);
  }
};

const publishToQueue = async (queue: string, message: string) => {
  if (!channel) {
    await connectRabbitMQ();
  }
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
};

export { connectRabbitMQ, publishToQueue };