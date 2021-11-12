"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const merge_1 = __importDefault(require("lodash/merge"));
const express_1 = require("@bottender/express");
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
function initializeServer({ isConsole, config, } = {}) {
    const bottenderConfig = getBottenderConfig_1.default();
    const { initialState, plugins, channels } = merge_1.default(bottenderConfig, config);
    const sessionStore = getSessionStore_1.default();
    const Entry = require(path_1.default.resolve('index.js'));
    let ErrorEntry;
    try {
        ErrorEntry = require(path_1.default.resolve('_error.js'));
    }
    catch (err) { }
    function initializeBot(bot) {
        if (initialState) {
            bot.setInitialState(initialState);
        }
        if (plugins) {
            plugins.forEach((plugin) => {
                bot.use(plugin);
            });
        }
        bot.onEvent(Entry);
        if (ErrorEntry) {
            bot.onError(ErrorEntry);
        }
    }
    if (isConsole) {
        const ConsoleBot = require('./console/ConsoleBot').default;
        const bot = new ConsoleBot({
            fallbackMethods: true,
            sessionStore,
        });
        initializeBot(bot);
        bot.createRuntime();
    }
    else {
        let server;
        Object.entries(channels || {})
            .filter(([, { enabled }]) => enabled)
            .map((_a) => {
            var [channel, _b] = _a, { path: webhookPath } = _b, channelConfig = __rest(_b, ["path"]);
            const ChannelBot = BOT_MAP[channel.split('_')[0]];
            const channelBot = new ChannelBot(Object.assign(Object.assign({}, channelConfig), { sessionStore }));
            initializeBot(channelBot);
            return { channel, webhookPath, bot: channelBot };
        })
            .forEach(({ channel, webhookPath, bot }) => {
            const routePath = webhookPath || `/webhooks/${channel}`;
            if (server) {
                express_1.registerRoutes(server, bot, { path: routePath });
            }
            else {
                server = express_1.createServer(bot, {
                    path: routePath,
                });
            }
        });
        return server;
    }
}
exports.default = initializeServer;
//# sourceMappingURL=initializeServer.js.map