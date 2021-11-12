"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Channel;
(function (Channel) {
    Channel["Messenger"] = "messenger";
    Channel["Line"] = "line";
    Channel["Slack"] = "slack";
    Channel["Telegram"] = "telegram";
    Channel["Viber"] = "viber";
    Channel["Whatsapp"] = "whatsapp";
})(Channel = exports.Channel || (exports.Channel = {}));
var SessionDriver;
(function (SessionDriver) {
    SessionDriver["Memory"] = "memory";
    SessionDriver["File"] = "file";
    SessionDriver["Redis"] = "redis";
    SessionDriver["Mongo"] = "mongo";
})(SessionDriver = exports.SessionDriver || (exports.SessionDriver = {}));
//# sourceMappingURL=types.js.map