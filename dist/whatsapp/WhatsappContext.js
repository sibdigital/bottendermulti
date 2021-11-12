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
const Context_1 = __importDefault(require("../context/Context"));
class WhatsappContext extends Context_1.default {
    get platform() {
        return 'whatsapp';
    }
    sendText(text, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const to = this._event.rawEvent.smsStatus === 'received'
                ? this._event.rawEvent.from
                : this._event.rawEvent.to;
            return this._client.createMessage(Object.assign({ to, body: text }, options));
        });
    }
}
exports.default = WhatsappContext;
//# sourceMappingURL=WhatsappContext.js.map