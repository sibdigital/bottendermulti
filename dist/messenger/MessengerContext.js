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
const invariant_1 = __importDefault(require("invariant"));
const delay_1 = __importDefault(require("delay"));
const warning_1 = __importDefault(require("warning"));
const messaging_api_messenger_1 = require("messaging-api-messenger");
const Context_1 = __importDefault(require("../context/Context"));
class MessengerContext extends Context_1.default {
    constructor({ appId, client, event, session, initialState, requestContext, customAccessToken, batchQueue, emitter, }) {
        super({ client, event, session, initialState, requestContext, emitter });
        this._personaId = null;
        this._customAccessToken = customAccessToken || null;
        this._batchQueue = batchQueue || null;
        this._appId = appId || null;
    }
    get platform() {
        return 'messenger';
    }
    get accessToken() {
        return this._customAccessToken || this._client.accessToken;
    }
    _callClientMethod(method, args) {
        if (this._batchQueue) {
            return this._batchQueue.push(messaging_api_messenger_1.MessengerBatch[method](...args));
        }
        return this._client[method](...args);
    }
    _getMethodOptions(options) {
        return Object.assign(Object.assign({}, (this._customAccessToken
            ? { accessToken: this._customAccessToken }
            : undefined)), options);
    }
    _getSenderActionMethodOptions(options) {
        return Object.assign(Object.assign({}, (this._personaId ? { personaId: this._personaId } : undefined)), this._getMethodOptions(options));
    }
    _getSendMethodOptions(options) {
        const messagingType = options && options.tag ? 'MESSAGE_TAG' : 'RESPONSE';
        return Object.assign(Object.assign({ messagingType }, (this._personaId ? { personaId: this._personaId } : undefined)), this._getMethodOptions(options));
    }
    usePersona(personaId) {
        this._personaId = personaId;
    }
    useAccessToken(accessToken) {
        this._customAccessToken = accessToken;
    }
    typing(milliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (milliseconds > 0) {
                yield this.typingOn();
                yield delay_1.default(milliseconds);
                yield this.typingOff();
            }
        });
    }
    sendText(text, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendText: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendText: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendText', [
                this._session.user.id,
                text,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    getUserProfile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getUserProfile: should not be called in context without session');
                return null;
            }
            return this._callClientMethod('getUserProfile', [
                this._session.user.id,
                this._getMethodOptions(options),
            ]);
        });
    }
    sendSenderAction(senderAction, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendSenderAction: should not be called in context without session');
                return;
            }
            return this._callClientMethod('sendSenderAction', [
                this._session.user.id,
                senderAction,
                this._getSenderActionMethodOptions(options),
            ]);
        });
    }
    typingOn(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'typingOn: should not be called in context without session');
                return;
            }
            return this._callClientMethod('typingOn', [
                this._session.user.id,
                this._getSenderActionMethodOptions(options),
            ]);
        });
    }
    typingOff(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'typingOff: should not be called in context without session');
                return;
            }
            return this._callClientMethod('typingOff', [
                this._session.user.id,
                this._getSenderActionMethodOptions(options),
            ]);
        });
    }
    markSeen(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'markSeen: should not be called in context without session');
                return;
            }
            return this._callClientMethod('markSeen', [
                this._session.user.id,
                this._getSenderActionMethodOptions(options),
            ]);
        });
    }
    passThreadControl(targetAppId, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'passThreadControl: should not be called in context without session');
                return;
            }
            return this._callClientMethod('passThreadControl', [
                this._session.user.id,
                targetAppId,
                metadata,
                this._getMethodOptions({}),
            ]);
        });
    }
    passThreadControlToPageInbox(metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'passThreadControlToPageInbox: should not be called in context without session');
                return;
            }
            return this._callClientMethod('passThreadControlToPageInbox', [
                this._session.user.id,
                metadata,
                this._getMethodOptions({}),
            ]);
        });
    }
    takeThreadControl(metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'takeThreadControl: should not be called in context without session');
                return;
            }
            return this._callClientMethod('takeThreadControl', [
                this._session.user.id,
                metadata,
                this._getMethodOptions({}),
            ]);
        });
    }
    requestThreadControl(metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'requestThreadControl: should not be called in context without session');
                return;
            }
            return this._callClientMethod('requestThreadControl', [
                this._session.user.id,
                metadata,
                this._getMethodOptions({}),
            ]);
        });
    }
    getThreadOwner() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getThreadOwner: should not be called in context without session');
                return;
            }
            return this._callClientMethod('getThreadOwner', [
                this._session.user.id,
                this._getMethodOptions({}),
            ]);
        });
    }
    isThreadOwner() {
        return __awaiter(this, void 0, void 0, function* () {
            invariant_1.default(this._appId, 'isThreadOwner: must provide appId to use this feature');
            const { appId } = yield this.getThreadOwner();
            return `${appId}` === `${this._appId}`;
        });
    }
    associateLabel(labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'associateLabel: should not be called in context without session');
                return;
            }
            return this._callClientMethod('associateLabel', [
                this._session.user.id,
                labelId,
                this._getMethodOptions({}),
            ]);
        });
    }
    dissociateLabel(labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'dissociateLabel: should not be called in context without session');
                return;
            }
            return this._callClientMethod('dissociateLabel', [
                this._session.user.id,
                labelId,
                this._getMethodOptions({}),
            ]);
        });
    }
    getAssociatedLabels() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'getAssociatedLabels: should not be called in context without session');
                return;
            }
            return this._callClientMethod('getAssociatedLabels', [
                this._session.user.id,
                this._getMethodOptions({}),
            ]);
        });
    }
    sendMessage(message, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendMessage: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, `sendMessage: calling Send APIs in \`message_reads\`(event.isRead), \`message_deliveries\`(event.isDelivery) or \`message_echoes\`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.`);
                return;
            }
            return this._callClientMethod('sendMessage', [
                this._session.user.id,
                message,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendAttachment(attachment, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendAttachment: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendAttachment: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendAttachment', [
                this._session.user.id,
                attachment,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendImage(image, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendImage: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendImage: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendImage', [
                this._session.user.id,
                image,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendAudio(audio, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendAudio: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendAudio: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendAudio', [
                this._session.user.id,
                audio,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendVideo(video, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendVideo: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendVideo: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendVideo', [
                this._session.user.id,
                video,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendFile(file, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendFile: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendFile: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendFile', [
                this._session.user.id,
                file,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendTemplate(payload, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendTemplate: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendTemplate', [
                this._session.user.id,
                payload,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendGenericTemplate(elements, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendGenericTemplate: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendGenericTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendGenericTemplate', [
                this._session.user.id,
                elements,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendButtonTemplate(text, buttons, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendButtonTemplate: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendButtonTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendButtonTemplate', [
                this._session.user.id,
                text,
                buttons,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendMediaTemplate(elements, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendMediaTemplate: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendMediaTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendMediaTemplate', [
                this._session.user.id,
                elements,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendReceiptTemplate(attrs, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendReceiptTemplate: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendReceiptTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendReceiptTemplate', [
                this._session.user.id,
                attrs,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendAirlineBoardingPassTemplate(attrs, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendAirlineBoardingPassTemplate: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendAirlineBoardingPassTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendAirlineBoardingPassTemplate', [
                this._session.user.id,
                attrs,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendAirlineCheckinTemplate(attrs, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendAirlineCheckinTemplate: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendAirlineCheckinTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendAirlineCheckinTemplate', [
                this._session.user.id,
                attrs,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendAirlineItineraryTemplate(attrs, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendAirlineItineraryTemplate: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendAirlineItineraryTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendAirlineItineraryTemplate', [
                this._session.user.id,
                attrs,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendAirlineUpdateTemplate(attrs, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendAirlineUpdateTemplate: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendAirlineUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendAirlineUpdateTemplate', [
                this._session.user.id,
                attrs,
                this._getSendMethodOptions(options),
            ]);
        });
    }
    sendOneTimeNotifReqTemplate(attrs, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._session) {
                warning_1.default(false, 'sendOneTimeNotifReqTemplate: should not be called in context without session');
                return;
            }
            if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
                warning_1.default(false, 'sendOneTimeNotifReqTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.');
                return;
            }
            return this._callClientMethod('sendOneTimeNotifReqTemplate', [
                this._session.user.id,
                attrs,
                this._getSendMethodOptions(options),
            ]);
        });
    }
}
exports.default = MessengerContext;
//# sourceMappingURL=MessengerContext.js.map