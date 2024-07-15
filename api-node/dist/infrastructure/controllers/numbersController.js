"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumbersController = void 0;
const sendNumbersUseCase_1 = require("../../application/use-cases/sendNumbersUseCase");
const numbersRepositoryMongo_1 = require("../repositories/numbersRepositoryMongo");
class NumbersController {
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
        const calculationRepository = new numbersRepositoryMongo_1.CalculationRepositoryMongo();
        this.calculateNumbersUseCase = new sendNumbersUseCase_1.SendNumbersUseCase(calculationRepository);
    }
}
exports.NumbersController = NumbersController;
