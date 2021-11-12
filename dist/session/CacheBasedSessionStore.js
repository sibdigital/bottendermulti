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
Object.defineProperty(exports, "__esModule", { value: true });
class CacheBasedSessionStore {
    constructor(cache, expiresIn) {
        this._cache = cache;
        this._expiresIn = expiresIn || 0;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return this;
        });
    }
    read(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cache.get(key);
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cache.all();
        });
    }
    write(key, sess) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cache.put(key, sess, this._expiresIn);
        });
    }
    destroy(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cache.forget(key);
        });
    }
}
exports.default = CacheBasedSessionStore;
//# sourceMappingURL=CacheBasedSessionStore.js.map