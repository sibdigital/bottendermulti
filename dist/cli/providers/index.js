"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const line_1 = __importDefault(require("./line"));
const messenger_1 = __importDefault(require("./messenger"));
const sh_1 = __importDefault(require("./sh"));
const telegram_1 = __importDefault(require("./telegram"));
const viber_1 = __importDefault(require("./viber"));
exports.default = {
    sh: sh_1.default,
    messenger: messenger_1.default,
    telegram: telegram_1.default,
    line: line_1.default,
    viber: viber_1.default,
};
//# sourceMappingURL=index.js.map