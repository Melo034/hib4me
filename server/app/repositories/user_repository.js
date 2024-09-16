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
exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const user_model_1 = __importDefault(require("../models/user_model"));
// Create a new user
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_model_1.default(data);
        yield user.save();
        return user;
    });
}
// Get all users
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.find({});
    });
}
// Get user by ID
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.findById(id);
    });
}
// Get user by Email
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.findOne({ email });
    });
}
// Update user details
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.findByIdAndUpdate(id, data, { new: true });
    });
}
// Delete a user
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.findByIdAndDelete(id);
    });
}
