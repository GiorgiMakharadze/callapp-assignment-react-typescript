"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const middleware_1 = require("./middleware/");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const __dirnames = path_1.default.resolve();
//middleware & security
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, xss_clean_1.default)());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "worker-src 'self' blob:");
    next();
});
app.use(express_1.default.static(path_1.default.resolve("../build")));
//routes
app.use("/api/v1/data", dataRoutes_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirnames, "../build", "index.html"));
});
// error handling
app.use(middleware_1.notFoundMiddleware);
app.use(middleware_1.errorHandlerMiddleware);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});
