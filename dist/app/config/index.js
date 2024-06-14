"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    databaseUri: process.env.MONGODB_URI,
    node_env: process.env.NODE_ENV,
    bcrypt_sault_round: process.env.BCRYPT_SAULT_ROUND,
    jwt_secrete_key: process.env.JWT_SECRETE_KEY,
    jwt_secrete_date: process.env.JWT_SECRETE_DATE,
};
