"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToQueue = exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let channel;
const connectRabbitMQ = async () => {
    try {
        const connection = await amqplib_1.default.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    }
    catch (error) {
        console.error('RabbitMQ connection error:', error);
        process.exit(1);
    }
};
exports.connectRabbitMQ = connectRabbitMQ;
const publishToQueue = async (queue, message) => {
    if (!channel) {
        await connectRabbitMQ();
    }
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
};
exports.publishToQueue = publishToQueue;
