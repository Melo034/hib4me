"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const repo = __importStar(require("../repositories/user_repository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Create a new user
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = data;
        // Check if the user already exists by email
        const existingUser = yield repo.getUserByEmail(email); // Use the correct repository function
        if (existingUser) {
            throw new Error('User already exists with this email.');
        }
        // Hash the password before saving the user
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield repo.createUser(Object.assign(Object.assign({}, data), { password: hashedPassword }));
        return user;
    });
}
// Get all users
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield repo.getAllUsers();
    });
}
// Get user by ID
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield repo.getUserById(id);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    });
}
// Update user details
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        // If updating the password, hash it before saving
        if (data.password) {
            data.password = yield bcryptjs_1.default.hash(data.password, 10);
        }
        const user = yield repo.updateUser(id, data);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    });
}
// Delete a user
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield repo.deleteUser(id);
        if (!user) {
            throw new Error('User not found.');
        }
    });
}
