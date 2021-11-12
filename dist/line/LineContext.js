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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chunk_1 = __importDefault(require("lodash/chunk"));
const invariant_1 = __importDefault(require("invariant"));
const delay_1 = __importDefault(require("delay"));
const warning_1 = __importDefault(require("warning"));
const messaging_api_line_1 = require("messaging-api-line");
const Context_1 = __importDefault(require("../context/Context"));
class LineContext extends Context_1.default {
    constructor({ client, event, session, initialState, requestContext, customAccessToken, shouldBatch, sendMethod, emitter, }) {
        super({ client, event, session, initialState, requestContext, emitter });
        this._isReplied = false;
        this._replyMessages = [];
        this._pushMessages = [];
        this._customAccessToken = customAccessToken || null;
        this._shouldBatch = shouldBatch || false;
        this._sendMethod = sendMethod || 'reply';
    }
    get platform() {
        return 'line';
    }
    get accessToken() {
        return this._customAccessToken || this._client.accessToken;
    }
    useAccessToken(accessToken) {
        this._customAccessToken = accessToken;
    }
    get isReplied() {
        return this._isReplied;
    }
    handlerDidEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._shouldBatch) {
                this._shouldBatch = false;
                if (this._replyMessages.length > 0) {
                    const messageChunks = chunk_1.default(this._replyMessages, 5);
                    warning_1.default(messageChunks.length === 1, 'one replyToken can only be used to reply 5 messages');
                    if (this._event.replyToken) {
                        yield this._client.reply(this._event.replyToken, messageChunks[0], Object.assign({}, (this._customAccessToken
                            ? { accessToken: this._customAccessToken }
                            : undefined)));
                    }
                }
                if (this._pushMessages.length > 0) {
                    if (this._session) {
                        const sessionTypeId = this._session[this._session.type].id;
                        const messageChunks = chunk_1.default(this._pushMessages, 5);
                        for (let i = 0; i < messageChunks.length; i++) {
                            const messages = messageChunks[i];
                            yield this._client.push(sessionTypeId, messages, Object.assign({}, (this._customAccessToken
                                ? { accessToken: this._customAccessToken }
                                : undefined)));
                        }
                    }
                    else {
                        warning_1.default(false, 'push: should not be called in context without session');
                    }
                }
            }
        });
    }
    typing(milliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (milliseconds > 0) {
                yield delay_1.default(milliseconds);
            }
        });
    }
    getMessageContent() {
        if (!(this._event.isImage || this._event.isVideo || this._event.isAudio)) {
            warning_1.default(false, 'getMessageContent: should only be called with image, video or audio message');
            return;
        }
        const messageId = this._event.message.id;
        return this._client.getMessageContent(messageId, Object.assign({}, (this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined)));
    }
    leave() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'leave: should not be called in context without session');
                return;
            }
            switch (this._session.type) {
                case 'room':
                    return this._client.leaveRoom(this._session.room.id, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
                case 'group':
                    return this._client.leaveGroup(this._session.group.id, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
                default:
                    warning_1.default(false, 'leave: should not be called in context which is not room or group session');
            }
        });
    }
    getUserProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getUserProfile: should not be called in context without session');
                return null;
            }
            if (!this._session.user) {
                warning_1.default(false, 'getUserProfile: should not be called in context without user in session');
                return null;
            }
            switch (this._session.type) {
                case 'room':
                    return this._client.getRoomMemberProfile(this._session.room.id, this._session.user.id, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
                case 'group':
                    return this._client.getGroupMemberProfile(this._session.group.id, this._session.user.id, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
                case 'user':
                default:
                    return this._client.getUserProfile(this._session.user.id, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
            }
        });
    }
    getMemberProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getMemberProfile: should not be called in context without session');
                return null;
            }
            switch (this._session.type) {
                case 'room':
                    return this._client.getRoomMemberProfile(this._session.room.id, userId, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
                case 'group':
                    return this._client.getGroupMemberProfile(this._session.group.id, userId, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
                default:
                    warning_1.default(false, 'getMemberProfile: should not be called in context which is not room or group session');
                    return null;
            }
        });
    }
    getMemberIds(start) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getMemberIds: should not be called in context without session');
                return null;
            }
            switch (this._session.type) {
                case 'room':
                    return this._client.getRoomMemberIds(this._session.room.id, start, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
                case 'group':
                    return this._client.getGroupMemberIds(this._session.group.id, start, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
                default:
                    warning_1.default(false, 'getMemberIds: should not be called in context which is not room or group session');
                    return null;
            }
        });
    }
    getAllMemberIds() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getAllMemberIds: should not be called in context without session');
                return null;
            }
            switch (this._session.type) {
                case 'room':
                    return this._client.getAllRoomMemberIds(this._session.room.id, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
                case 'group':
                    return this._client.getAllGroupMemberIds(this._session.group.id, Object.assign({}, (this._customAccessToken
                        ? { accessToken: this._customAccessToken }
                        : undefined)));
                default:
                    warning_1.default(false, 'getAllMemberIds: should not be called in context which is not room or group session');
                    return null;
            }
        });
    }
    getLinkedRichMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._session && this._session.user) {
                return this._client.getLinkedRichMenu(this._session.user.id, Object.assign({}, (this._customAccessToken
                    ? { accessToken: this._customAccessToken }
                    : undefined)));
            }
            warning_1.default(false, 'getLinkedRichMenu: should not be called in context without session user');
        });
    }
    linkRichMenu(richMenuId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._session && this._session.user) {
                return this._client.linkRichMenu(this._session.user.id, richMenuId, Object.assign({}, (this._customAccessToken
                    ? { accessToken: this._customAccessToken }
                    : undefined)));
            }
            warning_1.default(false, 'linkRichMenu: should not be called in context without session user');
        });
    }
    unlinkRichMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._session && this._session.user) {
                return this._client.unlinkRichMenu(this._session.user.id, Object.assign({}, (this._customAccessToken
                    ? { accessToken: this._customAccessToken }
                    : undefined)));
            }
            warning_1.default(false, 'unlinkRichMenu: should not be called in context without session user');
        });
    }
    issueLinkToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._session && this._session.user) {
                return this._client.issueLinkToken(this._session.user.id, Object.assign({}, (this._customAccessToken
                    ? { accessToken: this._customAccessToken }
                    : undefined)));
            }
            warning_1.default(false, 'issueLinkToken: should not be called in context without session user');
        });
    }
    reply(messages, options = {}) {
        invariant_1.default(!this._isReplied, 'Can not reply event multiple times');
        if (this._shouldBatch) {
            this._replyMessages.push(...messages);
            return;
        }
        this._isReplied = true;
        return this._client.reply(this._event.replyToken, messages, Object.assign(Object.assign({}, (this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined)), options));
    }
    replyText(text, options) {
        return this.reply([messaging_api_line_1.Line.createText(text, options)], options);
    }
    replyImage(image, options) {
        return this.reply([messaging_api_line_1.Line.createImage(image, options)], options);
    }
    replyVideo(video, options) {
        return this.reply([messaging_api_line_1.Line.createVideo(video, options)], options);
    }
    replyAudio(audio, options) {
        return this.reply([messaging_api_line_1.Line.createAudio(audio, options)], options);
    }
    replyLocation(location, options) {
        return this.reply([messaging_api_line_1.Line.createLocation(location, options)], options);
    }
    replySticker(sticker, options) {
        return this.reply([messaging_api_line_1.Line.createSticker(sticker, options)], options);
    }
    replyImagemap(altText, imagemap, options) {
        return this.reply([messaging_api_line_1.Line.createImagemap(altText, imagemap, options)], options);
    }
    replyFlex(altText, flex, options) {
        return this.reply([messaging_api_line_1.Line.createFlex(altText, flex, options)], options);
    }
    replyTemplate(altText, template, options) {
        return this.reply([messaging_api_line_1.Line.createTemplate(altText, template, options)], options);
    }
    replyButtonTemplate(altText, buttonTemplate, options) {
        return this.reply([messaging_api_line_1.Line.createButtonTemplate(altText, buttonTemplate, options)], options);
    }
    replyButtonsTemplate(altText, buttonTemplate, options) {
        return this.replyButtonTemplate(altText, buttonTemplate, options);
    }
    replyConfirmTemplate(altText, confirmTemplate, options) {
        return this.reply([messaging_api_line_1.Line.createConfirmTemplate(altText, confirmTemplate, options)], options);
    }
    replyCarouselTemplate(altText, columns, _a = {}) {
        var { imageAspectRatio, imageSize } = _a, options = __rest(_a, ["imageAspectRatio", "imageSize"]);
        return this.reply([
            messaging_api_line_1.Line.createCarouselTemplate(altText, columns, Object.assign({ imageAspectRatio,
                imageSize }, options)),
        ], options);
    }
    replyImageCarouselTemplate(altText, columns, options) {
        return this.reply([messaging_api_line_1.Line.createImageCarouselTemplate(altText, columns, options)], options);
    }
    push(messages, options = {}) {
        if (!this._session) {
            warning_1.default(false, `push: should not be called in context without session`);
            return;
        }
        if (this._shouldBatch) {
            this._pushMessages.push(...messages);
            return;
        }
        const sessionType = this._session.type;
        return this._client.push(this._session[sessionType].id, messages, Object.assign(Object.assign({}, (this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined)), options));
    }
    pushText(text, options) {
        return this.push([messaging_api_line_1.Line.createText(text, options)], options);
    }
    pushImage(image, options) {
        return this.push([messaging_api_line_1.Line.createImage(image, options)], options);
    }
    pushVideo(video, options) {
        return this.push([messaging_api_line_1.Line.createVideo(video, options)], options);
    }
    pushAudio(audio, options) {
        return this.push([messaging_api_line_1.Line.createAudio(audio, options)], options);
    }
    pushLocation(location, options) {
        return this.push([messaging_api_line_1.Line.createLocation(location, options)], options);
    }
    pushSticker(sticker, options) {
        return this.push([messaging_api_line_1.Line.createSticker(sticker, options)], options);
    }
    pushImagemap(altText, imagemap, options) {
        return this.push([messaging_api_line_1.Line.createImagemap(altText, imagemap, options)], options);
    }
    pushFlex(altText, flex, options) {
        return this.push([messaging_api_line_1.Line.createFlex(altText, flex, options)], options);
    }
    pushTemplate(altText, template, options) {
        return this.push([messaging_api_line_1.Line.createTemplate(altText, template, options)], options);
    }
    pushButtonTemplate(altText, buttonTemplate, options) {
        return this.push([messaging_api_line_1.Line.createButtonTemplate(altText, buttonTemplate, options)], options);
    }
    pushButtonsTemplate(altText, buttonTemplate, options) {
        return this.pushButtonTemplate(altText, buttonTemplate, options);
    }
    pushConfirmTemplate(altText, confirmTemplate, options) {
        return this.push([messaging_api_line_1.Line.createConfirmTemplate(altText, confirmTemplate, options)], options);
    }
    pushCarouselTemplate(altText, columns, _a = {}) {
        var { imageAspectRatio, imageSize } = _a, options = __rest(_a, ["imageAspectRatio", "imageSize"]);
        return this.push([
            messaging_api_line_1.Line.createCarouselTemplate(altText, columns, Object.assign({ imageAspectRatio,
                imageSize }, options)),
        ], options);
    }
    pushImageCarouselTemplate(altText, columns, options) {
        return this.push([messaging_api_line_1.Line.createImageCarouselTemplate(altText, columns, options)], options);
    }
    send(messages, options = {}) {
        if (this._sendMethod === 'push') {
            return this.push(messages, options);
        }
        return this.reply(messages, options);
    }
    sendText(text, options) {
        return this.send([messaging_api_line_1.Line.createText(text, options)], options);
    }
    sendImage(image, options) {
        return this.send([messaging_api_line_1.Line.createImage(image, options)], options);
    }
    sendVideo(video, options) {
        return this.send([messaging_api_line_1.Line.createVideo(video, options)], options);
    }
    sendAudio(audio, options) {
        return this.send([messaging_api_line_1.Line.createAudio(audio, options)], options);
    }
    sendLocation(location, options) {
        return this.send([messaging_api_line_1.Line.createLocation(location, options)], options);
    }
    sendSticker(sticker, options) {
        return this.send([messaging_api_line_1.Line.createSticker(sticker, options)], options);
    }
    sendImagemap(altText, imagemap, options) {
        return this.send([messaging_api_line_1.Line.createImagemap(altText, imagemap, options)], options);
    }
    sendFlex(altText, flex, options) {
        return this.send([messaging_api_line_1.Line.createFlex(altText, flex, options)], options);
    }
    sendTemplate(altText, template, options) {
        return this.send([messaging_api_line_1.Line.createTemplate(altText, template, options)], options);
    }
    sendButtonTemplate(altText, buttonTemplate, options) {
        return this.send([messaging_api_line_1.Line.createButtonTemplate(altText, buttonTemplate, options)], options);
    }
    sendButtonsTemplate(altText, buttonTemplate, options) {
        return this.sendButtonTemplate(altText, buttonTemplate, options);
    }
    sendConfirmTemplate(altText, confirmTemplate, options) {
        return this.send([messaging_api_line_1.Line.createConfirmTemplate(altText, confirmTemplate, options)], options);
    }
    sendCarouselTemplate(altText, columns, _a = {}) {
        var { imageAspectRatio, imageSize } = _a, options = __rest(_a, ["imageAspectRatio", "imageSize"]);
        return this.send([
            messaging_api_line_1.Line.createCarouselTemplate(altText, columns, Object.assign({ imageAspectRatio,
                imageSize }, options)),
        ], options);
    }
    sendImageCarouselTemplate(altText, columns, options) {
        return this.send([messaging_api_line_1.Line.createImageCarouselTemplate(altText, columns, options)], options);
    }
}
exports.default = LineContext;
//# sourceMappingURL=LineContext.js.map