"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const whatsapp = (action) => {
    return router_1.route((context) => context.platform === 'whatsapp', action);
};
whatsapp.any = whatsapp;
function message(action) {
    return router_1.route((context) => context.platform === 'whatsapp' && context.event.isMessage, action);
}
whatsapp.message = message;
function media(action) {
    return router_1.route((context) => context.platform === 'whatsapp' && context.event.isMedia, action);
}
whatsapp.media = media;
function received(action) {
    return router_1.route((context) => context.platform === 'whatsapp' && context.event.isReceived, action);
}
whatsapp.received = received;
function sent(action) {
    return router_1.route((context) => context.platform === 'whatsapp' && context.event.isSent, action);
}
whatsapp.sent = sent;
function delivered(action) {
    return router_1.route((context) => context.platform === 'whatsapp' && context.event.isDelivered, action);
}
whatsapp.delivered = delivered;
function read(action) {
    return router_1.route((context) => context.platform === 'whatsapp' && context.event.isRead, action);
}
whatsapp.read = read;
exports.default = whatsapp;
//# sourceMappingURL=routes.js.map