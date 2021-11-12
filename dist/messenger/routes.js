"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const messenger = (action) => {
    return router_1.route((context) => context.platform === 'messenger', action);
};
messenger.any = messenger;
function message(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isMessage, action);
}
messenger.message = message;
function accountLinking(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isAccountLinking, action);
}
messenger.accountLinking = accountLinking;
function accountLinkingLinked(action) {
    return router_1.route((context) => context.platform === 'messenger' &&
        context.event.isAccountLinking &&
        context.event.accountLinking.status === 'linked', action);
}
accountLinking.linked = accountLinkingLinked;
function accountLinkingUnlinked(action) {
    return router_1.route((context) => context.platform === 'messenger' &&
        context.event.isAccountLinking &&
        context.event.accountLinking.status === 'unlinked', action);
}
accountLinking.unlinked = accountLinkingUnlinked;
function checkoutUpdate(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isCheckoutUpdate, action);
}
messenger.checkoutUpdate = checkoutUpdate;
function delivery(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isDelivery, action);
}
messenger.delivery = delivery;
function echo(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isEcho, action);
}
messenger.echo = echo;
function gamePlay(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isGamePlay, action);
}
messenger.gamePlay = gamePlay;
function passThreadControl(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isPassThreadControl, action);
}
messenger.passThreadControl = passThreadControl;
function takeThreadControl(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isTakeThreadControl, action);
}
messenger.takeThreadControl = takeThreadControl;
function requestThreadControl(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isRequestThreadControl, action);
}
messenger.requestThreadControl = requestThreadControl;
function appRoles(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isAppRoles, action);
}
messenger.appRoles = appRoles;
function optin(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isOptin, action);
}
messenger.optin = optin;
function payment(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isPayment, action);
}
messenger.payment = payment;
function policyEnforcement(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isPolicyEnforcement, action);
}
messenger.policyEnforcement = policyEnforcement;
function postback(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isPostback, action);
}
messenger.postback = postback;
function preCheckout(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isPreCheckout, action);
}
messenger.preCheckout = preCheckout;
function read(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isRead, action);
}
messenger.read = read;
function referral(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isReferral, action);
}
messenger.referral = referral;
function standby(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isStandby, action);
}
messenger.standby = standby;
function reaction(action) {
    return router_1.route((context) => context.platform === 'messenger' && context.event.isReaction, action);
}
messenger.reaction = reaction;
function reactionReact(action) {
    return router_1.route((context) => context.platform === 'messenger' &&
        context.event.isReaction &&
        context.event.reaction.action === 'react', action);
}
reaction.react = reactionReact;
function reactionUnreact(action) {
    return router_1.route((context) => context.platform === 'messenger' &&
        context.event.isReaction &&
        context.event.reaction.action === 'unreact', action);
}
reaction.unreact = reactionUnreact;
exports.default = messenger;
//# sourceMappingURL=routes.js.map