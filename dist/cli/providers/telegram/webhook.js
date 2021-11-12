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
const prompt_confirm_1 = __importDefault(require("prompt-confirm"));
const invariant_1 = __importDefault(require("invariant"));
const messaging_api_telegram_1 = require("messaging-api-telegram");
const getChannelConfig_1 = __importDefault(require("../../../shared/getChannelConfig"));
const getSubArgs_1 = __importDefault(require("../sh/utils/getSubArgs"));
const getWebhookFromNgrok_1 = __importDefault(require("../../../shared/getWebhookFromNgrok"));
const types_1 = require("../../../types");
const log_1 = require("../../../shared/log");
const help_1 = __importDefault(require("./help"));
function getWebhook(_) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Telegram);
            const { accessToken } = config;
            invariant_1.default(accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            const client = messaging_api_telegram_1.TelegramClient.connect({
                accessToken,
            });
            const result = yield client.getWebhookInfo();
            Object.entries(result).forEach(([key, value]) => log_1.print(`${key}: ${value}`));
        }
        catch (err) {
            log_1.error('Failed to get Telegram webhook');
            if (err.response) {
                log_1.error(`status: ${log_1.bold(err.response.status)}`);
                if (err.response.data) {
                    log_1.error(`data: ${log_1.bold(JSON.stringify(err.response.data, null, 2))}`);
                }
            }
            else {
                log_1.error(err.message);
            }
            return process.exit(1);
        }
    });
}
exports.getWebhook = getWebhook;
function setWebhook(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = getSubArgs_1.default(ctx.argv, {
            '--webhook': String,
            '-w': '--webhook',
            '--ngrok-port': String,
        });
        const ngrokPort = argv['--ngrok-port'] || '4040';
        let webhook = argv['--webhook'];
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Telegram);
            const { accessToken, path = '/webhooks/telegram' } = config;
            invariant_1.default(accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            const client = messaging_api_telegram_1.TelegramClient.connect({
                accessToken,
            });
            if (!webhook) {
                log_1.warn('We can not find the webhook callback URL you provided.');
                const prompt = new prompt_confirm_1.default(`Are you using ngrok (get URL from ngrok server on http://127.0.0.1:${ngrokPort})?`);
                const result = yield prompt.run();
                if (result) {
                    webhook = `${yield getWebhookFromNgrok_1.default(ngrokPort)}${path}`;
                }
            }
            invariant_1.default(webhook, '`webhook` is required but not found. Use -w <webhook> to set up or make sure you are running ngrok server.');
            yield client.setWebhook(webhook);
            log_1.print('Successfully set Telegram webhook callback URL');
        }
        catch (err) {
            log_1.error('Failed to set Telegram webhook');
            if (err.response) {
                log_1.error(`status: ${log_1.bold(err.response.status)}`);
                if (err.response.data) {
                    log_1.error(`data: ${log_1.bold(JSON.stringify(err.response.data, null, 2))}`);
                }
            }
            else {
                log_1.error(err.message);
            }
            return process.exit(1);
        }
    });
}
exports.setWebhook = setWebhook;
function deleteWebhook(_) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Telegram);
            const { accessToken } = config;
            invariant_1.default(accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            const client = messaging_api_telegram_1.TelegramClient.connect({
                accessToken,
            });
            yield client.deleteWebhook();
            log_1.print('Successfully delete Telegram webhook');
        }
        catch (err) {
            log_1.error('Failed to delete Telegram webhook');
            if (err.response) {
                log_1.error(`status: ${log_1.bold(err.response.status)}`);
                if (err.response.data) {
                    log_1.error(`data: ${log_1.bold(JSON.stringify(err.response.data, null, 2))}`);
                }
            }
            else {
                log_1.error(err.message);
            }
            return process.exit(1);
        }
    });
}
exports.deleteWebhook = deleteWebhook;
function main(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const subcommand = ctx.argv._[2];
        switch (subcommand) {
            case 'get':
                yield getWebhook(ctx);
                break;
            case 'set':
                yield setWebhook(ctx);
                break;
            case 'delete':
            case 'del':
                yield deleteWebhook(ctx);
                break;
            default:
                log_1.error(`Please specify a valid subcommand: get, set, delete`);
                help_1.default();
        }
    });
}
exports.default = main;
//# sourceMappingURL=webhook.js.map