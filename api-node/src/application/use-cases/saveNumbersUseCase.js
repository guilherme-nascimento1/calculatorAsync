"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculationModel_1 = __importDefault(require("../../infrastructure/repositories/models/calculationModel"));
const rabbitmq_1 = require("../../infrastructure/messageBroker/rabbitmq");
class SaveNumbersUseCase {
    execute(number1, number2) {
        return __awaiter(this, void 0, void 0, function* () {
            const calculation = new calculationModel_1.default({
                number1,
                number2,
                status: 'processing',
            });
            yield calculation.save();
            const message = JSON.stringify({ id: calculation._id, number1, number2 });
            yield (0, rabbitmq_1.publishToQueue)('calculations', message);
            return calculation;
        });
    }
}
exports.default = SaveNumbersUseCase;
