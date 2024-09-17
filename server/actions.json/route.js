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
exports.OPTIONS = exports.GET = void 0;
const actions_1 = require("@solana/actions");
const GET = () => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        rules: [
            // map all root level routes to an action
            {
                pathPattern: "/**",
                apiPath: "/**",
            },
            // idempotent rule as the fallback
            /*
            Idempotent rules allow blink clients to more easily determine if a given path supports
            Action API requests without having to be prefixed with the solana-action:
            URI or performing additional response testing.
            */
            {
                pathPattern: "/**",
                apiPath: "/**",
            },
        ],
    };
    return Response.json(payload, {
        headers: actions_1.ACTIONS_CORS_HEADERS,
    });
});
exports.GET = GET;
// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
exports.OPTIONS = exports.GET;
