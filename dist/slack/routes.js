"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const slack = (action) => {
    return router_1.route((context) => context.platform === 'slack', action);
};
slack.any = slack;
function message(action) {
    return router_1.route((context) => context.platform === 'slack' && context.event.isMessage, action);
}
slack.message = message;
function event(eventType, action) {
    return router_1.route((context) => context.platform === 'slack' && context.event.rawEvent.type === eventType, action);
}
slack.event = event;
function command(commandText, action) {
    return router_1.route((context) => context.platform === 'slack' &&
        context.event.command &&
        context.event.command === commandText, action);
}
slack.command = command;
exports.default = slack;
//# sourceMappingURL=routes.js.map