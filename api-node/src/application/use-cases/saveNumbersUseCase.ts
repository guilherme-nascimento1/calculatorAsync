import numbersModel from '../../infrastructure/repositories/models/numbersModel';
import { publishToQueue } from '../../infrastructure/messageBroker/rabbitmq';

class SaveNumbersUseCase {
  async execute(number1: number, number2: number) {
    const numbers = new numbersModel({
      number1,
      number2,
      status: 'processing',
    });

    await numbers.save();

    const message = JSON.stringify({ id: numbers._id, number1, number2 });
    await publishToQueue('numbers', message);

    return numbers;
  }
}

export default SaveNumbersUseCase;