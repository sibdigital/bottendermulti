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
const querystring_1 = __importDefault(require("querystring"));
const axios_error_1 = __importDefault(require("axios-error"));
const axios_1 = __importDefault(require("axios"));
const get_1 = __importDefault(require("lodash/get"));
const messaging_api_common_1 = require("messaging-api-common");
function handleError(err) {
    if (err.response && err.response.data) {
        const error = get_1.default(err, 'response.data', {});
        const msg = `WhatsApp API - ${error.code} ${error.message} ${error.more_info}`;
        throw new axios_error_1.default(msg, err);
    }
    throw new axios_error_1.default(err.message, err);
}
class TwilioClient {
    constructor(config) {
        const twilioOrigin = `https://${config.accountSid}:${config.authToken}@api.twilio.com`;
        this._authToken = config.authToken;
        this._phoneNumber = config.phoneNumber;
        this._axios = axios_1.default.create({
            baseURL: `${config.origin || twilioOrigin}/2010-04-01/Accounts/${config.accountSid}/`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        this._axios.interceptors.request.use(messaging_api_common_1.createRequestInterceptor({
            onRequest: this._onRequest,
        }));
    }
    static connect(config) {
        return new TwilioClient(config);
    }
    get axios() {
        return this._axios;
    }
    get authToken() {
        return this._authToken;
    }
    createMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this._axios.post('/Messages.json', querystring_1.default.stringify(messaging_api_common_1.pascalcaseKeys(Object.assign({ from: this._phoneNumber }, message))));
                return messaging_api_common_1.camelcaseKeys(data);
            }
            catch (err) {
                handleError(err);
            }
        });
    }
}
exports.default = TwilioClient;
//# sourceMappingURL=TwilioClient.js.map