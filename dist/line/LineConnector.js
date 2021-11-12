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
const crypto_1 = __importDefault(require("crypto"));
const invariant_1 = __importDefault(require("invariant"));
const warning_1 = __importDefault(require("warning"));
const messaging_api_line_1 = require("messaging-api-line");
const LineContext_1 = __importDefault(require("./LineContext"));
const LineEvent_1 = __importDefault(require("./LineEvent"));
class LineConnector {
    constructor(options) {
        const { mapDestinationToAccessToken, shouldBatch, sendMethod, skipLegacyProfile, } = options;
        if ('client' in options) {
            this._client = options.client;
            this._channelSecret = '';
        }
        else {
            const { accessToken, channelSecret, origin } = options;
            invariant_1.default(options.accessToken, 'LINE access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.');
            invariant_1.default(options.channelSecret, 'LINE channel secret is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.');
            this._client = messaging_api_line_1.LineClient.connect({
                accessToken,
                channelSecret,
                origin,
            });
            this._channelSecret = channelSecret;
        }
        this._mapDestinationToAccessToken = mapDestinationToAccessToken || null;
        this._shouldBatch = typeof shouldBatch === 'boolean' ? shouldBatch : true;
        warning_1.default(!sendMethod || sendMethod === 'reply' || sendMethod === 'push', 'sendMethod should be one of `reply` or `push`');
        this._sendMethod = sendMethod || 'reply';
        this._skipLegacyProfile =
            typeof skipLegacyProfile === 'boolean' ? skipLegacyProfile : true;
    }
    _isWebhookVerifyEvent(event) {
        return (event.replyToken === '00000000000000000000000000000000' ||
            event.replyToken === 'ffffffffffffffffffffffffffffffff');
    }
    isWebhookVerifyRequest(body) {
        return (body &&
            Array.isArray(body.events) &&
            body.events.length > 0 &&
            body.events.every(this._isWebhookVerifyEvent));
    }
    get platform() {
        return 'line';
    }
    get client() {
        return this._client;
    }
    getUniqueSessionKey(bodyOrEvent) {
        const rawEvent = bodyOrEvent instanceof LineEvent_1.default
            ? bodyOrEvent.rawEvent
            : bodyOrEvent.events[0];
        const { source } = rawEvent;
        if (source.type === 'user') {
            return source.userId;
        }
        if (source.type === 'group') {
            return source.groupId;
        }
        if (source.type === 'room') {
            return source.roomId;
        }
        throw new TypeError('LineConnector: sender type should be one of user, group, room.');
    }
    updateSession(session, bodyOrEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawEvent = bodyOrEvent instanceof LineEvent_1.default
                ? bodyOrEvent.rawEvent
                : bodyOrEvent.events[0];
            const { source } = rawEvent;
            if (!session.type) {
                session.type = source.type;
            }
            if (source.type === 'group') {
                let user = null;
                if (source.userId) {
                    user = this._skipLegacyProfile
                        ? {
                            id: source.userId,
                            _updatedAt: new Date().toISOString(),
                        }
                        : Object.assign({ id: source.userId, _updatedAt: new Date().toISOString() }, (yield this._client.getGroupMemberProfile(source.groupId, source.userId)));
                }
                session.user = user;
                let memberIds = [];
                try {
                    memberIds = yield this._client.getAllGroupMemberIds(source.groupId);
                }
                catch (e) {
                }
                session.group = {
                    id: source.groupId,
                    members: memberIds.map(id => ({ id })),
                    _updatedAt: new Date().toISOString(),
                };
            }
            else if (source.type === 'room') {
                let user = null;
                if (source.userId) {
                    user = this._skipLegacyProfile
                        ? {
                            id: source.userId,
                            _updatedAt: new Date().toISOString(),
                        }
                        : Object.assign({ id: source.userId, _updatedAt: new Date().toISOString() }, (yield this._client.getRoomMemberProfile(source.roomId, source.userId)));
                }
                session.user = user;
                let memberIds = [];
                try {
                    memberIds = yield this._client.getAllRoomMemberIds(source.roomId);
                }
                catch (e) {
                }
                session.room = {
                    id: source.roomId,
                    members: memberIds.map(id => ({ id })),
                    _updatedAt: new Date().toISOString(),
                };
            }
            else if (source.type === 'user') {
                if (!session.user) {
                    const user = this._skipLegacyProfile
                        ? {}
                        : yield this._client.getUserProfile(source.userId);
                    session.user = Object.assign({ id: source.userId, _updatedAt: new Date().toISOString() }, user);
                }
            }
            if (session.group) {
                Object.freeze(session.group);
            }
            Object.defineProperty(session, 'group', {
                configurable: false,
                enumerable: true,
                writable: false,
                value: session.group,
            });
            if (session.room) {
                Object.freeze(session.room);
            }
            Object.defineProperty(session, 'room', {
                configurable: false,
                enumerable: true,
                writable: false,
                value: session.room,
            });
            if (session.user) {
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
        const { destination } = body;
        return body.events
            .filter(event => !this._isWebhookVerifyEvent(event))
            .map(event => new LineEvent_1.default(event, { destination }));
    }
    createContext(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let customAccessToken;
            if (this._mapDestinationToAccessToken) {
                const { destination } = params.event;
                if (!destination) {
                    warning_1.default(false, 'Could not find destination from request body.');
                }
                else {
                    customAccessToken = yield this._mapDestinationToAccessToken(destination);
                }
            }
            return new LineContext_1.default(Object.assign(Object.assign({}, params), { client: this._client, customAccessToken, shouldBatch: this._shouldBatch, sendMethod: this._sendMethod }));
        });
    }
    verifySignature(rawBody, signature) {
        const hashBufferFromBody = crypto_1.default
            .createHmac('sha256', this._channelSecret)
            .update(rawBody, 'utf8')
            .digest();
        const bufferFromSignature = Buffer.from(signature, 'base64');
        if (bufferFromSignature.length !== hashBufferFromBody.length) {
            return false;
        }
        return crypto_1.default.timingSafeEqual(bufferFromSignature, hashBufferFromBody);
    }
    preprocess({ method, headers, rawBody, body, }) {
        if (method.toLowerCase() !== 'post') {
            return {
                shouldNext: true,
            };
        }
        if (!this.verifySignature(rawBody, headers['x-line-signature'])) {
            const error = {
                message: 'LINE Signature Validation Failed!',
                request: {
                    rawBody,
                    headers: {
                        'x-line-signature': headers['x-line-signature'],
                    },
                },
            };
            return {
                shouldNext: false,
                response: {
                    status: 400,
                    body: { error },
                },
            };
        }
        if (this.isWebhookVerifyRequest(body)) {
            return {
                shouldNext: false,
                response: {
                    status: 200,
                    body: 'OK',
                },
            };
        }
        return {
            shouldNext: true,
        };
    }
}
exports.default = LineConnector;
//# sourceMappingURL=LineConnector.js.map