"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const donationSchema = new mongoose_1.default.Schema({
    condition: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    goal: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
});
const Donation = mongoose_1.default.model("Donation", donationSchema);
exports.default = Donation;
