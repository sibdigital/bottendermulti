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
const TwilioClient_1 = __importDefault(require("./TwilioClient"));
const WhatsappContext_1 = __importDefault(require("./WhatsappContext"));
const WhatsappEvent_1 = __importDefault(require("./WhatsappEvent"));
function getExpectedTwilioSignature(authToken, url, params = {}) {
    const data = Object.keys(params)
        .sort()
        .reduce((acc, key) => acc + key + params[key], url);
    return crypto_1.default
        .createHmac('sha1', authToken)
        .update(Buffer.from(data, 'utf-8'))
        .digest('base64');
}
class WhatsappConnector {
    constructor(options) {
        if ('client' in options) {
            this._client = options.client;
        }
        else {
            const { accountSid, authToken, phoneNumber, origin } = options;
            this._client = TwilioClient_1.default.connect({
                accountSid,
                authToken,
                phoneNumber,
                origin,
            });
        }
    }
    get platform() {
        return 'whatsapp';
    }
    get client() {
        return this._client;
    }
    getUniqueSessionKey(body) {
        return body.smsStatus === 'received' ? body.from : body.to;
    }
    updateSession(session, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = body.smsStatus === 'received' ? body.from : body.to;
            session.user = {
                _updatedAt: new Date().toISOString(),
                id: userId,
            };
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
        return [new WhatsappEvent_1.default(body)];
    }
    createContext(params) {
        return new WhatsappContext_1.default(Object.assign(Object.assign({}, params), { client: this._client }));
    }
    verifySignature({ body, url, headers, }) {
        const authToken = this._client.authToken;
        const bufferFromActualSignature = Buffer.from(headers['x-twilio-signature']);
        const bufferFromExpectedSignature = Buffer.from(getExpectedTwilioSignature(authToken, url, body));
        if (bufferFromActualSignature.length !== bufferFromExpectedSignature.length) {
            return false;
        }
        return crypto_1.default.timingSafeEqual(bufferFromActualSignature, bufferFromExpectedSignature);
    }
    preprocess({ url, headers, rawBody, body, }) {
        if (this.verifySignature({ body, url, headers })) {
            return {
                shouldNext: true,
            };
        }
        const error = {
            message: 'WhatsApp Signature Validation Failed!',
            request: {
                rawBody,
                headers: {
                    'x-twilio-signature': headers['x-twilio-signature'],
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
exports.default = WhatsappConnector;
//# sourceMappingURL=WhatsappConnector.js.map