import { Numbers } from '../entities/numbers';

export interface INumbersRepository {
    save(calculation: Numbers): Promise<Numbers>;
    // Outros métodos como findById, update, etc. podem ser adicionados aqui
}
