"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const line = (action) => {
    return router_1.route((context) => context.platform === 'line', action);
};
line.any = line;
function message(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isMessage, action);
}
line.message = message;
function follow(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isFollow, action);
}
line.follow = follow;
function unfollow(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isUnfollow, action);
}
line.unfollow = unfollow;
function join(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isJoin, action);
}
line.join = join;
function leave(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isLeave, action);
}
line.leave = leave;
function memberJoined(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isMemberJoined, action);
}
line.memberJoined = memberJoined;
function memberLeft(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isMemberLeft, action);
}
line.memberLeft = memberLeft;
function postback(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isPostback, action);
}
line.postback = postback;
function beacon(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isBeacon, action);
}
line.beacon = beacon;
function beaconEnter(action) {
    return router_1.route((context) => context.platform === 'line' &&
        context.event.isBeacon &&
        context.event.beacon.type === 'enter', action);
}
beacon.enter = beaconEnter;
function beaconBanner(action) {
    return router_1.route((context) => context.platform === 'line' &&
        context.event.isBeacon &&
        context.event.beacon.type === 'banner', action);
}
beacon.banner = beaconBanner;
function beaconStay(action) {
    return router_1.route((context) => context.platform === 'line' &&
        context.event.isBeacon &&
        context.event.beacon.type === 'stay', action);
}
beacon.stay = beaconStay;
function accountLink(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isAccountLink, action);
}
line.accountLink = accountLink;
function things(action) {
    return router_1.route((context) => context.platform === 'line' && context.event.isThings, action);
}
line.things = things;
function thingsLink(action) {
    return router_1.route((context) => context.platform === 'line' &&
        context.event.isThings &&
        context.event.things.type === 'link', action);
}
things.link = thingsLink;
function thingsUnlink(action) {
    return router_1.route((context) => context.platform === 'line' &&
        context.event.isThings &&
        context.event.things.type === 'unlink', action);
}
things.unlink = thingsUnlink;
function thingsScenarioResult(action) {
    return router_1.route((context) => context.platform === 'line' &&
        context.event.isThings &&
        context.event.things.type === 'scenarioResult', action);
}
things.scenarioResult = thingsScenarioResult;
exports.default = line;
//# sourceMappingURL=routes.js.map