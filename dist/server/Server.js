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
const url_1 = __importDefault(require("url"));
const fromentries_1 = __importDefault(require("fromentries"));
const merge_1 = __importDefault(require("lodash/merge"));
const messaging_api_common_1 = require("messaging-api-common");
const getBottenderConfig_1 = __importDefault(require("../shared/getBottenderConfig"));
const getSessionStore_1 = __importDefault(require("../getSessionStore"));
class Server {
    constructor({ useConsole = false } = {}) {
        this._channelBots = [];
        this.useConsole = useConsole;
    }
    handleRequest(req, res) {
        res.statusCode = 200;
        return this.run(req, res).catch(err => {
            console.error(err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });
    }
    prepare(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const bottenderConfig = getBottenderConfig_1.default(config);
            const { initialState, plugins, channels } = merge_1.default(bottenderConfig);
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
            if (this.useConsole) {
                const ConsoleBot = require('../console/ConsoleBot').default;
                const bot = new ConsoleBot({
                    fallbackMethods: true,
                    sessionStore,
                });
                initializeBot(bot);
                bot.createRuntime();
                return;
            }
            const channelBots = Object.entries(channels || {})
                .filter(([, { enabled }]) => enabled)
                .map((_a) => {
                var [channel, _b] = _a, { path: webhookPath } = _b, channelConfig = __rest(_b, ["path"]);
                const ChannelBot = require(`../${channel.split('_')[0]}/${messaging_api_common_1.pascalcase(channel.split('_')[0])}Bot`).default;
                const channelBot = new ChannelBot(Object.assign(Object.assign({}, channelConfig), { sessionStore }));
                initializeBot(channelBot);
                return {
                    webhookPath: webhookPath || `/webhooks/${channel}`,
                    bot: channelBot,
                };
            });
            this._channelBots = channelBots;
        });
    }
    getRequestHandler() {
        return this.handleRequest.bind(this);
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.useConsole) {
                return;
            }
            const hostname = req.hostname || req.headers.host;
            const protocol = req.protocol || 'https';
            const requestUrl = `${protocol}://${hostname}${req.url}`;
            const { pathname, searchParams } = new url_1.default.URL(requestUrl);
            const query = fromentries_1.default(searchParams.entries());
            for (let i = 0; i < this._channelBots.length; i++) {
                const { webhookPath, bot } = this._channelBots[i];
                if (pathname === webhookPath) {
                    const result = bot.connector.preprocess({
                        method: req.method,
                        url: requestUrl,
                        headers: req.headers,
                        query,
                        rawBody: req.rawBody,
                        body: req.body,
                    });
                    const { shouldNext } = result;
                    let { response } = result;
                    if (!shouldNext) {
                        if (response) {
                            Object.entries(response.headers || {}).forEach(([key, value]) => {
                                res.setHeader(key, value);
                            });
                            res.statusCode = response.status || 200;
                            if (response.body &&
                                typeof response.body === 'object' &&
                                !Buffer.isBuffer(response.body)) {
                                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                                res.end(JSON.stringify(response.body));
                            }
                            else {
                                res.end(response.body || '');
                            }
                        }
                        else {
                            res.statusCode = 200;
                            res.end('');
                        }
                        return;
                    }
                    const requestHandler = bot.createRequestHandler();
                    response = yield requestHandler(Object.assign(Object.assign({}, query), req.body), {
                        method: req.method,
                        path: pathname,
                        query,
                        headers: req.headers,
                    });
                    if (response) {
                        Object.entries(response.headers || {}).forEach(([key, value]) => {
                            res.setHeader(key, value);
                        });
                        res.statusCode = response.status || 200;
                        if (response.body && typeof response.body === 'object') {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify(response.body));
                        }
                        else {
                            res.end(response.body || '');
                        }
                    }
                    else {
                        res.statusCode = 200;
                        res.end('');
                    }
                    return;
                }
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map