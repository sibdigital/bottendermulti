"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LineBot_1 = __importDefault(require("./line/LineBot"));
const MessengerBot_1 = __importDefault(require("./messenger/MessengerBot"));
const SlackBot_1 = __importDefault(require("./slack/SlackBot"));
const TelegramBot_1 = __importDefault(require("./telegram/TelegramBot"));
const ViberBot_1 = __importDefault(require("./viber/ViberBot"));
const WhatsappBot_1 = __importDefault(require("./whatsapp/WhatsappBot"));
const getBottenderConfig_1 = __importDefault(require("./shared/getBottenderConfig"));
const getSessionStore_1 = __importDefault(require("./getSessionStore"));
const BOT_MAP = {
    messenger: MessengerBot_1.default,
    line: LineBot_1.default,
    slack: SlackBot_1.default,
    telegram: TelegramBot_1.default,
    viber: ViberBot_1.default,
    whatsapp: WhatsappBot_1.default,
};
function getClient(channel) {
    const { channels = {} } = getBottenderConfig_1.default();
    const sessionStore = getSessionStore_1.default();
    const channelConfig = channels[channel];
    if (!channelConfig) {
        throw new Error(`getClient: ${channel} config is missing in \`bottender.config.js\`.`);
    }
    const ChannelBot = BOT_MAP[channel.split('_')[0]];
    const channelBot = new ChannelBot(Object.assign(Object.assign({}, channelConfig), { sessionStore }));
    return channelBot.connector.client;
}
exports.default = getClient;
//# sourceMappingURL=getClient.js.map