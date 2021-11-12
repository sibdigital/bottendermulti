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
const p_props_1 = __importDefault(require("p-props"));
const warning_1 = __importDefault(require("warning"));
const messaging_api_slack_1 = require("messaging-api-slack");
const messaging_api_common_1 = require("messaging-api-common");
const SlackContext_1 = __importDefault(require("./SlackContext"));
const SlackEvent_1 = __importDefault(require("./SlackEvent"));
class SlackConnector {
    constructor(options) {
        const { verificationToken, skipLegacyProfile, includeBotMessages, signingSecret, } = options;
        if ('client' in options) {
            this._client = options.client;
        }
        else {
            const { accessToken, origin } = options;
            invariant_1.default(accessToken, 'Slack access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.');
            this._client = messaging_api_slack_1.SlackOAuthClient.connect({
                accessToken,
                origin,
            });
        }
        this._signingSecret = signingSecret || '';
        this._verificationToken = verificationToken || '';
        if (!this._signingSecret) {
            if (!this._verificationToken) {
                warning_1.default(false, 'Both `signingSecret` and `verificationToken` is not set. Will bypass Slack event verification.\nPass in `signingSecret` to perform Slack event verification.');
            }
            else {
                warning_1.default(false, "It's deprecated to use `verificationToken` here, use `signingSecret` instead.");
            }
        }
        this._skipLegacyProfile =
            typeof skipLegacyProfile === 'boolean' ? skipLegacyProfile : true;
        this._includeBotMessages = includeBotMessages || false;
    }
    _getRawEventFromRequest(body) {
        if ('event' in body) {
            return body.event;
        }
        if (body.payload && typeof body.payload === 'string') {
            const payload = messaging_api_common_1.camelcaseKeysDeep(JSON.parse(body.payload));
            if (payload.type === 'interactive_message') {
                return payload;
            }
            return payload;
        }
        return body;
    }
    _isBotEventRequest(body) {
        const rawEvent = this._getRawEventFromRequest(body);
        return !!(rawEvent.botId ||
            ('subtype' in rawEvent && rawEvent.subtype === 'bot_message'));
    }
    get platform() {
        return 'slack';
    }
    get client() {
        return this._client;
    }
    getUniqueSessionKey(body) {
        const rawEvent = this._getRawEventFromRequest(body);
        if (rawEvent.channel &&
            typeof rawEvent.channel === 'object' &&
            rawEvent.channel.id) {
            return rawEvent.channel.id;
        }
        if (rawEvent.channelId) {
            return rawEvent.channelId;
        }
        if (rawEvent.view && rawEvent.view.privateMetadata) {
            return JSON.parse(rawEvent.view.privateMetadata).channelId;
        }
        if (rawEvent.item &&
            typeof rawEvent.item === 'object' &&
            typeof rawEvent.item.channel === 'string') {
            return rawEvent.item.channel;
        }
        return (rawEvent.channel || rawEvent.channelId);
    }
    updateSession(session, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isBotEventRequest(body)) {
                return;
            }
            const rawEvent = this._getRawEventFromRequest(body);
            let userFromBody;
            if (rawEvent.type === 'interactive_message' ||
                rawEvent.type === 'block_actions' ||
                rawEvent.type === 'view_submission' ||
                rawEvent.type === 'view_closed') {
                userFromBody = rawEvent.user.id;
            }
            else {
                userFromBody =
                    rawEvent.user || rawEvent.userId;
            }
            if (typeof session.user === 'object' &&
                session.user &&
                session.user.id &&
                session.user.id === userFromBody) {
                return;
            }
            const channelId = this.getUniqueSessionKey(body);
            const senderId = userFromBody;
            if (!senderId) {
                return;
            }
            if (this._skipLegacyProfile) {
                session.user = {
                    id: senderId,
                    _updatedAt: new Date().toISOString(),
                };
                session.channel = {
                    id: channelId,
                    _updatedAt: new Date().toISOString(),
                };
                Object.freeze(session.user);
                Object.defineProperty(session, 'user', {
                    configurable: false,
                    enumerable: true,
                    writable: false,
                    value: session.user,
                });
                Object.freeze(session.channel);
                Object.defineProperty(session, 'channel', {
                    configurable: false,
                    enumerable: true,
                    writable: false,
                    value: session.channel,
                });
                return;
            }
            const promises = {
                sender: this._client.getUserInfo(senderId),
            };
            if (!session.channel ||
                (session.channel.members &&
                    Array.isArray(session.channel.members) &&
                    session.channel.members.indexOf(senderId) < 0)) {
                promises.channel = this._client.getConversationInfo(channelId);
                promises.channelMembers = this._client.getAllConversationMembers(channelId);
            }
            if (!session.team ||
                (session.team.members &&
                    Array.isArray(session.team.members) &&
                    session.team.members.indexOf(senderId) < 0)) {
                promises.allUsers = this._client.getAllUserList();
            }
            const results = yield p_props_1.default(promises);
            session.user = Object.assign({ id: senderId, _updatedAt: new Date().toISOString() }, results.sender);
            Object.freeze(session.user);
            Object.defineProperty(session, 'user', {
                configurable: false,
                enumerable: true,
                writable: false,
                value: session.user,
            });
            if (promises.channel) {
                session.channel = Object.assign(Object.assign({}, results.channel), { members: results.channelMembers, _updatedAt: new Date().toISOString() });
                Object.freeze(session.channel);
                Object.defineProperty(session, 'channel', {
                    configurable: false,
                    enumerable: true,
                    writable: false,
                    value: session.channel,
                });
            }
            if (promises.allUsers) {
                session.team = {
                    members: results.allUsers,
                    _updatedAt: new Date().toISOString(),
                };
                Object.freeze(session.team);
                Object.defineProperty(session, 'team', {
                    configurable: false,
                    enumerable: true,
                    writable: false,
                    value: session.team,
                });
            }
        });
    }
    mapRequestToEvents(body) {
        const rawEvent = this._getRawEventFromRequest(body);
        if (!this._includeBotMessages && this._isBotEventRequest(body)) {
            return [];
        }
        return [new SlackEvent_1.default(rawEvent)];
    }
    createContext(params) {
        return new SlackContext_1.default(Object.assign(Object.assign({}, params), { client: this._client }));
    }
    verifySignature(tokenFromBody) {
        const bufferFromBot = Buffer.from(this._verificationToken);
        const bufferFromBody = Buffer.from(tokenFromBody);
        if (bufferFromBot.length !== bufferFromBody.length) {
            return false;
        }
        return crypto_1.default.timingSafeEqual(bufferFromBot, bufferFromBody);
    }
    verifySignatureBySigningSecret({ rawBody, signature, timestamp, }) {
        const FIVE_MINUTES_IN_MILLISECONDS = 5 * 1000 * 60;
        if (Math.abs(Date.now() - timestamp * 1000) > FIVE_MINUTES_IN_MILLISECONDS) {
            return false;
        }
        const SIGNATURE_VERSION = 'v0';
        const signatureBaseString = `${SIGNATURE_VERSION}:${timestamp}:${rawBody}`;
        const digest = crypto_1.default
            .createHmac('sha256', this._signingSecret)
            .update(signatureBaseString, 'utf8')
            .digest('hex');
        const calculatedSignature = `${SIGNATURE_VERSION}=${digest}`;
        return crypto_1.default.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(calculatedSignature, 'utf8'));
    }
    preprocess({ method, headers, body, rawBody, }) {
        if (method.toLowerCase() !== 'post') {
            return {
                shouldNext: true,
            };
        }
        const timestamp = headers['x-slack-request-timestamp'];
        const signature = headers['x-slack-signature'];
        if (this._signingSecret &&
            !this.verifySignatureBySigningSecret({
                rawBody,
                timestamp,
                signature,
            })) {
            const error = {
                message: 'Slack Signing Secret Validation Failed!',
                request: {
                    body,
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
        const token = !body.token && body.payload && typeof body.payload === 'string'
            ? JSON.parse(body.payload).token
            : body.token;
        if (this._verificationToken && !this.verifySignature(token)) {
            const error = {
                message: 'Slack Verification Token Validation Failed!',
                request: {
                    body,
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
        if (body.type === 'url_verification') {
            return {
                shouldNext: false,
                response: {
                    status: 200,
                    body: body.challenge,
                },
            };
        }
        return {
            shouldNext: true,
        };
    }
}
exports.default = SlackConnector;
//# sourceMappingURL=SlackConnector.js.map