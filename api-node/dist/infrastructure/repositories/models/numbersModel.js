"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const numbersSchema = new mongoose_1.Schema({
    number1: { type: Number, required: true },
    number2: { type: Number, required: true },
    status: { type: String, required: true },
    result: { type: Number }
}, { timestamps: true });
const NumbersModel = (0, mongoose_1.model)('numbers', numbersSchema);
exports.default = NumbersModel;
