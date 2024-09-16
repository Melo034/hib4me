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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = signIn;
exports.signUp = signUp;
const authService = __importStar(require("../services/auth_service"));
// Sign In
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const token = yield authService.signIn({ username, password });
            return res.status(200).json({ token });
        }
        catch (error) {
            if (error.message === 'User not found' || error.message === 'Invalid username or password') {
                return res.status(401).json({ message: error.message }); // 401 for authentication errors
            }
            return res.status(500).json({ message: 'Internal Server Error' }); // 500 for server errors
        }
    });
}
// Sign Up
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, name, email } = req.body;
        try {
            const user = yield authService.signUp({ username, password, name, email });
            return res.status(201).json({ message: 'User created successfully', user });
        }
        catch (error) {
            if (error.message === 'Username already taken') {
                return res.status(409).json({ message: error.message }); // 409 for conflicts
            }
            return res.status(500).json({ message: 'Internal Server Error' }); // 500 for server errors
        }
    });
}
