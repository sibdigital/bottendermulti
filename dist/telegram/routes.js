"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const telegram = (action) => {
    return router_1.route((context) => context.platform === 'telegram', action);
};
telegram.any = telegram;
function message(action) {
    return router_1.route((context) => context.platform === 'telegram' && context.event.isMessage, action);
}
telegram.message = message;
function editedMessage(action) {
    return router_1.route((context) => context.platform === 'telegram' && context.event.isEditedMessage, action);
}
telegram.editedMessage = editedMessage;
function channelPost(action) {
    return router_1.route((context) => context.platform === 'telegram' && context.event.isChannelPost, action);
}
telegram.channelPost = channelPost;
function editedChannelPost(action) {
    return router_1.route((context) => context.platform === 'telegram' && context.event.isEditedChannelPost, action);
}
telegram.editedChannelPost = editedChannelPost;
function inlineQuery(action) {
    return router_1.route((context) => context.platform === 'telegram' && context.event.isInlineQuery, action);
}
telegram.inlineQuery = inlineQuery;
function chosenInlineResult(action) {
    return router_1.route((context) => context.platform === 'telegram' && context.event.isChosenInlineResult, action);
}
telegram.chosenInlineResult = chosenInlineResult;
function callbackQuery(action) {
    return router_1.route((context) => context.platform === 'telegram' && context.event.isCallbackQuery, action);
}
telegram.callbackQuery = callbackQuery;
function shippingQuery(action) {
    return router_1.route((context) => context.platform === 'telegram' && context.event.isShippingQuery, action);
}
telegram.shippingQuery = shippingQuery;
function preCheckoutQuery(action) {
    return router_1.route((context) => context.platform === 'telegram' && context.event.isPreCheckoutQuery, action);
}
telegram.preCheckoutQuery = preCheckoutQuery;
function poll(action) {
    return router_1.route((context) => context.platform === 'telegram' && context.event.isPoll, action);
}
telegram.poll = poll;
exports.default = telegram;
//# sourceMappingURL=routes.js.map