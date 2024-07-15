"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateNumbersUseCase = void 0;
const calculation_1 = require("../../domain/entities/calculation");
class CalculateNumbersUseCase {
    constructor(calculationRepository) {
        this.calculationRepository = calculationRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ number1, number2 }) {
            const calculation = new calculation_1.Calculation(number1, number2, 'processing');
            yield this.calculationRepository.save(calculation);
            return calculation;
        });
    }
}
exports.CalculateNumbersUseCase = CalculateNumbersUseCase;
