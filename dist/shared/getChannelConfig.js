"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const get_1 = __importDefault(require("lodash/get"));
const invariant_1 = __importDefault(require("invariant"));
const getBottenderConfig_1 = __importDefault(require("./getBottenderConfig"));
const getChannelSchema_1 = __importDefault(require("./getChannelSchema"));
const log_1 = require("./log");
const getChannelConfig = (channel) => {
    const config = getBottenderConfig_1.default();
    const channelConfig = get_1.default(config, `channels.${channel}`);
    invariant_1.default(channelConfig, `Could not find \`channels.${channel}\` key in your \`bottender.config.js\`, please check your config file is in the correct format.`);
    const schema = getChannelSchema_1.default(channel);
    const validateResult = joi_1.default.validate(channelConfig, schema, {
        allowUnknown: true,
    });
    if (validateResult.error) {
        const { message, type } = validateResult.error.details[0];
        const errorPath = `channels.${channel}.${validateResult.error.details[0].path.join('.')}`;
        throw new Error(`The config format is not valid.\nmessage: ${message}\npath: ${log_1.bold(errorPath)}\ntype: ${type}`);
    }
    return channelConfig;
};
exports.default = getChannelConfig;
//# sourceMappingURL=getChannelConfig.js.map