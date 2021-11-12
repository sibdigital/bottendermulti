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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ngrok_1 = __importDefault(require("ngrok"));
const nodemon_1 = __importDefault(require("nodemon"));
const getBottenderConfig_1 = __importDefault(require("../../../shared/getBottenderConfig"));
const getSubArgs_1 = __importDefault(require("./utils/getSubArgs"));
const dev = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const argv = getSubArgs_1.default(ctx.argv, {
        '--console': Boolean,
        '--port': Number,
        '--inspect': String,
        '-c': '--console',
        '-p': '--port',
    });
    const isConsole = argv['--console'] || false;
    const port = argv['--port'] || process.env.PORT || 5000;
    const inspectionUrl = argv['--inspect'];
    const config = getBottenderConfig_1.default();
    const { channels } = config;
    let isTypescript = false;
    try {
        isTypescript = Boolean(fs_1.default.statSync(path_1.default.resolve('tsconfig.json')).isFile);
    }
    catch (_a) {
    }
    nodemon_1.default([
        inspectionUrl ? `--inspect=${inspectionUrl} -- ` : '',
        isTypescript ? '--ext js,mjs,json,ts --ignore dist/ ' : '',
        '--exec "',
        isTypescript ? 'tsc && ' : '',
        'bottender start',
        isConsole ? ' --console' : '',
        ` --port ${port}"`,
    ].join(''))
        .on('start', () => {
        console.log('App has started');
    })
        .on('quit', () => {
        console.log('App has quit');
        process.exit();
    })
        .on('restart', (files) => {
        console.log('App restarted due to: ', files);
    });
    if (!isConsole) {
        let url = '';
        try {
            url = yield ngrok_1.default.connect(port);
        }
        catch (err) {
            if (!(err instanceof Error) && err.msg) {
                throw new Error(`ngrok - ${err.msg}`);
            }
            throw err;
        }
        Object.entries(channels || {})
            .filter(([, { enabled }]) => enabled)
            .forEach(([channel, { path: webhookPath }]) => {
            const routePath = webhookPath || `/webhooks/${channel}`;
            console.log(`${channel} webhook URL: ${url}${routePath}`);
        });
    }
});
exports.default = dev;
//# sourceMappingURL=dev.js.map