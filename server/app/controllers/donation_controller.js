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
exports.createDonation = void 0;
exports.getAllDonations = getAllDonations;
exports.getDonationById = getDonationById;
exports.updateDonation = updateDonation;
exports.deleteDonation = deleteDonation;
const service = __importStar(require("../services/donation_service"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configure Multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (req.file) {
        body.image = `/uploads/${req.file.filename}`;
    }
    try {
        const donation = yield service.createDonation(body);
        return res.status(201).json(donation);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createDonation = createDonation;
function getAllDonations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const donation = yield service.getAllDonations();
            return res.status(200).json(donation);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
}
function getDonationById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const donation = yield service.getDonationById(req.params.id);
            return res.status(200).json(donation);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
}
function updateDonation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const donation = yield service.updateDonation(req.params.id, req.body);
        return res.status(200).json(donation);
    });
}
function deleteDonation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield service.deleteDonation(req.params.id);
        return res.status(204).end();
    });
}
