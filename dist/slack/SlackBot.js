"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rtm_api_1 = require("@slack/rtm-api");
const Bot_1 = __importDefault(require("../bot/Bot"));
const SlackConnector_1 = __importDefault(require("./SlackConnector"));
class SlackBot extends Bot_1.default {
    constructor({ accessToken, sessionStore, sync, verificationToken, signingSecret, origin, skipLegacyProfile, includeBotMessages, }) {
        const connector = new SlackConnector_1.default({
            accessToken,
            verificationToken,
            signingSecret,
            origin,
            skipLegacyProfile,
            includeBotMessages,
        });
        super({ connector, sessionStore, sync });
        this._accessToken = accessToken;
    }
    createRtmRuntime() {
        const rtm = new rtm_api_1.RTMClient(this._accessToken);
        const handler = this.createRequestHandler();
        rtm.on('message', handler);
        rtm.start();
    }
}
exports.default = SlackBot;
//# sourceMappingURL=SlackBot.js.map