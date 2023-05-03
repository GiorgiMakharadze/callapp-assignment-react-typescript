"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmptyValueError extends Error {
    constructor(message) {
        super(message);
        this.name = "EmptyValueError";
    }
}
exports.default = EmptyValueError;
