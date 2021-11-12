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
const readline_1 = __importDefault(require("readline"));
const Bot_1 = __importDefault(require("../bot/Bot"));
const ConsoleConnector_1 = __importDefault(require("./ConsoleConnector"));
class ConsoleBot extends Bot_1.default {
    constructor({ sessionStore, fallbackMethods, mockPlatform, } = {}) {
        const connector = new ConsoleConnector_1.default({ fallbackMethods, mockPlatform });
        super({ connector, sessionStore, sync: true });
    }
    getSession() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initSessionStore();
            const { platform } = this._connector;
            const sessionKey = '1';
            const sessionId = `${platform}:${sessionKey}`;
            const session = (yield this._sessions.read(sessionId)) ||
                Object.create(null);
            return session;
        });
    }
    createRuntime() {
        const requestHandler = this.createRequestHandler();
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const handleLine = (line = '') => __awaiter(this, void 0, void 0, function* () {
            const lowerCaseLine = line.toLowerCase();
            if (lowerCaseLine === '/quit' || lowerCaseLine === '/exit') {
                rl.close();
                process.exit();
            }
            if (lowerCaseLine === '/session') {
                const session = yield this.getSession();
                this._connector.client.sendText(JSON.stringify(session, null, 2));
            }
            else if (lowerCaseLine === '/state') {
                const session = yield this.getSession();
                this._connector.client.sendText(JSON.stringify(session._state || {}, null, 2));
            }
            else {
                let rawEvent;
                if (/^\/payload /.test(line)) {
                    const payload = line.split('/payload ')[1];
                    rawEvent = {
                        payload,
                    };
                }
                else {
                    rawEvent = {
                        message: {
                            text: line,
                        },
                    };
                }
                yield Promise.resolve(requestHandler(rawEvent));
            }
            process.stdout.write('You > ');
            rl.once('line', handleLine);
        });
        process.stdout.write('You > ');
        rl.once('line', handleLine);
    }
}
exports.default = ConsoleBot;
//# sourceMappingURL=ConsoleBot.js.map