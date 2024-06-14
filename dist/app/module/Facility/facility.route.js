"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRouter = void 0;
const express_1 = require("express");
const facility_controller_1 = require("./facility.controller");
const auth_1 = require("../../Middleware/auth");
const validationMiddleware_1 = __importDefault(require("../../Middleware/validationMiddleware"));
const facility_validation_1 = require("./facility.validation");
const router = (0, express_1.Router)();
router.get('/', facility_controller_1.FacilityController.getAllFacility);
router.post('/', (0, auth_1.auth)('admin'), (0, validationMiddleware_1.default)(facility_validation_1.facilityZodValidationSchema), facility_controller_1.FacilityController.createFacility);
router.put('/:id', (0, auth_1.auth)('admin'), (0, validationMiddleware_1.default)(facility_validation_1.updateFacilityZodValidationSchema), facility_controller_1.FacilityController.updateFacility);
router.delete('/:id', (0, auth_1.auth)('admin'), facility_controller_1.FacilityController.deleteFacility);
exports.FacilityRouter = router;
