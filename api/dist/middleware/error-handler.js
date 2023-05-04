"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    let statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let msg = "Something went wrong";
    if (err instanceof errors_1.EmptyValueError) {
        statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        msg = err.message;
    }
    else if (err instanceof errors_1.NotFoundError) {
        statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
        msg = err.message;
    }
    else if (err instanceof TypeError) {
        statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        msg = err.message;
    }
    else if (err.message) {
        msg = err.message;
    }
    res.status(statusCode).json({ msg });
};
exports.default = errorHandlerMiddleware;
