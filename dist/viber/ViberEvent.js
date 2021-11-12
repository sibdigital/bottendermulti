"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ViberEvent {
    constructor(rawEvent) {
        this._rawEvent = rawEvent;
    }
    get rawEvent() {
        return this._rawEvent;
    }
    get isMessage() {
        return this._rawEvent.event === 'message';
    }
    get message() {
        if (this.isMessage) {
            return this._rawEvent.message;
        }
        return null;
    }
    get isText() {
        return this.isMessage && this.message.type === 'text';
    }
    get text() {
        if (this.isMessage) {
            return this.message.text || null;
        }
        return null;
    }
    get isPicture() {
        return this.isMessage && this.message.type === 'picture';
    }
    get picture() {
        if (this.isPicture) {
            return this.message.media || null;
        }
        return null;
    }
    get isVideo() {
        return this.isMessage && this.message.type === 'video';
    }
    get video() {
        if (this.isVideo) {
            return this.message.media || null;
        }
        return null;
    }
    get isFile() {
        return (this.isMessage && this.message.type === 'file');
    }
    get file() {
        if (this.isFile) {
            return this.message.media || null;
        }
        return null;
    }
    get isSticker() {
        return this.isMessage && this.message.type === 'sticker';
    }
    get sticker() {
        if (this.isSticker) {
            return this.message.stickerId || null;
        }
        return null;
    }
    get isContact() {
        return this.isMessage && this.message.type === 'contact';
    }
    get contact() {
        if (this.isContact) {
            return this.message.contact || null;
        }
        return null;
    }
    get isURL() {
        return this.isMessage && this.message.type === 'url';
    }
    get url() {
        if (this.isURL) {
            return this.message.media || null;
        }
        return null;
    }
    get isLocation() {
        return this.isMessage && this.message.type === 'location';
    }
    get location() {
        if (this.isLocation) {
            return this.message.location || null;
        }
        return null;
    }
    get isSubscribed() {
        return this._rawEvent.event === 'subscribed';
    }
    get subscribed() {
        if (this.isSubscribed) {
            return this._rawEvent;
        }
        return null;
    }
    get isUnsubscribed() {
        return this._rawEvent.event === 'unsubscribed';
    }
    get unsubscribed() {
        if (this.isUnsubscribed) {
            return this._rawEvent;
        }
        return null;
    }
    get isConversationStarted() {
        return this._rawEvent.event === 'conversation_started';
    }
    get conversationStarted() {
        if (this.isConversationStarted) {
            return this._rawEvent;
        }
        return null;
    }
    get isDelivered() {
        return this._rawEvent.event === 'delivered';
    }
    get delivered() {
        if (this.isDelivered) {
            return this._rawEvent;
        }
        return null;
    }
    get isSeen() {
        return this._rawEvent.event === 'seen';
    }
    get seen() {
        if (this.isSeen) {
            return this._rawEvent;
        }
        return null;
    }
    get isFailed() {
        return this._rawEvent.event === 'failed';
    }
    get failed() {
        if (this.isFailed) {
            return this._rawEvent;
        }
        return null;
    }
}
exports.default = ViberEvent;
//# sourceMappingURL=ViberEvent.js.map