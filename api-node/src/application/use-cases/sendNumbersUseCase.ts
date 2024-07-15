import { Numbers } from '../../domain/entities/numbers';
import { INumbersRepository } from '../../domain/repositories/INumbersRepository';

interface IRequest {
    number1: number;
    number2: number;
}

export class SendNumbersUseCase {
    constructor(private numbersRepository: INumbersRepository) {}

    public async execute({ number1, number2 }: IRequest): Promise<Numbers> {
        const numbers = new Numbers(number1, number2, 'processing');
        await this.numbersRepository.save(numbers);
        return numbers;
    }
}
