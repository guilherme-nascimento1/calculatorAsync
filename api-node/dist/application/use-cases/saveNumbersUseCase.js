"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const numbersModel_1 = __importDefault(require("../../infrastructure/repositories/models/numbersModel"));
const rabbitmq_1 = require("../../infrastructure/messageBroker/rabbitmq");
class SaveNumbersUseCase {
    async execute(number1, number2) {
        const numbers = new numbersModel_1.default({
            number1,
            number2,
            status: 'processing',
        });
        await numbers.save();
        const message = JSON.stringify({ id: numbers._id, number1, number2 });
        await (0, rabbitmq_1.publishToQueue)('numbers', message);
        return numbers;
    }
}
exports.default = SaveNumbersUseCase;
