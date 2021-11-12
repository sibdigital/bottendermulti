"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const isNumber_1 = __importDefault(require("lodash/isNumber"));
class RedisCacheStore {
    constructor(...args) {
        this._prefix = '';
        this._redis = new ioredis_1.default(...args);
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const val = yield this._redis.get(`${this._prefix}${key}`);
            if (val) {
                return this._unserialize(val);
            }
            return null;
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            let [cursor, keys] = yield this._redis.scan(0);
            while (cursor !== '0') {
                const [nextCursor, newkeys] = yield this._redis.scan(Number(cursor));
                cursor = nextCursor;
                keys = keys.concat(newkeys);
            }
            return this._redis.mget(...keys);
        });
    }
    put(key, value, minutes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (minutes) {
                yield this._redis.setex(`${this._prefix}${key}`, minutes * 60, this._serialize(value));
            }
            else {
                yield this._redis.set(`${this._prefix}${key}`, this._serialize(value));
            }
        });
    }
    forget(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._redis.del(`${this._prefix}${key}`);
        });
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._redis.flushdb();
        });
    }
    getRedis() {
        return this._redis;
    }
    getPrefix() {
        return this._prefix;
    }
    setPrefix(prefix) {
        this._prefix = prefix ? `${prefix}:` : '';
    }
    _serialize(value) {
        return isNumber_1.default(value) ? value : JSON.stringify(value);
    }
    _unserialize(value) {
        return isNumber_1.default(value) ? value : JSON.parse(value);
    }
}
exports.default = RedisCacheStore;
//# sourceMappingURL=RedisCacheStore.js.map