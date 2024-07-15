"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("./infrastructure/db/mongoose");
const amqplib_1 = __importDefault(require("amqplib"));
const dotenv_1 = __importDefault(require("dotenv"));
const numbersModel_1 = __importDefault(require("./infrastructure/mongoose/numbersModel")); // Importar o modelo Calculation
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
let channel;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function connectRabbitMQ() {
    try {
        await sleep(10000);
        const connection = await amqplib_1.default.connect(rabbitUrl);
        channel = await connection.createChannel();
        await channel.assertQueue('calculations');
        console.log('Connected to RabbitMQ');
    }
    catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        process.exit(1);
    }
}
async function sendMessage(message) {
    if (!channel) {
        console.error('RabbitMQ channel is not initialized');
        throw new Error('RabbitMQ channel is not initialized');
    }
    try {
        channel.sendToQueue('calculations', Buffer.from(message));
    }
    catch (error) {
        console.error('Failed to send message:', error);
    }
}
app.post('/calculate', async (req, res) => {
    const { number1, number2 } = req.body;
    const doc = { number1, number2, status: 'processing' };
    try {
        const calculation = new numbersModel_1.default(doc);
        const savedCalculation = await calculation.save();
        const message = JSON.stringify({ id: savedCalculation._id, number1, number2 });
        await sendMessage(message);
        res.status(200).send({ message: 'Calculation started', id: savedCalculation._id });
    }
    catch (error) {
        console.error('Failed to process calculation:', error);
        res.status(500).send({ error: 'Failed to process calculation' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await (0, mongoose_1.connectDB)();
    await connectRabbitMQ();
    console.log(`API running on port ${PORT}`);
});
