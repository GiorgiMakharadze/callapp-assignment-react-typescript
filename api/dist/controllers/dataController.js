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
const not_found_1 = __importDefault(require("../errors/not-found"));
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
        throw new not_found_1.default("Data doesn't exist");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "all data", dataObject });
});
exports.getAllData = getAllData;
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("update data");
});
exports.updateData = updateData;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("delete data");
});
exports.deleteData = deleteData;
