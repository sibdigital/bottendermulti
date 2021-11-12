"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const figures_1 = __importDefault(require("figures"));
function log(msg, color = 'blue', icon = 'pointer') {
    console.log(`${chalk_1.default[color](figures_1.default[icon])} ${msg}`);
}
exports.log = log;
function print(msg) {
    log(msg, 'green');
}
exports.print = print;
function warn(msg) {
    log(msg, 'yellow', 'warning');
}
exports.warn = warn;
function error(msg) {
    log(msg, 'red', 'cross');
}
exports.error = error;
function bold(msg) {
    return chalk_1.default.bold(msg);
}
exports.bold = bold;
//# sourceMappingURL=log.js.map