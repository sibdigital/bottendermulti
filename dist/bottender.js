"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./server/Server"));
function bottender(options) {
    if (options.dev) {
        const DevServer = require('./server/DevServer').default;
        return new DevServer(options);
    }
    return new Server_1.default(options);
}
exports.default = bottender;
//# sourceMappingURL=bottender.js.map