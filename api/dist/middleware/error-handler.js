"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultError = {
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: "Something went wrong",
    };
    if (err instanceof errors_1.EmptyValueError) {
        defaultError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        defaultError.msg = err.message;
    }
    if (err instanceof errors_1.NotFoundError) {
        defaultError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
        defaultError.msg = err.message;
    }
    if (err instanceof TypeError) {
        defaultError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        defaultError.msg = err.message;
    }
    res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};
exports.default = errorHandlerMiddleware;
