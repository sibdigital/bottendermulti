"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = __importDefault(require("../bot/Bot"));
const WhatsappConnector_1 = __importDefault(require("./WhatsappConnector"));
class WhatsappBot extends Bot_1.default {
    constructor({ accountSid, authToken, phoneNumber, sessionStore, sync, origin, }) {
        const connector = new WhatsappConnector_1.default({
            accountSid,
            authToken,
            phoneNumber,
            origin,
        });
        super({ connector, sessionStore, sync });
    }
}
exports.default = WhatsappBot;
//# sourceMappingURL=WhatsappBot.js.map