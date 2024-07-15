import { INumbersRepository } from '../../domain/repositories/INumbersRepository';
import { Numbers } from '../../domain/entities/numbers';
import CalculationModel from './models/numbersModel';

export class CalculationRepositoryMongo implements INumbersRepository {
    public async save(calculation: Numbers): Promise<Numbers> {
        const createdCalculation = new CalculationModel(calculation);
        await createdCalculation.save();
        return createdCalculation.toObject();
    }
}
