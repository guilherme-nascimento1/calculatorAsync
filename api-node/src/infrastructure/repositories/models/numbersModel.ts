import { Schema, model } from 'mongoose';
import { Numbers } from '../../../domain/entities/numbers';

const numbersSchema = new Schema<Numbers>({
    number1: { type: Number, required: true },
    number2: { type: Number, required: true },
    status: { type: String, required: true },
    result: { type: Number }
}, { timestamps: true });

const NumbersModel = model<Numbers>('numbers', numbersSchema);
export default NumbersModel;
