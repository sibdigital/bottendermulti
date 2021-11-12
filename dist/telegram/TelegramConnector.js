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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invariant_1 = __importDefault(require("invariant"));
const messaging_api_telegram_1 = require("messaging-api-telegram");
const TelegramContext_1 = __importDefault(require("./TelegramContext"));
const TelegramEvent_1 = __importDefault(require("./TelegramEvent"));
class TelegramConnector {
    constructor(options) {
        const { skipLegacyProfile } = options;
        if ('client' in options) {
            this._client = options.client;
        }
        else {
            const { accessToken, origin } = options;
            invariant_1.default(options.accessToken, 'Telegram access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.');
            this._client = messaging_api_telegram_1.TelegramClient.connect({
                accessToken,
                origin,
            });
        }
        this._skipLegacyProfile =
            typeof skipLegacyProfile === 'boolean' ? skipLegacyProfile : true;
    }
    _getRawEventFromRequest(body) {
        return body;
    }
    get platform() {
        return 'telegram';
    }
    get client() {
        return this._client;
    }
    getUniqueSessionKey(body) {
        if (body.message) {
            return `${body.message.chat.id}`;
        }
        if (body.editedMessage) {
            return `${body.editedMessage.chat.id}`;
        }
        if (body.channelPost) {
            return `${body.channelPost.chat.id}`;
        }
        if (body.editedChannelPost) {
            return `${body.editedChannelPost.chat.id}`;
        }
        if (body.inlineQuery) {
            return `${body.inlineQuery.from.id}`;
        }
        if (body.chosenInlineResult) {
            return `${body.chosenInlineResult.from.id}`;
        }
        if (body.callbackQuery) {
            if (body.callbackQuery.message) {
                return `${body.callbackQuery.message.chat.id}`;
            }
            return `${body.callbackQuery.from.id}`;
        }
        if (body.shippingQuery) {
            return `${body.shippingQuery.from.id}`;
        }
        if (body.preCheckoutQuery) {
            return `${body.preCheckoutQuery.from.id}`;
        }
        return '';
    }
    updateSession(session, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let channel;
            if (body.channelPost) {
                channel = body.channelPost.chat;
            }
            else if (body.editedChannelPost) {
                channel = body.editedChannelPost.chat;
            }
            if (channel) {
                if (this._skipLegacyProfile) {
                    session.channel = {
                        id: channel.id,
                    };
                }
                else {
                    session.channel = channel;
                }
                session.channel._updatedAt = new Date().toISOString();
                Object.freeze(session.channel);
            }
            Object.defineProperty(session, 'channel', {
                configurable: false,
                enumerable: true,
                writable: false,
                value: session.channel,
            });
            let group;
            if (body.message && body.message.chat.type === 'group') {
                group = body.message.chat;
            }
            else if (body.editedMessage && body.editedMessage.chat.type === 'group') {
                group = body.editedMessage.chat;
            }
            else if (body.callbackQuery &&
                body.callbackQuery.message &&
                body.callbackQuery.message.chat.type === 'group') {
                group = body.callbackQuery.message.chat;
            }
            if (group) {
                if (this._skipLegacyProfile) {
                    session.group = {
                        id: group.id,
                    };
                }
                else {
                    session.group = group;
                }
                session.group._updatedAt = new Date().toISOString();
                Object.freeze(session.group);
            }
            Object.defineProperty(session, 'group', {
                configurable: false,
                enumerable: true,
                writable: false,
                value: session.group,
            });
            let user;
            if (body.message) {
                user = body.message.from;
            }
            else if (body.editedMessage) {
                user = body.editedMessage.from;
            }
            else if (body.inlineQuery) {
                user = body.inlineQuery.from;
            }
            else if (body.chosenInlineResult) {
                user = body.chosenInlineResult.from;
            }
            else if (body.callbackQuery) {
                user = body.callbackQuery.from;
            }
            else if (body.shippingQuery) {
                user = body.shippingQuery.from;
            }
            else if (body.preCheckoutQuery) {
                user = body.preCheckoutQuery.from;
            }
            if (user) {
                if (this._skipLegacyProfile) {
                    session.user = {
                        id: user.id,
                    };
                }
                else {
                    session.user = user;
                }
                session.user._updatedAt = new Date().toISOString();
                Object.freeze(session.user);
            }
            Object.defineProperty(session, 'user', {
                configurable: false,
                enumerable: true,
                writable: false,
                value: session.user,
            });
        });
    }
    mapRequestToEvents(body) {
        const rawEvent = this._getRawEventFromRequest(body);
        return [new TelegramEvent_1.default(rawEvent)];
    }
    createContext(params) {
        return new TelegramContext_1.default(Object.assign(Object.assign({}, params), { client: this._client }));
    }
    preprocess() {
        return {
            shouldNext: true,
        };
    }
}
exports.default = TelegramConnector;
//# sourceMappingURL=TelegramConnector.js.map