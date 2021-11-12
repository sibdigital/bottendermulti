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
const lru_cache_1 = __importDefault(require("lru-cache"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
class MemoryCacheStore {
    constructor(max) {
        this._lru = new lru_cache_1.default({ max });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const _value = this._lru.get(key);
            const value = typeof _value === 'object' ? cloneDeep_1.default(_value) : _value;
            return value || null;
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._lru.values();
        });
    }
    put(key, value, minutes) {
        return __awaiter(this, void 0, void 0, function* () {
            const val = value && typeof value === 'object' ? cloneDeep_1.default(value) : value;
            if (minutes) {
                this._lru.set(key, val, minutes * 60 * 1000);
            }
            else {
                this._lru.set(key, val);
            }
        });
    }
    forget(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this._lru.del(key);
        });
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            this._lru.reset();
        });
    }
    getPrefix() {
        return '';
    }
}
exports.default = MemoryCacheStore;
//# sourceMappingURL=MemoryCacheStore.js.map