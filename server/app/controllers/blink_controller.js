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
exports.getBlink = getBlink;
exports.donate = donate;
const service = __importStar(require("../services/donation_service"));
const actions_1 = require("@solana/actions");
const web3_js_1 = require("@solana/web3.js");
function getBlink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        try {
            const donation = yield service.getDonationById(id);
            const imagePath = `https://hib4me-server.onrender.com/public/uploads/${donation.image}`;
            const payload = {
                icon: `${baseUrl}${imagePath}`,
                label: "Donation",
                title: donation.condition,
                description: donation.description,
                type: "action",
                links: {
                    actions: [
                        {
                            label: "Send 1 SOL 🙂",
                            href: `${baseUrl}/api/blink/${id}?amount=1`,
                        },
                        {
                            label: "Send 2 SOL 😎",
                            href: `${baseUrl}/api/blink/${id}?amount=2`,
                        },
                        {
                            label: "Donate",
                            href: `${baseUrl}/api/blink/${id}?amount={amount}`,
                            parameters: [
                                {
                                    name: "amount",
                                    label: "Enter the amount of SOL to donate",
                                },
                            ],
                        },
                    ],
                },
            };
            res.set(actions_1.ACTIONS_CORS_HEADERS);
            res.status(200).json(payload);
        }
        catch (error) {
            console.log(error);
            res.set(actions_1.ACTIONS_CORS_HEADERS);
            return res.json("An unknown error occurred");
        }
    });
}
function donate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const amountStr = req.query.amount;
        const amount = amountStr ? parseFloat(amountStr) : 0;
        try {
            console.log("req.body: ", req.body);
            const donation = yield service.getDonationById(id);
            if (!donation || !donation.address) {
                return res.status(404).json("Donation address not found");
            }
            const body = req.body;
            let account;
            account = new web3_js_1.PublicKey(body.account);
            const conn = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"), "confirmed");
            const minimumBalance = yield conn.getMinimumBalanceForRentExemption(0);
            if (amount * web3_js_1.LAMPORTS_PER_SOL < minimumBalance) {
                throw `account may not be rent exmpted`;
            }
            const transaction = new web3_js_1.Transaction();
            transaction.add(web3_js_1.SystemProgram.transfer({
                fromPubkey: account,
                toPubkey: new web3_js_1.PublicKey(donation.address),
                lamports: amount * web3_js_1.LAMPORTS_PER_SOL,
            }));
            transaction.feePayer = account;
            transaction.recentBlockhash = (yield conn.getLatestBlockhash()).blockhash;
            const payload = yield (0, actions_1.createPostResponse)({
                fields: {
                    transaction,
                    message: `Sent ${amount} SOL to ${donation.address}`,
                },
            });
            res.set(actions_1.ACTIONS_CORS_HEADERS);
            res.status(201).json(payload);
        }
        catch (error) {
            console.log(error);
            res.set(actions_1.ACTIONS_CORS_HEADERS);
            return res.json("An unknown error occurred");
        }
    });
}
