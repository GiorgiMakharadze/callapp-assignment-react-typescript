"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const middleware_1 = require("./middleware/");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
//middleware
app.use(express_1.default.json());
//routes
app.use("/api/v1/data", dataRoutes_1.default);
// error handling
app.use(middleware_1.notFoundMiddleware);
app.use(middleware_1.errorHandlerMiddleware);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});
