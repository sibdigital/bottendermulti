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
const isBefore_1 = __importDefault(require("date-fns/isBefore"));
const subMinutes_1 = __importDefault(require("date-fns/subMinutes"));
const mongodb_1 = require("mongodb");
class MongoSessionStore {
    constructor(options, expiresIn) {
        if (typeof options === 'string') {
            this._url = options;
            this._collectionName = 'sessions';
        }
        else {
            this._url = options.url || 'mongodb://localhost:27017';
            this._collectionName = options.collectionName || 'sessions';
        }
        this._expiresIn = expiresIn || 0;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this._connection = (yield mongodb_1.MongoClient.connect(this._url, { useUnifiedTopology: true })).db();
            return this;
        });
    }
    read(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { id: key };
            try {
                const session = yield this._sessions.findOne(filter);
                if (session && this._expired(session)) {
                    return null;
                }
                return session;
            }
            catch (err) {
                console.error(err);
                return null;
            }
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._sessions.find().toArray();
        });
    }
    write(key, sess) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { id: key };
            sess.lastActivity = Date.now();
            try {
                yield this._sessions.updateOne(filter, { $set: sess }, {
                    upsert: true,
                });
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    destroy(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { id: key };
            try {
                yield this._sessions.remove(filter);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    _expired(sess) {
        if (!this._expiresIn) {
            return false;
        }
        return (sess.lastActivity !== undefined &&
            isBefore_1.default(sess.lastActivity, subMinutes_1.default(Date.now(), this._expiresIn)));
    }
    get _sessions() {
        if (this._connection == null) {
            throw new Error('MongoSessionStore: must call `init` before any operation.');
        }
        return this._connection.collection(this._collectionName);
    }
}
exports.default = MongoSessionStore;
//# sourceMappingURL=MongoSessionStore.js.map