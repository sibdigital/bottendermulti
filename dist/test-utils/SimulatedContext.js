"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = __importDefault(require("../context/Context"));
class SimulatedContext extends Context_1.default {
    constructor(options) {
        super(options);
        this._platform = options.platform;
    }
    get platform() {
        return this._platform;
    }
    sendText() { }
}
exports.default = SimulatedContext;
//# sourceMappingURL=SimulatedContext.js.map