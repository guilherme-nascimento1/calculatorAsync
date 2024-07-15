"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculationController = void 0;
const calculateNumbersUseCase_1 = require("../../application/use-cases/calculateNumbersUseCase");
const calculationRepositoryMongo_1 = require("../repositories/calculationRepositoryMongo");
class CalculationController {
    constructor() {
        this.calculate = async (req, res, next) => {
            try {
                const { number1, number2 } = req.body;
                const result = await this.calculateNumbersUseCase.execute({ number1, number2 });
                res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        };
        const calculationRepository = new calculationRepositoryMongo_1.CalculationRepositoryMongo();
        this.calculateNumbersUseCase = new calculateNumbersUseCase_1.CalculateNumbersUseCase(calculationRepository);
    }
}
exports.CalculationController = CalculationController;
