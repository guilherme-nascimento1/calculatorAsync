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
exports.CalculationController = void 0;
const calculateNumbersUseCase_1 = require("../../application/use-cases/calculateNumbersUseCase");
const calculationRepositoryMongo_1 = require("../repositories/calculationRepositoryMongo");
class CalculationController {
    constructor() {
        this.calculate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { number1, number2 } = req.body;
                const result = yield this.calculateNumbersUseCase.execute({ number1, number2 });
                res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        const calculationRepository = new calculationRepositoryMongo_1.CalculationRepositoryMongo();
        this.calculateNumbersUseCase = new calculateNumbersUseCase_1.CalculateNumbersUseCase(calculationRepository);
    }
}
exports.CalculationController = CalculationController;
