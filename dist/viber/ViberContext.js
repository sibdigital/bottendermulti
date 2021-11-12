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
const delay_1 = __importDefault(require("delay"));
const warning_1 = __importDefault(require("warning"));
const Context_1 = __importDefault(require("../context/Context"));
class ViberContext extends Context_1.default {
    get platform() {
        return 'viber';
    }
    typing(milliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (milliseconds > 0) {
                yield delay_1.default(milliseconds);
            }
        });
    }
    sendText(text, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendText: should not be called in context without session');
                return;
            }
            return this._client.sendText(this._session.user.id, text, options);
        });
    }
    getUserDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getUserDetails: should not be called in context without session');
                return null;
            }
            return this._client.getUserDetails(this._session.user.id);
        });
    }
    getOnlineStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getOnlineStatus: should not be called in context without session');
                return null;
            }
            const status = yield this._client.getOnlineStatus([this._session.user.id]);
            return status[0];
        });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, `sendMessage: should not be called in context without session`);
                return;
            }
            return this._client.sendMessage(this._session.user.id, message);
        });
    }
    sendPicture(picture, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, `sendPicture: should not be called in context without session`);
                return;
            }
            return this._client.sendPicture(this._session.user.id, picture, options);
        });
    }
    sendVideo(video, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, `sendVideo: should not be called in context without session`);
                return;
            }
            return this._client.sendVideo(this._session.user.id, video, options);
        });
    }
    sendFile(file, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, `sendFile: should not be called in context without session`);
                return;
            }
            return this._client.sendFile(this._session.user.id, file, options);
        });
    }
    sendContact(contact, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, `sendContact: should not be called in context without session`);
                return;
            }
            return this._client.sendContact(this._session.user.id, contact, options);
        });
    }
    sendLocation(location, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, `sendLocation: should not be called in context without session`);
                return;
            }
            return this._client.sendLocation(this._session.user.id, location, options);
        });
    }
    sendURL(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, `sendURL: should not be called in context without session`);
                return;
            }
            return this._client.sendURL(this._session.user.id, url, options);
        });
    }
    sendSticker(stickerId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, `sendSticker: should not be called in context without session`);
                return;
            }
            return this._client.sendSticker(this._session.user.id, stickerId, options);
        });
    }
    sendCarouselContent(richMedia, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, `sendCarouselContent: should not be called in context without session`);
                return;
            }
            return this._client.sendCarouselContent(this._session.user.id, richMedia, options);
        });
    }
}
exports.default = ViberContext;
//# sourceMappingURL=ViberContext.js.map