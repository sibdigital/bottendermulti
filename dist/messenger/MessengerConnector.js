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
const url_1 = require("url");
const invariant_1 = __importDefault(require("invariant"));
const isAfter_1 = __importDefault(require("date-fns/isAfter"));
const isValid_1 = __importDefault(require("date-fns/isValid"));
const shortid_1 = __importDefault(require("shortid"));
const warning_1 = __importDefault(require("warning"));
const messenger_batch_1 = require("messenger-batch");
const messaging_api_messenger_1 = require("messaging-api-messenger");
const MessengerContext_1 = __importDefault(require("./MessengerContext"));
const MessengerEvent_1 = __importDefault(require("./MessengerEvent"));
class MessengerConnector {
    constructor(options) {
        this._mapPageToAccessToken = null;
        this._verifyToken = null;
        this._batchConfig = null;
        this._batchQueue = null;
        const { appId, appSecret, mapPageToAccessToken, verifyToken, batchConfig, skipLegacyProfile, } = options;
        if ('client' in options) {
            this._client = options.client;
        }
        else {
            const { accessToken, origin, skipAppSecretProof } = options;
            invariant_1.default(accessToken || mapPageToAccessToken, 'Messenger access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.');
            invariant_1.default(appSecret, 'Messenger app secret is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.');
            this._client = messaging_api_messenger_1.MessengerClient.connect({
                accessToken: accessToken || '',
                appSecret,
                origin,
                skipAppSecretProof,
            });
        }
        this._appId = appId;
        this._appSecret = appSecret;
        this._mapPageToAccessToken = mapPageToAccessToken || null;
        this._verifyToken = verifyToken || shortid_1.default.generate();
        this._skipLegacyProfile =
            typeof skipLegacyProfile === 'boolean' ? skipLegacyProfile : true;
        this._batchConfig = batchConfig || null;
        if (this._batchConfig) {
            this._batchQueue = new messenger_batch_1.MessengerBatchQueue(this._client, this._batchConfig);
        }
    }
    _getRawEventsFromRequest(body) {
        if ('entry' in body) {
            const { entry } = body;
            return entry
                .map(ent => {
                if (ent.messaging) {
                    return ent.messaging[0];
                }
                if (ent.standby) {
                    return ent.standby[0];
                }
                if (ent.changes) {
                    return ent.changes[0];
                }
                return null;
            })
                .filter(event => event != null);
        }
        return [body];
    }
    _getPageIdFromRawEvent(rawEvent) {
        if (rawEvent.message && rawEvent.message.isEcho && rawEvent.sender) {
            return rawEvent.sender.id;
        }
        if (rawEvent.recipient) {
            return rawEvent.recipient.id;
        }
        return null;
    }
    _isStandby(body) {
        if (!('entry' in body))
            return false;
        const entry = body.entry[0];
        return !!entry.standby;
    }
    _profilePicExpired(user) {
        try {
            const ext = new url_1.URL(user.profilePic).searchParams.get('ext');
            if (!ext)
                return true;
            const timestamp = +ext * 1000;
            const expireTime = new Date(timestamp);
            return !(isValid_1.default(expireTime) && isAfter_1.default(expireTime, new Date()));
        }
        catch (e) {
            return true;
        }
    }
    get platform() {
        return 'messenger';
    }
    get client() {
        return this._client;
    }
    get verifyToken() {
        return this._verifyToken;
    }
    getUniqueSessionKey(bodyOrEvent) {
        const rawEvent = bodyOrEvent instanceof MessengerEvent_1.default
            ? bodyOrEvent.rawEvent
            : this._getRawEventsFromRequest(bodyOrEvent)[0];
        if (rawEvent &&
            rawEvent.message &&
            rawEvent.message.isEcho &&
            rawEvent.recipient) {
            return rawEvent.recipient.id;
        }
        if (rawEvent && rawEvent.sender) {
            return rawEvent.sender.id;
        }
        return null;
    }
    updateSession(session, bodyOrEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!session.user || this._profilePicExpired(session.user)) {
                const senderId = this.getUniqueSessionKey(bodyOrEvent);
                const rawEvent = bodyOrEvent instanceof MessengerEvent_1.default
                    ? bodyOrEvent.rawEvent
                    : this._getRawEventsFromRequest(bodyOrEvent)[0];
                const pageId = this._getPageIdFromRawEvent(rawEvent);
                let customAccessToken;
                if (!pageId) {
                    warning_1.default(false, 'Could not find pageId from request body.');
                }
                else {
                    session.page = {
                        id: pageId,
                        _updatedAt: new Date().toISOString(),
                    };
                    if (this._mapPageToAccessToken != null) {
                        const mapPageToAccessToken = this._mapPageToAccessToken;
                        customAccessToken = yield mapPageToAccessToken(pageId);
                    }
                }
                if (this._skipLegacyProfile) {
                    session.user = {
                        _updatedAt: new Date().toISOString(),
                        id: senderId,
                    };
                }
                else {
                    let user = {};
                    try {
                        user = yield this._client.getUserProfile(senderId, {
                            accessToken: customAccessToken,
                        });
                    }
                    catch (err) {
                        warning_1.default(false, 'getUserProfile() failed, `session.user` will only have `id`');
                        console.error(err);
                    }
                    session.user = Object.assign(Object.assign({ _updatedAt: new Date().toISOString() }, user), { id: senderId });
                }
            }
            Object.freeze(session.user);
            Object.defineProperty(session, 'user', {
                configurable: false,
                enumerable: true,
                writable: false,
                value: session.user,
            });
            Object.freeze(session.page);
            Object.defineProperty(session, 'page', {
                configurable: false,
                enumerable: true,
                writable: false,
                value: session.page,
            });
        });
    }
    mapRequestToEvents(body) {
        const rawEvents = this._getRawEventsFromRequest(body);
        const isStandby = this._isStandby(body);
        return rawEvents.map(rawEvent => new MessengerEvent_1.default(rawEvent, {
            isStandby,
            pageId: this._getPageIdFromRawEvent(rawEvent),
        }));
    }
    createContext(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let customAccessToken;
            if (this._mapPageToAccessToken) {
                const { rawEvent } = params.event;
                let pageId = null;
                if (rawEvent.message && rawEvent.message.isEcho && rawEvent.sender) {
                    pageId = rawEvent.sender.id;
                }
                else if (rawEvent.recipient) {
                    pageId = rawEvent.recipient.id;
                }
                if (!pageId) {
                    warning_1.default(false, 'Could not find pageId from request body.');
                }
                else {
                    customAccessToken = yield this._mapPageToAccessToken(pageId);
                }
            }
            return new MessengerContext_1.default(Object.assign(Object.assign({}, params), { client: this._client, customAccessToken, batchQueue: this._batchQueue, appId: this._appId }));
        });
    }
    verifySignature(rawBody, signature) {
        if (typeof signature !== 'string')
            return false;
        const sha1 = signature.split('sha1=')[1];
        if (!sha1)
            return false;
        const bufferFromSignature = Buffer.from(sha1, 'hex');
        const hashBufferFromBody = crypto_1.default
            .createHmac('sha1', this._appSecret)
            .update(rawBody, 'utf8')
            .digest();
        if (bufferFromSignature.length !== hashBufferFromBody.length) {
            return false;
        }
        return crypto_1.default.timingSafeEqual(bufferFromSignature, hashBufferFromBody);
    }
    preprocess({ method, headers, query, rawBody, }) {
        if (method.toLowerCase() === 'get') {
            if (query['hub.mode'] === 'subscribe' &&
                query['hub.verify_token'] === this.verifyToken) {
                return {
                    shouldNext: false,
                    response: {
                        status: 200,
                        body: query['hub.challenge'],
                    },
                };
            }
            return {
                shouldNext: false,
                response: {
                    status: 403,
                    body: 'Forbidden',
                },
            };
        }
        if (method.toLowerCase() !== 'post') {
            return {
                shouldNext: true,
            };
        }
        if (this.verifySignature(rawBody, headers['x-hub-signature'])) {
            return {
                shouldNext: true,
            };
        }
        const error = {
            message: 'Messenger Signature Validation Failed!',
            request: {
                rawBody,
                headers: {
                    'x-hub-signature': headers['x-hub-signature'],
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
}
exports.default = MessengerConnector;
//# sourceMappingURL=MessengerConnector.js.map