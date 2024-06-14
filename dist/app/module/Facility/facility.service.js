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
exports.FacilityService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const facility_model_1 = require("./facility.model");
const getAllFacilityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.find({ isDeleted: false });
    return result;
});
const createFacilityIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.create(data);
    return result;
});
const updateFacilityIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield facility_model_1.Facility.isFacitityExist(id))) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Facility not found! update failed.');
    }
    if (data === null || data === void 0 ? void 0 : data.name) {
        const isNameSame = yield facility_model_1.Facility.findOne({ name: data.name });
        if (isNameSame) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Same Facility Name Already Exist');
        }
    }
    const result = yield facility_model_1.Facility.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deleteFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield facility_model_1.Facility.isFacitityExist(id))) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Facility not found! delete failed.');
    }
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.FacilityService = {
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB,
    getAllFacilityFromDB,
};
