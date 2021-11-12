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
const Bot_1 = __importDefault(require("../bot/Bot"));
const TelegramConnector_1 = __importDefault(require("./TelegramConnector"));
class TelegramBot extends Bot_1.default {
    constructor({ accessToken, sessionStore, sync, origin, }) {
        const connector = new TelegramConnector_1.default({ accessToken, origin });
        super({ connector, sessionStore, sync });
        this._offset = null;
        this._shouldGetUpdates = false;
    }
    get offset() {
        return this._offset;
    }
    createLongPollingRuntime(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this._shouldGetUpdates = true;
            this._offset = options.offset || null;
            const handler = this.createRequestHandler();
            while (this._shouldGetUpdates) {
                try {
                    const params = this._offset
                        ? Object.assign(Object.assign({}, options), { offset: this._offset }) : options;
                    const updates = yield this.connector.client.getUpdates(params);
                    if (updates.length > 0) {
                        for (let i = 0; i < updates.length; i++) {
                            yield handler(updates[i]);
                        }
                        const highestUpdateId = Math.max(...updates.map((update) => update.update_id));
                        this._offset = highestUpdateId + 1;
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    }
    stop() {
        this._shouldGetUpdates = false;
    }
}
exports.default = TelegramBot;
//# sourceMappingURL=TelegramBot.js.map