"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryCacheStore_1 = __importDefault(require("../cache/MemoryCacheStore"));
const CacheBasedSessionStore_1 = __importDefault(require("./CacheBasedSessionStore"));
function getMaxSize(arg) {
    if (typeof arg === 'number') {
        return arg;
    }
    if (arg && typeof arg === 'object') {
        return arg.maxSize;
    }
    return;
}
class MemorySessionStore extends CacheBasedSessionStore_1.default {
    constructor(arg, expiresIn) {
        const maxSize = getMaxSize(arg);
        const cache = new MemoryCacheStore_1.default(maxSize);
        super(cache, expiresIn);
    }
}
exports.default = MemorySessionStore;
//# sourceMappingURL=MemorySessionStore.js.map