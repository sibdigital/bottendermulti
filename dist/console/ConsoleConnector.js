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
const ConsoleContext_1 = __importDefault(require("./ConsoleContext"));
const ConsoleEvent_1 = __importDefault(require("./ConsoleEvent"));
class ConsoleConnector {
    constructor({ client, fallbackMethods, mockPlatform, } = {}) {
        this._client = client || {
            sendText: (text) => {
                process.stdout.write(`Bot > ${text}\n`);
            },
        };
        this._fallbackMethods = fallbackMethods || false;
        this._platform = mockPlatform || 'console';
    }
    get platform() {
        return this._platform;
    }
    get client() {
        return this._client;
    }
    getUniqueSessionKey() {
        return '1';
    }
    updateSession(session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!session.user) {
                session.user = {
                    id: '1',
                    name: 'you',
                    _updatedAt: new Date().toISOString(),
                };
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
        return [new ConsoleEvent_1.default(body)];
    }
    createContext(params) {
        return new ConsoleContext_1.default(Object.assign(Object.assign({}, params), { client: this._client, fallbackMethods: this._fallbackMethods, mockPlatform: this._platform }));
    }
}
exports.default = ConsoleConnector;
//# sourceMappingURL=ConsoleConnector.js.map