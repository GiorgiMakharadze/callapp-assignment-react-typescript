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
exports.deleteData = exports.updateData = exports.getAllData = void 0;
const fs_1 = __importDefault(require("fs"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const dataPath = "./callapp-data.json";
let dataObject;
fs_1.default.readFile(dataPath, (err, data) => {
    if (err) {
        console.log(`Error reading file: ${dataPath}`, err);
        return;
    }
    dataObject = JSON.parse(data.toString());
    console.log(`Data loaded from ${dataPath}:`);
});
const getAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!dataObject || dataObject.length <= 0) {
        throw new errors_1.NotFoundError("Data doesn't exist");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "all data", dataObject });
});
exports.getAllData = getAllData;
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const updatedFields = req.body;
    const index = dataObject.findIndex((item) => item.id === id);
    if (index === -1) {
        throw new errors_1.NotFoundError(`Data with ID ${id} not found`);
    }
    for (const key in updatedFields) {
        if (key === "address" && !(updatedFields[key] instanceof Object)) {
            throw new TypeError("Address field should be an object with 'street' and 'city' properties");
        }
        if (!(key in dataObject[index])) {
            throw new errors_1.NotFoundError(`Field '${key}' does not exist in the object`);
        }
        if (updatedFields[key] === "") {
            throw new errors_1.EmptyValueError(`Value for '${key}' cannot be empty`);
        }
    }
    const updatedObject = Object.assign(Object.assign({}, dataObject[index]), updatedFields);
    if (updatedFields.address) {
        updatedObject.address = Object.assign(Object.assign({}, dataObject[index].address), updatedFields.address);
    }
    dataObject[index] = updatedObject;
    yield fs_1.default.promises.writeFile(dataPath, JSON.stringify(dataObject, null, 2));
    res.status(http_status_codes_1.StatusCodes.OK).json(dataObject[index]);
});
exports.updateData = updateData;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const index = dataObject.findIndex((item) => item.id === id);
    if (index === -1) {
        throw new errors_1.NotFoundError(`Data with ID ${id} not found`);
    }
    dataObject.splice(index, 1);
    yield fs_1.default.promises.writeFile(dataPath, JSON.stringify(dataObject, null, 2));
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: `Data with ID ${id} deleted successfully` });
});
exports.deleteData = deleteData;
