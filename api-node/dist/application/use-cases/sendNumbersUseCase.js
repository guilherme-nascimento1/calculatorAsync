"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNumbersUseCase = void 0;
const numbers_1 = require("../../domain/entities/numbers");
class SendNumbersUseCase {
    constructor(numbersRepository) {
        this.numbersRepository = numbersRepository;
    }
    async execute({ number1, number2 }) {
        const numbers = new numbers_1.Numbers(number1, number2, 'processing');
        await this.numbersRepository.save(numbers);
        return numbers;
    }
}
exports.SendNumbersUseCase = SendNumbersUseCase;
