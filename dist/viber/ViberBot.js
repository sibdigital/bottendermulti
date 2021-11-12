"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = __importDefault(require("../bot/Bot"));
const ViberConnector_1 = __importDefault(require("./ViberConnector"));
class ViberBot extends Bot_1.default {
    constructor({ accessToken, sender, sessionStore, sync, origin, }) {
        const connector = new ViberConnector_1.default({ accessToken, sender, origin });
        super({ connector, sessionStore, sync });
    }
}
exports.default = ViberBot;
//# sourceMappingURL=ViberBot.js.map