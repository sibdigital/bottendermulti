"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const warning = require("warning");
class LineEvent {
    constructor(rawEvent, options = {}) {
        this._rawEvent = rawEvent;
        this._destination = options.destination;
    }
    get rawEvent() {
        return this._rawEvent;
    }
    get destination() {
        return this._destination || null;
    }
    get replyToken() {
        return 'replyToken' in this._rawEvent ? this._rawEvent.replyToken : null;
    }
    get source() {
        return this._rawEvent.source || null;
    }
    get isMessage() {
        return this._rawEvent.type === 'message';
    }
    get message() {
        return this._rawEvent.message || null;
    }
    get isText() {
        return this.isMessage && this.message.type === 'text';
    }
    get text() {
        if (this.isText) {
            return this.message.text;
        }
        return null;
    }
    get isImage() {
        return this.isMessage && this.message.type === 'image';
    }
    get image() {
        if (this.isImage) {
            return this.message;
        }
        return null;
    }
    get isVideo() {
        return this.isMessage && this.message.type === 'video';
    }
    get video() {
        if (this.isVideo) {
            return this.message;
        }
        return null;
    }
    get isAudio() {
        return this.isMessage && this.message.type === 'audio';
    }
    get audio() {
        if (this.isAudio) {
            return this.message;
        }
        return null;
    }
    get isLocation() {
        return this.isMessage && this.message.type === 'location';
    }
    get location() {
        if (this.isLocation) {
            return this.message;
        }
        return null;
    }
    get isSticker() {
        return this.isMessage && this.message.type === 'sticker';
    }
    get sticker() {
        if (this.isSticker) {
            return this.message;
        }
        return null;
    }
    get isFollow() {
        return this._rawEvent.type === 'follow';
    }
    get follow() {
        if (this.isFollow) {
            return this.source;
        }
        return null;
    }
    get isUnfollow() {
        return this._rawEvent.type === 'unfollow';
    }
    get unfollow() {
        if (this.isUnfollow) {
            return this.source;
        }
        return null;
    }
    get isJoin() {
        return this._rawEvent.type === 'join';
    }
    get join() {
        if (this.isJoin) {
            return this.source;
        }
        return null;
    }
    get isLeave() {
        return this._rawEvent.type === 'leave';
    }
    get leave() {
        if (this.isLeave) {
            return this.source;
        }
        return null;
    }
    get isPostback() {
        return this._rawEvent.type === 'postback';
    }
    get postback() {
        return this._rawEvent.postback || null;
    }
    get isPayload() {
        return this.isPostback;
    }
    get payload() {
        if (this.isPayload) {
            return this.postback.data;
        }
        return null;
    }
    get date() {
        if (this.postback &&
            this.postback.params &&
            'date' in this.postback.params) {
            return this.postback.params.date;
        }
        return null;
    }
    get time() {
        if (this.postback &&
            this.postback.params &&
            'time' in this.postback.params) {
            return this.postback.params.time;
        }
        return null;
    }
    get datetime() {
        if (this.postback &&
            this.postback.params &&
            'datetime' in this.postback.params) {
            return this.postback.params.datetime;
        }
        return null;
    }
    get isBeacon() {
        return this._rawEvent.type === 'beacon';
    }
    get beacon() {
        return this._rawEvent.beacon || null;
    }
    get isAccountLink() {
        return this._rawEvent.type === 'accountLink';
    }
    get accountLink() {
        return this._rawEvent.link || null;
    }
    get isMemberJoined() {
        return this._rawEvent.type === 'memberJoined';
    }
    get memberJoined() {
        return this._rawEvent.joined || null;
    }
    get isMemberLeft() {
        return this._rawEvent.type === 'memberLeft';
    }
    get memberLeft() {
        return this._rawEvent.left || null;
    }
    get isThings() {
        return this._rawEvent.type === 'things';
    }
    get isThingsLink() {
        return (this._rawEvent.type === 'things' &&
            typeof this._rawEvent.things !== 'undefined' &&
            this._rawEvent.things.type === 'link');
    }
    get isThingsUnlink() {
        return (this._rawEvent.type === 'things' &&
            typeof this._rawEvent.things !== 'undefined' &&
            this._rawEvent.things.type === 'unlink');
    }
    get isThingsScenarioResult() {
        return (this._rawEvent.type === 'things' &&
            typeof this._rawEvent.things !== 'undefined' &&
            this._rawEvent.things.type === 'scenarioResult');
    }
    get isDeviceLink() {
        warning(false, '`event.isDeviceLink` is deprecated. Use `event.isThingsLink` instead.');
        return this.isThingsLink;
    }
    get isDeviceUnlink() {
        warning(false, '`event.isDeviceUnlink` is deprecated. Use `event.isThingsUnlink` instead.');
        return this.isThingsUnlink;
    }
    get things() {
        return this._rawEvent.things || null;
    }
}
exports.default = LineEvent;
//# sourceMappingURL=LineEvent.js.map