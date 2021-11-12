"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = __importDefault(require("../bot/Bot"));
const MessengerConnector_1 = __importDefault(require("./MessengerConnector"));
class MessengerBot extends Bot_1.default {
    constructor({ accessToken, appId, appSecret, sessionStore, sync, mapPageToAccessToken, verifyToken, batchConfig, origin, skipAppSecretProof, skipLegacyProfile, }) {
        const connector = new MessengerConnector_1.default({
            accessToken,
            appId,
            appSecret,
            mapPageToAccessToken,
            verifyToken,
            batchConfig,
            origin,
            skipAppSecretProof,
            skipLegacyProfile,
        });
        super({ connector, sessionStore, sync });
    }
}
exports.default = MessengerBot;
//# sourceMappingURL=MessengerBot.js.map