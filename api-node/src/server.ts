import express from 'express';
import { connectDB } from './infrastructure/db/mongoose';
import amqplib from 'amqplib';
import dotenv from 'dotenv';
import NumberModel from './infrastructure/mongoose/numbersModel';

dotenv.config();

const app = express();
app.use(express.json());

const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost';

let channel: amqplib.Channel | undefined;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectRabbitMQ() {
  try {
    await sleep(10000);
    const connection = await amqplib.connect(rabbitUrl);
    channel = await connection.createChannel();
    await channel.assertQueue('numbers');
    console.log('Connected to RabbitMQ');
  } catch (error) { 
    console.error('Failed to connect to RabbitMQ:', error);
    process.exit(1);
  }
}

async function sendMessage(message: string) {
  if (!channel) {
    console.error('RabbitMQ channel is not initialized');
    throw new Error('RabbitMQ channel is not initialized');
  }
  try {
    channel.sendToQueue('numbers', Buffer.from(message));
    console.log('Message sent to queue:', message);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
}

app.post('/numbers', async (req, res) => {
  const { number1, number2 } = req.body;
  const doc = { number1, number2, status: 'processing' };

  try {
    const calculation = new NumberModel(doc);
    const savedCalculation = await calculation.save();

    const message = JSON.stringify({ id: savedCalculation._id, number1, number2 });
    await sendMessage(message);

    res.status(200).send({ message: 'Send numbers', id: savedCalculation._id });
  } catch (error) {
    console.error('Failed to process the send numbers:', error);
    res.status(500).send({ error: 'Failed to process the send numbers' });
  }
});

app.get('/numbers', async (req, res) => {
  try {
    const numbers = await NumberModel.find();
    res.status(200).send(numbers);
  } catch (error) {
    console.error('Failed to retrieve numbers:', error);
    res.status(500).send({ error: 'Failed to retrieve numbers' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  await connectRabbitMQ();
  console.log(`API running on port ${PORT}`);
});
