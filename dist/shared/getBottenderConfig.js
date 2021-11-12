"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getBottenderConfig = () => {
    try {
        return require(path_1.default.resolve('bottender.config.js'));
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