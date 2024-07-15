"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateNumbersUseCase = void 0;
const calculation_1 = require("../../domain/entities/calculation");
class CalculateNumbersUseCase {
    constructor(calculationRepository) {
        this.calculationRepository = calculationRepository;
    }
    async execute({ number1, number2 }) {
        const calculation = new calculation_1.Calculation(number1, number2, 'processing');
        await this.calculationRepository.save(calculation);
        return calculation;
    }
}
exports.CalculateNumbersUseCase = CalculateNumbersUseCase;
