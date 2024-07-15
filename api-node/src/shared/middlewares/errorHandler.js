"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = require("../errors/appError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
};
exports.errorHandler = errorHandler;
