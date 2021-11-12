"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleEvent {
    constructor(rawEvent) {
        this._rawEvent = rawEvent;
    }
    get rawEvent() {
        return this._rawEvent;
    }
    get isMessage() {
        return 'message' in this._rawEvent;
    }
    get message() {
        return this.isMessage ? this._rawEvent.message : null;
    }
    get isText() {
        return this.isMessage;
    }
    get text() {
        if (this.message) {
            return this.message.text;
        }
        return null;
    }
    get isPayload() {
        return !!this._rawEvent.payload;
    }
    get payload() {
        if (this.isPayload) {
            return this._rawEvent.payload;
        }
        return null;
    }
}
exports.default = ConsoleEvent;
//# sourceMappingURL=ConsoleEvent.js.map