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
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const get_1 = __importDefault(require("lodash/get"));
const update_notifier_1 = __importDefault(require("update-notifier"));
const messaging_api_common_1 = require("messaging-api-common");
const log_1 = require("../shared/log");
const getArgs_1 = __importDefault(require("./providers/sh/utils/getArgs"));
const providers_1 = __importDefault(require("./providers"));
const pkg = JSON.parse(fs_extra_1.default.readFileSync(path_1.default.resolve(__dirname, '../../package.json'), 'utf8'));
const main = (argvFrom2) => __awaiter(void 0, void 0, void 0, function* () {
    let providerName;
    let subcommand;
    update_notifier_1.default({ pkg }).notify({ defer: false });
    const argv = getArgs_1.default(argvFrom2, {
        '--version': Boolean,
        '-v': '--version',
        '--help': Boolean,
        '-h': '--help',
    }, {
        permissive: true,
    });
    switch (argv._[0]) {
        case 'messenger':
        case 'telegram':
        case 'line':
        case 'viber':
            providerName = argv._[0];
            subcommand = argv._[1];
            break;
        default:
            providerName = 'sh';
            subcommand = argv._[0];
    }
    if (argv['--version'] || argv._[0] === 'version') {
        console.log(pkg.version);
        process.exit(0);
    }
    const provider = providers_1.default[providerName];
    if (argv['--help']) {
        provider.help();
        process.exit(0);
    }
    const ctx = {
        config: null,
        argv,
    };
    try {
        const method = get_1.default(provider, messaging_api_common_1.camelcase(subcommand));
        if (method) {
            yield provider[messaging_api_common_1.camelcase(subcommand)](ctx);
        }
        else {
            const subcommands = Array.from(provider.subcommands).join(', ');
            log_1.error(`Please specify a valid subcommand: ${subcommands}`);
            provider.help();
        }
    }
    catch (err) {
        log_1.error(`An unexpected error occurred in provider ${subcommand}: ${err.message}
${err.stack}`);
    }
});
const handleUnexpected = (err) => {
    log_1.error(`An unexpected error occurred: ${err.message}
${err.stack}`);
    process.exit(1);
};
const handleRejection = (reason) => {
    if (reason) {
        if (reason instanceof Error) {
            handleUnexpected(reason);
        }
        else {
            log_1.error(`An unexpected rejection occurred: ${reason}`);
        }
    }
    else {
        log_1.error('An unexpected empty rejection occurred');
    }
    process.exit(1);
};
process.on('unhandledRejection', handleRejection);
process.on('uncaughtException', handleUnexpected);
main(process.argv.slice(2)).catch(handleUnexpected);
//# sourceMappingURL=index.js.map