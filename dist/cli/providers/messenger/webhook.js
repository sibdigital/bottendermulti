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
const cli_table3_1 = __importDefault(require("cli-table3"));
const chalk_1 = __importDefault(require("chalk"));
const invariant_1 = __importDefault(require("invariant"));
const messaging_api_messenger_1 = require("messaging-api-messenger");
const getChannelConfig_1 = __importDefault(require("../../../shared/getChannelConfig"));
const getSubArgs_1 = __importDefault(require("../sh/utils/getSubArgs"));
const getWebhookFromNgrok_1 = __importDefault(require("../../../shared/getWebhookFromNgrok"));
const types_1 = require("../../../types");
const log_1 = require("../../../shared/log");
const help = () => {
    console.log(`
    bottender messenger webhook <command> [option]

    ${chalk_1.default.dim('Commands:')}

      set                   Set Messenger webhook.

    ${chalk_1.default.dim('Options:')}

      -w, --webhook         Webhook callback URL
      --ngrok-port          ngrok port(default: 4040)

    ${chalk_1.default.dim('Examples:')}

    ${chalk_1.default.dim('-')} Set Messenger webhook URL

      ${chalk_1.default.cyan('$ bottender messenger webhook set -w http://example.com')}

    ${chalk_1.default.dim('-')} Use specific ngrok port and access token

      ${chalk_1.default.cyan('$ bottender messenger webhook set --ngrok-port 4041')}
  `);
};
function setWebhook(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = getSubArgs_1.default(ctx.argv, {
            '--webhook': String,
            '-w': '--webhook',
            '--ngrok-port': String,
        });
        let webhook = argv['--webhook'];
        const ngrokPort = argv['--ngrok-port'] || '4040';
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Messenger);
            const { accessToken, appId, appSecret, verifyToken, pageId, path = '/webhooks/messenger', } = config;
            invariant_1.default(accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            invariant_1.default(appId, '`appId` is not found in the `bottender.config.js` file');
            invariant_1.default(appSecret, '`appSecret` is not found in the `bottender.config.js` file');
            invariant_1.default(verifyToken, '`verifyToken` is not found in the `bottender.config.js` file');
            const client = messaging_api_messenger_1.MessengerClient.connect({
                accessToken,
                appId,
                appSecret,
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
            const defaultFields = [
                'messages',
                'messaging_postbacks',
                'messaging_optins',
                'messaging_referrals',
                'messaging_handovers',
                'messaging_policy_enforcement',
            ];
            if (!config.fields) {
                log_1.print(`\`fields\` is not found in the \`bottender.config.js\` file, we will use ${log_1.bold(defaultFields.join(', '))} to setup.`);
                log_1.print('See more on: https://developers.facebook.com/docs/graph-api/reference/app/subscriptions');
            }
            const fields = config.fields || defaultFields;
            const tokenInfo = yield client.debugToken();
            invariant_1.default(tokenInfo.isValid, 'Page access token is invalid');
            invariant_1.default(tokenInfo.type === 'PAGE', 'Access token is not a page token');
            const pageInfo = yield client.getPageInfo();
            const table = new cli_table3_1.default();
            table.push([chalk_1.default.green('Page ID'), pageInfo.id], [chalk_1.default.green('Page Name'), pageInfo.name], [chalk_1.default.green('App Name'), tokenInfo.application], [
                chalk_1.default.green('Token Expires At'),
                tokenInfo.expiresAt === 0
                    ? 'Never'
                    : new Date(tokenInfo.expiresAt * 1000).toString(),
            ], [chalk_1.default.green('Token Scopes'), tokenInfo.scopes.join(',')], [chalk_1.default.green('App Fields'), fields.join(',')], [chalk_1.default.green('Webhook URL'), webhook]);
            console.log(table.toString());
            const prompt = new prompt_confirm_1.default(`Are you sure to create subscription with those settings?`);
            const result = yield prompt.run();
            if (!result) {
                return;
            }
            const { success } = yield client.createSubscription({
                object: 'page',
                callbackUrl: webhook,
                verifyToken: verifyToken,
                fields,
                accessToken: `${appId}|${appSecret}`,
            });
            invariant_1.default(success, 'Setting for webhook is failed');
            log_1.print('Successfully set Messenger webhook callback URL');
            if (pageId) {
                const { data } = yield client.axios.post(`/${pageId}/subscribed_apps?access_token=${accessToken}`, {
                    subscribedFields: fields.join(','),
                });
                invariant_1.default(data.success, 'Subscribing app for page is failed');
            }
            log_1.print(`Check callback URL on: https://developers.facebook.com/apps/${appId}/webhooks/`);
            log_1.print(`Check selected events on: https://developers.facebook.com/apps/${appId}/messenger/`);
        }
        catch (err) {
            log_1.error('Failed to set Messenger webhook');
            if (err.response) {
                log_1.error(`status: ${log_1.bold(err.response.status)}`);
                if (err.response.data) {
                    log_1.error(`data: ${log_1.bold(JSON.stringify(err.response.data, null, 2))}`);
                }
            }
            else {
                log_1.warn(err.message);
            }
            return process.exit(1);
        }
    });
}
exports.setWebhook = setWebhook;
function main(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const subcommand = ctx.argv._[2];
        switch (subcommand) {
            case 'set': {
                yield setWebhook(ctx);
                break;
            }
            case 'help':
                help();
                break;
            default:
                log_1.error(`Please specify a valid subcommand: set`);
                help();
        }
    });
}
exports.default = main;
//# sourceMappingURL=webhook.js.map