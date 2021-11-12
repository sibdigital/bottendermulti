"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = __importDefault(require("../bot/Bot"));
const LineConnector_1 = __importDefault(require("./LineConnector"));
class LineBot extends Bot_1.default {
    constructor({ accessToken, channelSecret, sessionStore, origin, sync, mapDestinationToAccessToken, shouldBatch, sendMethod, skipLegacyProfile, }) {
        const connector = new LineConnector_1.default({
            accessToken,
            channelSecret,
            mapDestinationToAccessToken,
            shouldBatch,
            sendMethod,
            origin,
            skipLegacyProfile,
        });
        super({ connector, sessionStore, sync });
    }
}
exports.default = LineBot;
//# sourceMappingURL=LineBot.js.map