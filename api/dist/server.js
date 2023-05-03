"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const dataPath = "./callapp-data.json";
fs.readFile(dataPath, (err, data) => {
    if (err) {
        console.log(`Error reading file: ${dataPath}`, err);
        process.exit(1);
    }
    const dataObject = JSON.parse(data.toString());
    console.log(`Data loaded from ${dataPath}:`);
    app.get("/api/v1/data", (req, res) => {
        res.json(dataObject);
    });
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});
