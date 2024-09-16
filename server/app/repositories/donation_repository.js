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
exports.createDonation = createDonation;
exports.getAllDonations = getAllDonations;
exports.getDonationById = getDonationById;
exports.updateDonation = updateDonation;
exports.deleteDonation = deleteDonation;
const donation_model_1 = __importDefault(require("../models/donation_model"));
function createDonation(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const donation = new donation_model_1.default(data);
        yield donation.save();
    });
}
function getAllDonations() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield donation_model_1.default.find({});
    });
}
function getDonationById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const donation = yield donation_model_1.default.findById(id);
        return donation;
    });
}
function updateDonation(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const donation = yield donation_model_1.default.findByIdAndUpdate(id, data);
        return donation;
    });
}
function deleteDonation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield donation_model_1.default.findByIdAndDelete(id);
    });
}
