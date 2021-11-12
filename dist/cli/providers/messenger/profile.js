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
const chalk_1 = __importDefault(require("chalk"));
const invariant_1 = __importDefault(require("invariant"));
const messaging_api_messenger_1 = require("messaging-api-messenger");
const deep_object_diff_1 = require("deep-object-diff");
const lodash_1 = require("lodash");
const messaging_api_common_1 = require("messaging-api-common");
const getChannelConfig_1 = __importDefault(require("../../../shared/getChannelConfig"));
const getSubArgs_1 = __importDefault(require("../sh/utils/getSubArgs"));
const types_1 = require("../../../types");
const log_1 = require("../../../shared/log");
const FIELDS = [
    'account_linking_url',
    'persistent_menu',
    'get_started',
    'greeting',
    'ice_breakers',
    'whitelisted_domains',
];
exports.help = () => {
    console.log(`
    bottender messenger profile <action> [option]

    ${chalk_1.default.dim('Actions:')}

      get           Get the messenger profile
      set           Set the messenger profile by diff
      del, delete   Delete all the messenger profile fields
      help          Show this help

    ${chalk_1.default.dim('Options:')}

      -f, --force   Force update the messenger profile by config

    ${chalk_1.default.dim('Examples:')}

    ${chalk_1.default.dim('-')} Set the messenger profile

      ${chalk_1.default.cyan('$ bottender messenger profile set')}

    ${chalk_1.default.dim('-')} Force update the messenger profile

      ${chalk_1.default.cyan('$ bottender messenger profile set --force')}
  `);
};
exports.trimDomain = (profile) => {
    const clone = Object.assign({}, profile);
    if (clone.whitelistedDomains) {
        clone.whitelistedDomains = clone.whitelistedDomains.map((domain) => domain.replace(/\/$/, ''));
    }
    return clone;
};
function getMessengerProfile(_) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Messenger);
            const { accessToken } = config;
            invariant_1.default(accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            const client = messaging_api_messenger_1.MessengerClient.connect({
                accessToken,
            });
            const profile = yield client.getMessengerProfile(FIELDS);
            if (profile) {
                log_1.print('The profile is:');
                log_1.print(`\n${JSON.stringify(profile, null, 2)}`);
            }
            else {
                log_1.error(`Failed to find ${log_1.bold('messenger_profile')} setting`);
            }
        }
        catch (err) {
            log_1.error(`Failed to get ${log_1.bold('messenger_profile')} settings`);
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
exports.getMessengerProfile = getMessengerProfile;
function setMessengerProfile(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = getSubArgs_1.default(ctx.argv, {
            '--force': Boolean,
            '-f': '--force',
        });
        const force = argv['--force'];
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Messenger);
            const { accessToken } = config;
            invariant_1.default(accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            const { profile: _profile } = getChannelConfig_1.default(types_1.Channel.Messenger);
            const client = messaging_api_messenger_1.MessengerClient.connect({
                accessToken,
            });
            if (force) {
                yield client.deleteMessengerProfile(FIELDS);
                log_1.print(`Successfully delete all ${log_1.bold('messenger_profile')} settings due to ${log_1.bold('--force')} option`);
                if (_profile.whitelistedDomains) {
                    yield client.setMessengerProfile(lodash_1.pick(_profile, 'whitelistedDomains'));
                    yield client.setMessengerProfile(lodash_1.omit(_profile, 'whitelistedDomains'));
                }
                else {
                    yield client.setMessengerProfile(_profile);
                }
                log_1.print(`Successfully set ${log_1.bold('messenger_profile')} settings`);
            }
            else {
                const [_existedProfile] = yield client.getMessengerProfile(FIELDS);
                const profile = exports.trimDomain(_profile);
                const existedProfile = exports.trimDomain(_existedProfile);
                const diffResult = deep_object_diff_1.diff(existedProfile, profile);
                if (Object.keys(diffResult).length !== 0) {
                    const shouldDeleteFields = Object.keys(deep_object_diff_1.deletedDiff(existedProfile, profile));
                    const shouldSetFields = [
                        ...Object.keys(deep_object_diff_1.addedDiff(existedProfile, profile)),
                        ...Object.keys(deep_object_diff_1.updatedDiff(existedProfile, profile)),
                    ];
                    if (shouldDeleteFields.length > 0) {
                        yield client.deleteMessengerProfile(shouldDeleteFields.map(field => messaging_api_common_1.snakecase(field)));
                        const deleteFileds = shouldDeleteFields.join(', ');
                        log_1.print(`Successfully delete ${log_1.bold(deleteFileds)} settings`);
                    }
                    if (shouldSetFields.length > 0) {
                        const shouldSetProfile = lodash_1.pick(profile, shouldSetFields);
                        if (shouldSetFields.includes('whitelistedDomains')) {
                            yield client.setMessengerProfile(lodash_1.pick(shouldSetProfile, 'whitelistedDomains'));
                            yield client.setMessengerProfile(lodash_1.omit(shouldSetProfile, 'whitelistedDomains'));
                        }
                        else {
                            yield client.setMessengerProfile(shouldSetProfile);
                        }
                        const setFields = Object.keys(shouldSetProfile).join(', ');
                        log_1.print(`Successfully set ${log_1.bold(setFields)} settings`);
                    }
                }
                else {
                    log_1.print(`No change apply because the profile settings is the same.`);
                }
            }
            log_1.log(`You can use ${log_1.bold('bottender messenger profile get')} to see the full profile setting.`);
        }
        catch (err) {
            log_1.error(`Failed to set ${log_1.bold('messenger_profile')} settings`);
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
exports.setMessengerProfile = setMessengerProfile;
function deleteMessengerProfile(_) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Messenger);
            invariant_1.default(config.accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            const accessToken = config.accessToken;
            const client = messaging_api_messenger_1.MessengerClient.connect({
                accessToken,
            });
            yield client.deleteMessengerProfile(FIELDS);
            log_1.print(`Successfully delete ${log_1.bold('messenger_profile')} settings`);
        }
        catch (err) {
            log_1.error(`Failed to delete ${log_1.bold('messenger_profile')} settings`);
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
exports.deleteMessengerProfile = deleteMessengerProfile;
function main(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const subcommand = ctx.argv._[2];
        switch (subcommand) {
            case 'get':
                yield getMessengerProfile(ctx);
                break;
            case 'set':
                yield setMessengerProfile(ctx);
                break;
            case 'delete':
            case 'del':
                yield deleteMessengerProfile(ctx);
                break;
            case 'help':
                exports.help();
                break;
            default:
                log_1.error(`Please specify a valid subcommand: get, set, delete, help`);
                exports.help();
        }
    });
}
exports.default = main;
//# sourceMappingURL=profile.js.map