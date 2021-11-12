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
const os_1 = __importDefault(require("os"));
const jfs_1 = __importDefault(require("jfs"));
const isBefore_1 = __importDefault(require("date-fns/isBefore"));
const subMinutes_1 = __importDefault(require("date-fns/subMinutes"));
function getDirname(arg) {
    if (typeof arg === 'string') {
        return arg;
    }
    if (arg && typeof arg === 'object') {
        return arg.dirname;
    }
}
class FileSessionStore {
    constructor(arg, expiresIn) {
        this._expiresIn = expiresIn || 0;
        const dirname = getDirname(arg) || '.sessions';
        const jfs = new jfs_1.default(dirname);
        this._jfs = jfs;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return this;
        });
    }
    read(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const safeKey = os_1.default.platform() === 'win32' ? key.replace(':', '@') : key;
            try {
                const session = yield new Promise((resolve, reject) => {
                    this._jfs.get(safeKey, (err, obj) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(obj);
                        }
                    });
                });
                if (session && this._expired(session)) {
                    return null;
                }
                return session;
            }
            catch (err) {
                return null;
            }
        });
    }
    all() {
        return new Promise((resolve, reject) => {
            this._jfs.all((err, objs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(objs);
                }
            });
        });
    }
    write(key, sess) {
        return __awaiter(this, void 0, void 0, function* () {
            const safeKey = os_1.default.platform() === 'win32' ? key.replace(':', '@') : key;
            sess.lastActivity = Date.now();
            yield new Promise((resolve, reject) => {
                this._jfs.save(safeKey, sess, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    destroy(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const safeKey = os_1.default.platform() === 'win32' ? key.replace(':', '@') : key;
            return new Promise((resolve, reject) => {
                this._jfs.delete(safeKey, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    getJFS() {
        return this._jfs;
    }
    _expired(sess) {
        if (!this._expiresIn) {
            return false;
        }
        return (sess.lastActivity !== undefined &&
            isBefore_1.default(sess.lastActivity, subMinutes_1.default(Date.now(), this._expiresIn)));
    }
}
exports.default = FileSessionStore;
//# sourceMappingURL=FileSessionStore.js.map