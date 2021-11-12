"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_api_common_1 = require("messaging-api-common");
class MessengerEvent {
    constructor(rawEvent, options = {}) {
        this._rawEvent = rawEvent;
        this._isStandby = options.isStandby || false;
        this._pageId = options.pageId || null;
    }
    get rawEvent() {
        return this._rawEvent;
    }
    get isMessage() {
        return (!!this._rawEvent.message && typeof this._rawEvent.message === 'object');
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
    get hasAttachment() {
        return (this.isMessage &&
            !!this.message.attachments &&
            this.message.attachments.length > 0);
    }
    get attachments() {
        if (this.message && this.message.attachments) {
            return this.message.attachments;
        }
        return null;
    }
    get isImage() {
        return this.hasAttachment && this.attachments[0].type === 'image';
    }
    get image() {
        return this.isImage ? this.attachments[0].payload : null;
    }
    get isAudio() {
        return this.hasAttachment && this.attachments[0].type === 'audio';
    }
    get audio() {
        return this.isAudio ? this.attachments[0].payload : null;
    }
    get isVideo() {
        return this.hasAttachment && this.attachments[0].type === 'video';
    }
    get video() {
        return this.isVideo ? this.attachments[0].payload : null;
    }
    get isLocation() {
        return (this.hasAttachment && this.attachments[0].type === 'location');
    }
    get location() {
        return this.isLocation ? this.attachments[0].payload : null;
    }
    get isFile() {
        return this.hasAttachment && this.attachments[0].type === 'file';
    }
    get file() {
        return this.isFile ? this.attachments[0].payload : null;
    }
    get isFallback() {
        return (this.hasAttachment && this.attachments[0].type === 'fallback');
    }
    get fallback() {
        return this.isFallback ? this.attachments[0] : null;
    }
    get isSticker() {
        return (this.isMessage && typeof this.message.stickerId === 'number');
    }
    get sticker() {
        return this.isSticker ? this.message.stickerId : null;
    }
    get isLikeSticker() {
        return (this.isSticker &&
            (this.message.stickerId === 369239263222822 ||
                this.message.stickerId === 369239343222814 ||
                this.message.stickerId === 369239383222810));
    }
    get isQuickReply() {
        return (this.isMessage &&
            !!this.message.quickReply &&
            typeof this.message.quickReply === 'object');
    }
    get quickReply() {
        if (this.message && this.message.quickReply) {
            return this.message.quickReply;
        }
        return null;
    }
    get isEcho() {
        return this.isMessage && !!this.message.isEcho;
    }
    get isPostback() {
        return (!!this._rawEvent.postback && typeof this._rawEvent.postback === 'object');
    }
    get postback() {
        return this._rawEvent.postback || null;
    }
    get isGamePlay() {
        return (!!this._rawEvent.gamePlay && typeof this._rawEvent.gamePlay === 'object');
    }
    get gamePlay() {
        if (!this.isGamePlay) {
            return null;
        }
        const rawGamePlay = this._rawEvent.gamePlay;
        let payload;
        try {
            const parsed = JSON.parse(rawGamePlay.payload);
            payload =
                parsed && typeof parsed === 'object'
                    ? messaging_api_common_1.camelcaseKeysDeep(parsed)
                    : parsed;
        }
        catch (e) {
            payload = rawGamePlay.payload;
        }
        return Object.assign(Object.assign({}, rawGamePlay), { payload });
    }
    get isOptin() {
        return !!this._rawEvent.optin && typeof this._rawEvent.optin === 'object';
    }
    get optin() {
        return this._rawEvent.optin || null;
    }
    get isPayment() {
        return (!!this._rawEvent.payment && typeof this._rawEvent.payment === 'object');
    }
    get payment() {
        return this._rawEvent.payment || null;
    }
    get isCheckoutUpdate() {
        return (!!this._rawEvent.checkoutUpdate &&
            typeof this._rawEvent.checkoutUpdate === 'object');
    }
    get checkoutUpdate() {
        return this._rawEvent.checkoutUpdate || null;
    }
    get isPreCheckout() {
        return (!!this._rawEvent.preCheckout &&
            typeof this._rawEvent.preCheckout === 'object');
    }
    get preCheckout() {
        return this._rawEvent.preCheckout || null;
    }
    get isRead() {
        return !!this._rawEvent.read && typeof this._rawEvent.read === 'object';
    }
    get read() {
        return this.isRead ? this._rawEvent.read : null;
    }
    get isDelivery() {
        return (!!this._rawEvent.delivery && typeof this._rawEvent.delivery === 'object');
    }
    get delivery() {
        return this.isDelivery ? this._rawEvent.delivery : null;
    }
    get isPayload() {
        return ((!!this.postback && typeof this.postback.payload === 'string') ||
            (!!this.quickReply && typeof this.quickReply.payload === 'string'));
    }
    get payload() {
        if (!!this.postback && this.isPayload) {
            return this.postback.payload || null;
        }
        if (!!this.quickReply && this.isPayload) {
            return this.quickReply.payload || null;
        }
        return null;
    }
    get isPolicyEnforcement() {
        return (!!this._rawEvent['policy-enforcement'] &&
            typeof this._rawEvent['policy-enforcement'] === 'object');
    }
    get policyEnforcement() {
        return this._rawEvent['policy-enforcement'] || null;
    }
    get isAppRoles() {
        return (!!this._rawEvent.appRoles && typeof this._rawEvent.appRoles === 'object');
    }
    get appRoles() {
        return this._rawEvent.appRoles || null;
    }
    get isStandby() {
        return this._isStandby;
    }
    get isPassThreadControl() {
        return (!!this._rawEvent.passThreadControl &&
            typeof this._rawEvent.passThreadControl === 'object');
    }
    get passThreadControl() {
        return this._rawEvent.passThreadControl || null;
    }
    get isTakeThreadControl() {
        return (!!this._rawEvent.takeThreadControl &&
            typeof this._rawEvent.takeThreadControl === 'object');
    }
    get takeThreadControl() {
        return this._rawEvent.takeThreadControl || null;
    }
    get isRequestThreadControl() {
        return (!!this._rawEvent.requestThreadControl &&
            typeof this._rawEvent.requestThreadControl === 'object');
    }
    get isRequestThreadControlFromPageInbox() {
        return (!!this._rawEvent.requestThreadControl &&
            typeof this._rawEvent.requestThreadControl === 'object' &&
            this._rawEvent.requestThreadControl.requestedOwnerAppId ===
                263902037430900);
    }
    get requestThreadControl() {
        return this._rawEvent.requestThreadControl || null;
    }
    get isFromCustomerChatPlugin() {
        const isMessageFromCustomerChatPlugin = !!(this.isMessage &&
            !!this.message.tags &&
            this.message.tags.length !== 0 &&
            this.message.tags.some((tag) => tag.source === 'customer_chat_plugin'));
        const isReferralFromCustomerChatPlugin = !!(this.isReferral &&
            this.referral &&
            this.referral.source === 'CUSTOMER_CHAT_PLUGIN');
        return isMessageFromCustomerChatPlugin || isReferralFromCustomerChatPlugin;
    }
    get isReferral() {
        return !!(this._rawEvent.referral ||
            (this._rawEvent.postback && this._rawEvent.postback.referral));
    }
    get referral() {
        if (!this.isReferral) {
            return null;
        }
        return (this._rawEvent.referral ||
            (this._rawEvent.postback && this._rawEvent.postback.referral) ||
            null);
    }
    get ref() {
        if (!this.isReferral) {
            return null;
        }
        return this.referral && this.referral.ref;
    }
    get pageId() {
        return this._pageId || null;
    }
    get isBrandedCamera() {
        return (!!this._rawEvent.brandedCamera &&
            typeof this._rawEvent.brandedCamera === 'object');
    }
    get brandedCamera() {
        if (!this.isBrandedCamera) {
            return null;
        }
        return this._rawEvent.brandedCamera;
    }
    get isAccountLinking() {
        return (!!this._rawEvent.accountLinking &&
            typeof this._rawEvent.accountLinking === 'object');
    }
    get accountLinking() {
        if (!this.isAccountLinking) {
            return null;
        }
        return this._rawEvent.accountLinking;
    }
    get isReaction() {
        return (!!this._rawEvent.reaction && typeof this._rawEvent.reaction === 'object');
    }
    get reaction() {
        if (!this.isReaction) {
            return null;
        }
        return this._rawEvent.reaction;
    }
}
exports.default = MessengerEvent;
//# sourceMappingURL=MessengerEvent.js.map