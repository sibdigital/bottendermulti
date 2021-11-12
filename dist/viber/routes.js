"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const viber = (action) => {
    return router_1.route((context) => context.platform === 'viber', action);
};
viber.any = viber;
function message(action) {
    return router_1.route((context) => context.platform === 'viber' && context.event.isMessage, action);
}
viber.message = message;
function subscribed(action) {
    return router_1.route((context) => context.platform === 'viber' && context.event.isSubscribed, action);
}
viber.subscribed = subscribed;
function unsubscribed(action) {
    return router_1.route((context) => context.platform === 'viber' && context.event.isUnsubscribed, action);
}
viber.unsubscribed = unsubscribed;
function conversationStarted(action) {
    return router_1.route((context) => context.platform === 'viber' && context.event.isConversationStarted, action);
}
viber.conversationStarted = conversationStarted;
function delivered(action) {
    return router_1.route((context) => context.platform === 'viber' && context.event.delivered, action);
}
viber.delivered = delivered;
function seen(action) {
    return router_1.route((context) => context.platform === 'viber' && context.event.seen, action);
}
viber.seen = seen;
function failed(action) {
    return router_1.route((context) => context.platform === 'viber' && context.event.failed, action);
}
viber.failed = failed;
exports.default = viber;
//# sourceMappingURL=routes.js.map