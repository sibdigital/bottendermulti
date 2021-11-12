"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arg_1 = __importDefault(require("arg"));
const argCommon_1 = __importDefault(require("./argCommon"));
const getArgs = (argv, argsOptions, argOptions) => arg_1.default(Object.assign(Object.assign({}, argCommon_1.default()), argsOptions), Object.assign(Object.assign({}, argOptions), { argv }));
exports.default = getArgs;
//# sourceMappingURL=getArgs.js.map