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
const delay_1 = __importDefault(require("delay"));
const Context_1 = __importDefault(require("../context/Context"));
const methodBlackList = [
    'inspect',
    'then',
    'handlerDidEnd',
];
class ConsoleContext extends Context_1.default {
    constructor({ client, event, session, initialState, requestContext, fallbackMethods, mockPlatform, emitter, }) {
        super({ client, event, session, initialState, requestContext, emitter });
        this._fallbackMethods = false;
        this._mockPlatform = 'console';
        this._mockPlatform = mockPlatform;
        this._fallbackMethods = fallbackMethods;
        if (fallbackMethods) {
            return new Proxy(this, {
                get(target, key) {
                    if (typeof key !== 'string') {
                        return;
                    }
                    if (key in target) {
                        return target[key];
                    }
                    if (methodBlackList.includes(key))
                        return;
                    return (...args) => __awaiter(this, void 0, void 0, function* () {
                        yield target._methodMissing(key, args);
                    });
                },
            });
        }
    }
    get platform() {
        return this._mockPlatform || 'console';
    }
    typing(milliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (milliseconds > 0) {
                yield delay_1.default(milliseconds);
            }
        });
    }
    sendText(text, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args.length > 0 && this._fallbackMethods) {
                this._client.sendText(`${text}\nwith other args:\n${JSON.stringify(args, null, 2)}`);
            }
            else {
                this._client.sendText(text);
            }
        });
    }
    _methodMissing(method, args) {
        return __awaiter(this, void 0, void 0, function* () {
            this._client.sendText(`${method} with args:\n${JSON.stringify(args, null, 2)}`);
        });
    }
}
exports.default = ConsoleContext;
//# sourceMappingURL=ConsoleContext.js.map