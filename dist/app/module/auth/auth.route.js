"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validationMiddleware_1 = __importDefault(require("../../Middleware/validationMiddleware"));
const user_validation_1 = require("../user/user.validation");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post('/signup', (0, validationMiddleware_1.default)(user_validation_1.userZodValidationSchema), auth_controller_1.AuthController.createUser);
router.post('/login', (0, validationMiddleware_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser);
exports.AuthRouter = router;
