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
exports.signIn = signIn;
exports.signUp = signUp;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user_model")); // Ensure the correct import path and model name
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variables for sensitive data
// Sign In
function signIn(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, password }) {
        const user = yield user_model_1.default.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    });
}
// Sign Up
function signUp(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, password, name, email }) {
        const existingUser = yield user_model_1.default.findOne({ username });
        if (existingUser) {
            throw new Error('Username already taken');
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new user_model_1.default({ username, password: hashedPassword, name, email });
        yield user.save();
        return user; // Return user object without explicit type
    });
}
