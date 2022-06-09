"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let bottenderConfig;
const getBottenderConfig = (config) => {
    try {
        if (config) {
            bottenderConfig = config;
        }
        return bottenderConfig;
    }
    catch (err) {
        if (err.code && err.code === 'MODULE_NOT_FOUND') {
            return {};
        }
        throw err;
    }
};
exports.default = getBottenderConfig;
//# sourceMappingURL=getBottenderConfig.js.map