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
const axios_1 = __importDefault(require("axios"));
function getWebhookFromNgrok(ngrokPort = '4040') {
    return __awaiter(this, void 0, void 0, function* () {
        const ngrokAxios = axios_1.default.create({
            baseURL: `http://localhost:${ngrokPort}`,
        });
        const { data } = yield ngrokAxios.get('/api/tunnels');
        if (!data) {
            throw new Error('Failed to get tunnels from ngrok');
        }
        const httpsTunnel = data.tunnels.find(tunnel => tunnel.proto === 'https');
        if (!httpsTunnel) {
            throw new Error('Can not find a https tunnel');
        }
        return httpsTunnel.public_url;
    });
}
exports.default = getWebhookFromNgrok;
//# sourceMappingURL=getWebhookFromNgrok.js.map