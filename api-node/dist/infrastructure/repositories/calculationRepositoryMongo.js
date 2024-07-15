"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculationRepositoryMongo = void 0;
const calculationModel_1 = __importDefault(require("./models/calculationModel"));
class CalculationRepositoryMongo {
    async save(calculation) {
        const createdCalculation = new calculationModel_1.default(calculation);
        await createdCalculation.save();
        return createdCalculation.toObject();
    }
}
exports.CalculationRepositoryMongo = CalculationRepositoryMongo;
