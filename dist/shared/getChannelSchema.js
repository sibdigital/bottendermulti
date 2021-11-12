"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const menuItemSchema = joi_1.default.object().keys({
    type: joi_1.default.string(),
    title: joi_1.default.string(),
    url: joi_1.default.string().when('type', {
        is: 'web_url',
        then: joi_1.default.string().required(),
    }),
    payload: joi_1.default.string().when('type', {
        is: 'postback',
        then: joi_1.default.string().required(),
    }),
    webviewHeightRatio: joi_1.default.string(),
    messengerExtensions: joi_1.default.boolean(),
    fallbackUrl: joi_1.default.string(),
    webviewShareButton: joi_1.default.string(),
});
const messengerSchema = joi_1.default.object().keys({
    enabled: joi_1.default.boolean(),
    path: joi_1.default.string(),
    accessToken: joi_1.default.string(),
    verifyToken: joi_1.default.string(),
    pageId: joi_1.default.string(),
    appId: joi_1.default.string(),
    appSecret: joi_1.default.string(),
    fields: joi_1.default.array().items(joi_1.default.string()),
    profile: joi_1.default.object().keys({
        getStarted: joi_1.default.object().keys({
            payload: joi_1.default.string(),
        }),
        persistentMenu: joi_1.default.array().items(joi_1.default.object().keys({
            locale: joi_1.default.string(),
            composerInputDisabled: joi_1.default.boolean(),
            callToActions: joi_1.default.array()
                .items(menuItemSchema)
                .max(3)
                .when('composerInputDisabled', {
                is: true,
                then: joi_1.default.array()
                    .items(menuItemSchema)
                    .max(3)
                    .required(),
            }),
        })),
        greeting: joi_1.default.array().items(joi_1.default.object().keys({
            locale: joi_1.default.string(),
            text: joi_1.default.string(),
        })),
        iceBreakers: joi_1.default.array().items(joi_1.default.object().keys({
            question: joi_1.default.string(),
            payload: joi_1.default.string(),
        })),
        whitelistedDomains: joi_1.default.array().items(joi_1.default.string()),
    }),
});
const lineSchema = joi_1.default.object().keys({
    enabled: joi_1.default.boolean(),
    path: joi_1.default.string(),
    channelSecret: joi_1.default.string().required(),
    accessToken: joi_1.default.string().required(),
});
const telegramSchema = joi_1.default.object().keys({
    enabled: joi_1.default.boolean(),
    path: joi_1.default.string(),
    accessToken: joi_1.default.string().required(),
});
const slackSchema = joi_1.default.object().keys({
    enabled: joi_1.default.boolean(),
    path: joi_1.default.string(),
    accessToken: joi_1.default.string().required(),
    verificationToken: joi_1.default.string(),
});
const viberSchema = joi_1.default.object().keys({
    enabled: joi_1.default.boolean(),
    path: joi_1.default.string(),
    accessToken: joi_1.default.string().required(),
    sender: joi_1.default.object().keys({
        name: joi_1.default.string(),
        avatar: joi_1.default.string(),
    }),
});
const whatsappSchema = joi_1.default.object().keys({
    enabled: joi_1.default.boolean(),
    path: joi_1.default.string(),
    accountSid: joi_1.default.string().required(),
    authToken: joi_1.default.string().required(),
});
function getChannelSchema(channel) {
    return {
        messenger: messengerSchema,
        line: lineSchema,
        telegram: telegramSchema,
        slack: slackSchema,
        viber: viberSchema,
        whatsapp: whatsappSchema,
    }[channel];
}
exports.default = getChannelSchema;
//# sourceMappingURL=getChannelSchema.js.map