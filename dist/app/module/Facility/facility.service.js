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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityService = void 0;
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
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
