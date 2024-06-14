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
exports.FacilityController = void 0;
const facility_service_1 = require("./facility.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const getAllFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.FacilityService.getAllFacilityFromDB();
    return (0, sendResponse_1.default)(res, {
        success: result.length ? true : false,
        statusCode: result.length ? 200 : 404,
        message: result.length
            ? 'Facilities retrieved successfully'
            : 'No Data Found',
        data: result,
    });
}));
const createFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield facility_service_1.FacilityService.createFacilityIntoDB(data);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Facility added successfully',
        data: result,
    });
}));
const updateFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield facility_service_1.FacilityService.updateFacilityIntoDB(id, updatedData);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Facility updated successfully',
        data: result,
    });
}));
const deleteFacility = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield facility_service_1.FacilityService.deleteFacilityFromDB(id);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Facility deleted successfully',
        data: result,
    });
}));
exports.FacilityController = {
    createFacility,
    updateFacility,
    deleteFacility,
    getAllFacility,
};
