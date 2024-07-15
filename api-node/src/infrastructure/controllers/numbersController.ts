import { Request, Response, NextFunction } from 'express';
import { SendNumbersUseCase } from '../../application/use-cases/sendNumbersUseCase';
import { CalculationRepositoryMongo } from '../repositories/numbersRepositoryMongo';

export class NumbersController {
    private calculateNumbersUseCase: SendNumbersUseCase;

    constructor() {
        const calculationRepository = new CalculationRepositoryMongo();
        this.calculateNumbersUseCase = new SendNumbersUseCase(calculationRepository);
    }

    public calculate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { number1, number2 } = req.body;
            const result = await this.calculateNumbersUseCase.execute({ number1, number2 });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
}
