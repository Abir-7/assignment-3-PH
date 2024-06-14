"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./app/router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/Middleware/globalErrorHandler"));
const notfound_1 = __importDefault(require("./app/Middleware/notfound"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', router_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(globalErrorHandler_1.default);
app.use(notfound_1.default);
exports.default = app;
