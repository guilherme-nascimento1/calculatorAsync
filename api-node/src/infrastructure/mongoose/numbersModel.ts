
import { Schema, model, models } from 'mongoose';

const numbersSchema = new Schema({
    number1: { type: Number, required: true },
    number2: { type: Number, required: true },
    status: { type: String, required: true },
    result: { type: Number, required: false },
});

const NumberModel = models.Calculation || model('Numbers', numbersSchema);

export default NumberModel;
