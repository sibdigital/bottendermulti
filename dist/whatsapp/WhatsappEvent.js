"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WhatsappEvent {
    constructor(rawEvent) {
        this._rawEvent = rawEvent;
    }
    get rawEvent() {
        return this._rawEvent;
    }
    get isMessage() {
        return this._rawEvent.smsStatus === 'received';
    }
    get message() {
        return this.isMessage ? this._rawEvent : null;
    }
    get isText() {
        return (this._rawEvent.smsStatus === 'received' && this._rawEvent.numMedia === '0');
    }
    get text() {
        return this._rawEvent.body || null;
    }
    get isMedia() {
        return (this._rawEvent.smsStatus === 'received' && this._rawEvent.numMedia === '1');
    }
    get media() {
        if (!this.isMedia)
            return null;
        const rawEvent = this._rawEvent;
        return {
            contentType: rawEvent.mediaContentType0,
            url: rawEvent.mediaUrl0,
        };
    }
    get isReceived() {
        return this._rawEvent.smsStatus === 'received';
    }
    get received() {
        return this.isReceived ? this._rawEvent : null;
    }
    get isSent() {
        return this._rawEvent.smsStatus === 'sent';
    }
    get sent() {
        return this.isSent ? this._rawEvent : null;
    }
    get isDelivered() {
        return this._rawEvent.smsStatus === 'delivered';
    }
    get delivered() {
        return this.isDelivered ? this._rawEvent : null;
    }
    get isRead() {
        return this._rawEvent.smsStatus === 'read';
    }
    get read() {
        return this.isRead ? this._rawEvent : null;
    }
}
exports.default = WhatsappEvent;
//# sourceMappingURL=WhatsappEvent.js.map