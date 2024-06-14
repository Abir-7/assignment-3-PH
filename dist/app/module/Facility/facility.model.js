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
exports.Facility = exports.facilitySchema = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
exports.facilitySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Facility name is required'],
        unique: true,
    },
    description: { type: String, required: [true, 'Description is required'] },
    pricePerHour: {
        type: Number,
        required: [true, 'Price per hour is required'],
    },
    location: { type: String, required: [true, 'Location is required'] },
    isDeleted: { type: Boolean, default: false },
});
exports.facilitySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isFaciExist = yield exports.Facility.findOne({ name: this.name });
        if (isFaciExist) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, 'Facility already exist');
        }
        next();
    });
});
exports.facilitySchema.statics.isFacitityExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isFaciExist = yield exports.Facility.findById(id);
    if (isFaciExist) {
        return true;
    }
    else {
        false;
    }
});
exports.Facility = (0, mongoose_1.model)('Facility', exports.facilitySchema);
