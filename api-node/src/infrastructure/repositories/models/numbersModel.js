"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const calculationSchema = new mongoose_1.Schema({
    number1: { type: Number, required: true },
    number2: { type: Number, required: true },
    status: { type: String, required: true },
    result: { type: Number }
}, { timestamps: true });
const CalculationModel = (0, mongoose_1.model)('Calculation', calculationSchema);
exports.default = CalculationModel;
