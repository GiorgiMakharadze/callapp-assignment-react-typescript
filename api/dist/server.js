"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const dataPath = "./callapp-data.json";
const dataRead = fs_1.default.readFile(dataPath, (err, data) => {
    if (err) {
        console.log(`Error reading file: ${dataPath}`, err);
        process.exit(1);
    }
    const dataObject = JSON.parse(data.toString());
    console.log(`Data loaded from ${dataPath}:`, dataObject);
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});
