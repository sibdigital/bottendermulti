"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TelegramEvent {
    constructor(rawEvent) {
        this._rawEvent = rawEvent;
    }
    get rawEvent() {
        return this._rawEvent;
    }
    get isMessage() {
        return !!this._rawEvent.message;
    }
    get message() {
        return this._rawEvent.message || null;
    }
    get isText() {
        return this.isMessage && typeof this.message.text === 'string';
    }
    get text() {
        if (this.isText) {
            return this.message.text;
        }
        return null;
    }
    get isReplyToMessage() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return (!!message.replyToMessage && typeof message.replyToMessage === 'object');
    }
    get replyToMessage() {
        if (this.isReplyToMessage) {
            return this.message.replyToMessage;
        }
        return null;
    }
    get isAudio() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.audio && typeof message.audio === 'object';
    }
    get audio() {
        if (this.isAudio) {
            return this.message.audio;
        }
        return null;
    }
    get isDocument() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.document && typeof message.document === 'object';
    }
    get document() {
        if (this.isDocument) {
            return this.message.document;
        }
        return null;
    }
    get isGame() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.game && typeof message.game === 'object';
    }
    get game() {
        if (this.isGame) {
            return this.message.game;
        }
        return null;
    }
    get isPhoto() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.photo && message.photo.length > 0;
    }
    get photo() {
        if (this.isPhoto) {
            return this.message.photo;
        }
        return null;
    }
    get isSticker() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.sticker && typeof message.sticker === 'object';
    }
    get sticker() {
        if (this.isSticker) {
            return this.message.sticker;
        }
        return null;
    }
    get isVideo() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.video && typeof message.video === 'object';
    }
    get video() {
        if (this.isVideo) {
            return this.message.video;
        }
        return null;
    }
    get isVoice() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.voice && typeof message.voice === 'object';
    }
    get voice() {
        if (this.isVoice) {
            return this.message.voice;
        }
        return null;
    }
    get isVideoNote() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.videoNote && typeof message.videoNote === 'object';
    }
    get videoNote() {
        if (this.isVideoNote) {
            return this.message.videoNote;
        }
        return null;
    }
    get isContact() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.contact && typeof message.contact === 'object';
    }
    get contact() {
        if (this.isContact) {
            return this.message.contact;
        }
        return null;
    }
    get isLocation() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.location && typeof message.location === 'object';
    }
    get location() {
        if (this.isLocation) {
            return this.message.location;
        }
        return null;
    }
    get isVenue() {
        if (!this.isMessage)
            return false;
        const message = this.message;
        return !!message.venue && typeof message.venue === 'object';
    }
    get venue() {
        if (this.isVenue) {
            return this.message.venue;
        }
        return null;
    }
    get isEditedMessage() {
        return !!this.editedMessage && typeof this.editedMessage === 'object';
    }
    get editedMessage() {
        return this._rawEvent.editedMessage || null;
    }
    get isChannelPost() {
        return !!this.channelPost && typeof this.channelPost === 'object';
    }
    get channelPost() {
        return this._rawEvent.channelPost || null;
    }
    get isEditedChannelPost() {
        return (!!this.editedChannelPost && typeof this.editedChannelPost === 'object');
    }
    get editedChannelPost() {
        return this._rawEvent.editedChannelPost || null;
    }
    get isInlineQuery() {
        return !!this.inlineQuery && typeof this.inlineQuery === 'object';
    }
    get inlineQuery() {
        return this._rawEvent.inlineQuery || null;
    }
    get isChosenInlineResult() {
        return (!!this.chosenInlineResult && typeof this.chosenInlineResult === 'object');
    }
    get chosenInlineResult() {
        return this._rawEvent.chosenInlineResult || null;
    }
    get isCallbackQuery() {
        return !!this.callbackQuery && typeof this.callbackQuery === 'object';
    }
    get callbackQuery() {
        return this._rawEvent.callbackQuery || null;
    }
    get isPayload() {
        return this.isCallbackQuery;
    }
    get payload() {
        if (this.isPayload) {
            return this.callbackQuery.data;
        }
        return null;
    }
    get isShippingQuery() {
        return !!this.shippingQuery && typeof this.shippingQuery === 'object';
    }
    get shippingQuery() {
        return this._rawEvent.shippingQuery || null;
    }
    get isPreCheckoutQuery() {
        return !!this.preCheckoutQuery && typeof this.preCheckoutQuery === 'object';
    }
    get preCheckoutQuery() {
        return this._rawEvent.preCheckoutQuery || null;
    }
    get isPoll() {
        return !!this.poll && typeof this.poll === 'object';
    }
    get poll() {
        return this._rawEvent.poll || null;
    }
}
exports.default = TelegramEvent;
//# sourceMappingURL=TelegramEvent.js.map