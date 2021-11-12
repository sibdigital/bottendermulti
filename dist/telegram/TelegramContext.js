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
class TelegramContext extends Context_1.default {
    get platform() {
        return 'telegram';
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
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendText: should not be called in context without chatId');
                return null;
            }
            return this._client.sendMessage(chatId, text, options);
        });
    }
    sendMessage(text, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sendText(text, options);
        });
    }
    _getChatId() {
        if (this._event.isMessage) {
            return this._event.message.chat.id;
        }
        if (this._event.isEditedMessage) {
            return this._event.editedMessage.chat.id;
        }
        if (this._event.isChannelPost) {
            return this._event.channelPost.chat.id;
        }
        if (this._event.isEditedChannelPost) {
            return this._event.editedChannelPost.chat.id;
        }
        if (this._event.isInlineQuery) {
            return this._event.inlineQuery.from.id;
        }
        if (this._event.isChosenInlineResult) {
            return this._event.chosenInlineResult.from.id;
        }
        if (this._event.isCallbackQuery &&
            this._event.callbackQuery.message) {
            return this._event.callbackQuery.message.chat.id;
        }
        if (this._event.isShippingQuery) {
            return this._event.shippingQuery.from.id;
        }
        if (this._event.isPreCheckoutQuery) {
            return this._event.preCheckoutQuery.from.id;
        }
        if (this._session) {
            return this._session.user.id;
        }
        return null;
    }
    answerShippingQuery(ok, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._event.isShippingQuery) {
                warning_1.default(false, 'answerShippingQuery: should only be called to answer ShippingQuery event');
                return null;
            }
            const shippingQueryId = this._event.shippingQuery.id;
            return this._client.answerShippingQuery(shippingQueryId, ok, options);
        });
    }
    answerPreCheckoutQuery(ok, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._event.isPreCheckoutQuery) {
                warning_1.default(false, 'answerPreCheckoutQuery: should only be called to answer PreCheckoutQuery event');
                return null;
            }
            const preCheckoutQueryId = this._event.preCheckoutQuery.id;
            return this._client.answerPreCheckoutQuery(preCheckoutQueryId, ok, options);
        });
    }
    answerInlineQuery(results, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._event.isInlineQuery) {
                warning_1.default(false, 'answerInlineQuery: should only be called to answer InlineQuery event');
                return null;
            }
            const inlineQueryId = this._event.inlineQuery.id;
            return this._client.answerInlineQuery(inlineQueryId, results, options);
        });
    }
    getUserProfilePhotos(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getUserProfilePhotos: should not be called in context without session');
                return null;
            }
            return this._client.getUserProfilePhotos(this.session.user.id, options);
        });
    }
    getChat() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getChat: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'getChat: should not be called in context without chatId');
                return null;
            }
            return this._client.getChat(chatId);
        });
    }
    getChatAdministrators() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getChatAdministrators: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'getChatAdministrators: should not be called in context without chatId');
                return null;
            }
            return this._client.getChatAdministrators(chatId);
        });
    }
    getChatMembersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getChatMembersCount: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'getChatMembersCount: should not be called in context without chatId');
                return null;
            }
            return this._client.getChatMembersCount(chatId);
        });
    }
    getChatMember(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getChatMember: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'getChatMember: should not be called in context without chatId');
                return null;
            }
            return this._client.getChatMember(chatId, userId);
        });
    }
    getGameHighScores(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getGameHighScores: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'getGameHighScores: should not be called in context without chatId');
                return null;
            }
            return this._client.getGameHighScores(chatId, options);
        });
    }
    editMessageText(messageId, text, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'editMessageText: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'editMessageText: should not be called in context without chatId');
                return null;
            }
            return this._client.editMessageText(text, Object.assign({ chatId,
                messageId }, options));
        });
    }
    editMessageCaption(messageId, caption, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'editMessageCaption: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'editMessageCaption: should not be called in context without chatId');
                return null;
            }
            return this._client.editMessageCaption(caption, Object.assign({ chatId,
                messageId }, options));
        });
    }
    editMessageMedia(messageId, media, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'editMessageMedia: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'editMessageMedia: should not be called in context without chatId');
                return null;
            }
            return this._client.editMessageMedia(media, Object.assign({ chatId,
                messageId }, options));
        });
    }
    editMessageReplyMarkup(messageId, replyMarkup, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'editMessageReplyMarkup: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'editMessageReplyMarkup: should not be called in context without chatId');
                return null;
            }
            return this._client.editMessageReplyMarkup(replyMarkup, Object.assign({ chatId,
                messageId }, options));
        });
    }
    deleteMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'deleteMessage: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'deleteMessage: should not be called in context without chatId');
                return null;
            }
            return this._client.deleteMessage(chatId, messageId);
        });
    }
    editMessageLiveLocation(messageId, location, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'editMessageLiveLocation: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'editMessageLiveLocation: should not be called in context without chatId');
                return null;
            }
            return this._client.editMessageLiveLocation(location, Object.assign({ chatId,
                messageId }, options));
        });
    }
    stopMessageLiveLocation(messageId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'stopMessageLiveLocation: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'stopMessageLiveLocation: should not be called in context without chatId');
                return null;
            }
            return this._client.stopMessageLiveLocation(Object.assign({ chatId,
                messageId }, options));
        });
    }
    forwardMessageFrom(fromChatId, messageId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'forwardMessageFrom: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'forwardMessageFrom: should not be called in context without chatId');
                return null;
            }
            return this._client.forwardMessage(chatId, fromChatId, messageId, options);
        });
    }
    forwardMessageTo(toChatId, messageId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'forwardMessageTo: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'forwardMessageTo: should not be called in context without chatId');
                return null;
            }
            return this._client.forwardMessage(toChatId, chatId, messageId, options);
        });
    }
    sendPhoto(photo, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendPhoto: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendPhoto: should not be called in context without chatId');
                return null;
            }
            return this._client.sendPhoto(chatId, photo, options);
        });
    }
    sendAudio(audio, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendAudio: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendAudio: should not be called in context without chatId');
                return null;
            }
            return this._client.sendAudio(chatId, audio, options);
        });
    }
    sendDocument(document, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendDocument: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendDocument: should not be called in context without chatId');
                return null;
            }
            return this._client.sendDocument(chatId, document, options);
        });
    }
    sendSticker(sticker, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendSticker: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendSticker: should not be called in context without chatId');
                return null;
            }
            return this._client.sendSticker(chatId, sticker, options);
        });
    }
    sendVideo(video, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendVideo: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendVideo: should not be called in context without chatId');
                return null;
            }
            return this._client.sendVideo(chatId, video, options);
        });
    }
    sendAnimation(animation, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendAnimation: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendAnimation: should not be called in context without chatId');
                return null;
            }
            return this._client.sendAnimation(chatId, animation, options);
        });
    }
    sendVoice(voice, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendVoice: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendVoice: should not be called in context without chatId');
                return null;
            }
            return this._client.sendVoice(chatId, voice, options);
        });
    }
    sendVideoNote(videoNote, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendVideoNote: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendVideoNote: should not be called in context without chatId');
                return null;
            }
            return this._client.sendVideoNote(chatId, videoNote, options);
        });
    }
    sendMediaGroup(media, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendMediaGroup: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendMediaGroup: should not be called in context without chatId');
                return null;
            }
            return this._client.sendMediaGroup(chatId, media, options);
        });
    }
    sendLocation({ latitude, longitude }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendLocation: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendLocation: should not be called in context without chatId');
                return null;
            }
            return this._client.sendLocation(chatId, { latitude, longitude }, options);
        });
    }
    sendVenue(venue, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendVenue: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendVenue: should not be called in context without chatId');
                return null;
            }
            return this._client.sendVenue(chatId, venue, options);
        });
    }
    sendContact(requiredOptions, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendContact: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendContact: should not be called in context without chatId');
                return null;
            }
            return this._client.sendContact(chatId, requiredOptions, options);
        });
    }
    sendPoll(question, options, otherOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendPoll: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendPoll: should not be called in context without chatId');
                return null;
            }
            return this._client.sendPoll(chatId, question, options, otherOptions);
        });
    }
    sendChatAction(action) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendChatAction: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendChatAction: should not be called in context without chatId');
                return null;
            }
            return this._client.sendChatAction(chatId, action);
        });
    }
    kickChatMember(userId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'kickChatMember: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'kickChatMember: should not be called in context without chatId');
                return null;
            }
            return this._client.kickChatMember(chatId, userId, options);
        });
    }
    unbanChatMember(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'unbanChatMember: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'unbanChatMember: should not be called in context without chatId');
                return null;
            }
            return this._client.unbanChatMember(chatId, userId);
        });
    }
    restrictChatMember(userId, permissions, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'restrictChatMember: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'restrictChatMember: should not be called in context without chatId');
                return null;
            }
            return this._client.restrictChatMember(chatId, userId, permissions, options);
        });
    }
    promoteChatMember(userId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'promoteChatMember: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'promoteChatMember: should not be called in context without chatId');
                return null;
            }
            return this._client.promoteChatMember(chatId, userId, options);
        });
    }
    exportChatInviteLink() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'exportChatInviteLink: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'exportChatInviteLink: should not be called in context without chatId');
                return null;
            }
            return this._client.exportChatInviteLink(chatId);
        });
    }
    deleteChatPhoto() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'deleteChatPhoto: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'deleteChatPhoto: should not be called in context without chatId');
                return null;
            }
            return this._client.deleteChatPhoto(chatId);
        });
    }
    setChatTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'setChatTitle: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'setChatTitle: should not be called in context without chatId');
                return null;
            }
            return this._client.setChatTitle(chatId, title);
        });
    }
    setChatDescription(description) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'setChatDescription: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'setChatDescription: should not be called in context without chatId');
                return null;
            }
            return this._client.setChatDescription(chatId, description);
        });
    }
    setChatStickerSet(stickerSetName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'setChatStickerSet: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'setChatStickerSet: should not be called in context without chatId');
                return null;
            }
            return this._client.setChatStickerSet(chatId, stickerSetName);
        });
    }
    deleteChatStickerSet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'deleteChatStickerSet: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'deleteChatStickerSet: should not be called in context without chatId');
                return null;
            }
            return this._client.deleteChatStickerSet(chatId);
        });
    }
    pinChatMessage(messageId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'pinChatMessage: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'pinChatMessage: should not be called in context without chatId');
                return null;
            }
            return this._client.pinChatMessage(chatId, messageId, options);
        });
    }
    unpinChatMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'unpinChatMessage: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'unpinChatMessage: should not be called in context without chatId');
                return null;
            }
            return this._client.unpinChatMessage(chatId);
        });
    }
    leaveChat() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'leaveChat: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'leaveChat: should not be called in context without chatId');
                return null;
            }
            return this._client.leaveChat(chatId);
        });
    }
    sendInvoice(product, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendInvoice: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendInvoice: should not be called in context without chatId');
                return null;
            }
            return this._client.sendInvoice(chatId, product, options);
        });
    }
    sendGame(gameShortName, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendGame: should not be called in context without session');
                return null;
            }
            const chatId = this._getChatId();
            if (chatId === null) {
                warning_1.default(false, 'sendGame: should not be called in context without chatId');
                return null;
            }
            return this._client.sendGame(chatId, gameShortName, options);
        });
    }
    setGameScore(userId, score, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'setGameScore: should not be called in context without session');
                return null;
            }
            return this._client.setGameScore(userId, score, options);
        });
    }
}
exports.default = TelegramContext;
//# sourceMappingURL=TelegramContext.js.map