"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RedisCacheStore_1 = __importDefault(require("../cache/RedisCacheStore"));
const CacheBasedSessionStore_1 = __importDefault(require("./CacheBasedSessionStore"));
class RedisSessionStore extends CacheBasedSessionStore_1.default {
    constructor(arg, expiresIn) {
        const cache = new RedisCacheStore_1.default(arg);
        super(cache, expiresIn);
    }
}
exports.default = RedisSessionStore;
//# sourceMappingURL=RedisSessionStore.js.map