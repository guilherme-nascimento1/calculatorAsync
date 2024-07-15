require('dotenv').config();
const amqplib = require('amqplib');

const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672';

async function checkConnection() {
    try {
        console.log(`Attempting to connect to RabbitMQ at ${rabbitUrl}`);
        const connection = await amqplib.connect(rabbitUrl, { timeout: 10000 });
        console.log('Connected to RabbitMQ');
        await connection.close();
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
    }
}

checkConnection();
