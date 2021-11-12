"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getArgs_1 = __importDefault(require("./getArgs"));
const getSubArgs = (argv, argsOptions, argOptions = { permissive: true }) => {
    const { _ } = argv, rest = __rest(argv, ["_"]);
    return Object.assign(Object.assign({}, getArgs_1.default(_, argsOptions, argOptions)), rest);
};
exports.default = getSubArgs;
//# sourceMappingURL=getSubArgs.js.map