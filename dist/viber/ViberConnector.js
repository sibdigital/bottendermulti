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
const messaging_api_viber_1 = require("messaging-api-viber");
const deep_object_diff_1 = require("deep-object-diff");
const ViberContext_1 = __importDefault(require("./ViberContext"));
const ViberEvent_1 = __importDefault(require("./ViberEvent"));
class ViberConnector {
    constructor(options) {
        const { skipLegacyProfile } = options;
        if ('client' in options) {
            this._client = options.client;
        }
        else {
            const { accessToken, sender, origin } = options;
            invariant_1.default(options.accessToken, 'Viber access token is required. Please make sure you have filled it correctly in `bottender.config.js` or `.env` file.');
            this._client = messaging_api_viber_1.ViberClient.connect({
                accessToken,
                sender,
                origin,
            }, sender);
        }
        this._accessToken = this._client.accessToken;
        this._skipLegacyProfile =
            typeof skipLegacyProfile === 'boolean' ? skipLegacyProfile : true;
    }
    _getRawEventFromRequest(body) {
        return body;
    }
    get platform() {
        return 'viber';
    }
    get client() {
        return this._client;
    }
    getUniqueSessionKey(body) {
        switch (body.event) {
            case 'subscribed':
            case 'conversation_started':
                return body.user.id;
            case 'unsubscribed':
            case 'delivered':
            case 'seen':
            case 'failed':
                return body.userId;
            case 'message':
                return body.sender.id;
            default:
                return '';
        }
    }
    updateSession(session, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            switch (body.event) {
                case 'subscribed':
                case 'conversation_started':
                    user = body.user;
                    break;
                case 'unsubscribed':
                case 'delivered':
                case 'seen':
                case 'failed':
                    user = {
                        id: body.userId,
                    };
                    break;
                case 'message':
                    user = body.sender;
                    break;
                default:
                    break;
            }
            if (this._skipLegacyProfile) {
                session.user = {
                    _updatedAt: new Date().toISOString(),
                    id: (user || {}).id,
                };
            }
            else if (Object.keys(deep_object_diff_1.addedDiff(session.user || {}, user)).length > 0) {
                session.user = Object.assign(Object.assign({}, session.user), user);
                session.user._updatedAt = new Date().toISOString();
            }
            Object.freeze(session.user);
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
        return [new ViberEvent_1.default(rawEvent)];
    }
    createContext(params) {
        return new ViberContext_1.default(Object.assign(Object.assign({}, params), { client: this._client }));
    }
    verifySignature(rawBody, signature) {
        const hashBufferFromBody = crypto_1.default
            .createHmac('sha256', this._accessToken || '')
            .update(rawBody)
            .digest();
        const bufferFromSignature = Buffer.from(signature, 'hex');
        if (bufferFromSignature.length !== hashBufferFromBody.length) {
            return false;
        }
        return crypto_1.default.timingSafeEqual(bufferFromSignature, hashBufferFromBody);
    }
    preprocess({ method, headers, rawBody, }) {
        if (method.toLowerCase() !== 'post' ||
            this.verifySignature(rawBody, headers['x-viber-content-signature'])) {
            return {
                shouldNext: true,
            };
        }
        const error = {
            message: 'Viber Signature Validation Failed!',
            request: {
                rawBody,
                headers: {
                    'x-viber-content-signature': headers['x-viber-content-signature'],
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
exports.default = ViberConnector;
//# sourceMappingURL=ViberConnector.js.map