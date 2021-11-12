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
class SlackContext extends Context_1.default {
    constructor({ client, event, session, initialState, requestContext, emitter, }) {
        super({ client, event, session, initialState, requestContext, emitter });
        this.chat = {
            postMessage: this._postMessage.bind(this),
            postEphemeral: this._postEphemeral.bind(this),
            update: this._updateMessage.bind(this),
            delete: this._deleteMessage.bind(this),
            meMessage: this._meMessage.bind(this),
            getPermalink: this._getPermalink.bind(this),
            scheduleMessage: this._scheduleMessage.bind(this),
            deleteScheduledMessage: this._deleteScheduledMessage.bind(this),
            scheduledMessages: {
                list: this._getScheduledMessages.bind(this),
            },
        };
        this.views = {
            open: this._openView.bind(this),
            publish: this._publishView.bind(this),
            push: this._pushView.bind(this),
            update: this._updateView.bind(this),
        };
    }
    get platform() {
        return 'slack';
    }
    typing(milliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (milliseconds > 0) {
                yield delay_1.default(milliseconds);
            }
        });
    }
    _getChannelIdFromSession(callerMethodName = '') {
        if (this._session &&
            typeof this._session.channel === 'object' &&
            this._session.channel &&
            this._session.channel.id &&
            typeof this._session.channel.id === 'string') {
            return this._session.channel.id;
        }
        if (callerMethodName) {
            warning_1.default(false, `${callerMethodName}: should not be called in context without session`);
        }
        return null;
    }
    postMessage(message, options) {
        warning_1.default(false, '`postMessage` is deprecated. Use `chat.postMessage` instead.');
        return this.chat.postMessage(Object.assign(Object.assign({}, (typeof message === 'string' ? { text: message } : message)), options));
    }
    _postMessage(options) {
        const channel = this._getChannelIdFromSession('chat.postMessage');
        if (!channel) {
            return Promise.resolve();
        }
        return this._client.chat.postMessage(Object.assign({ threadTs: this._event.rawEvent.threadTs, channel }, options));
    }
    postEphemeral(message, options) {
        warning_1.default(false, '`postEphemeral` is deprecated. Use `chat.postEphemeral` instead.');
        return this.chat.postEphemeral(Object.assign(Object.assign({}, (typeof message === 'string' ? { text: message } : message)), options));
    }
    _postEphemeral(options) {
        const channel = this._getChannelIdFromSession('chat.postEphemeral');
        if (!channel) {
            return Promise.resolve();
        }
        return this._client.chat.postEphemeral(Object.assign({ channel, user: this._session.user.id }, options));
    }
    sendText(text) {
        return this._postMessage({ text });
    }
    _updateMessage(options) {
        return this._client.chat.update(options);
    }
    _deleteMessage(options) {
        const channel = this._getChannelIdFromSession('chat.delete');
        if (!channel) {
            return Promise.resolve();
        }
        return this._client.chat.delete(Object.assign({ channel }, options));
    }
    _meMessage(options) {
        const channel = this._getChannelIdFromSession('chat.meMessage');
        if (!channel) {
            return Promise.resolve();
        }
        return this._client.chat.meMessage(Object.assign({ channel }, options));
    }
    _getPermalink(options) {
        const channel = this._getChannelIdFromSession('chat.getPermalink');
        if (!channel) {
            return Promise.resolve();
        }
        return this._client.chat.getPermalink(Object.assign({ channel }, options));
    }
    _scheduleMessage(options) {
        const channel = this._getChannelIdFromSession('chat.scheduleMessage');
        if (!channel) {
            return Promise.resolve();
        }
        return this._client.chat.scheduleMessage(Object.assign({ channel }, options));
    }
    _deleteScheduledMessage(options) {
        const channel = this._getChannelIdFromSession('chat.deleteScheduledMessage');
        if (!channel) {
            return Promise.resolve();
        }
        return this._client.chat.deleteScheduledMessage(Object.assign({ channel }, options));
    }
    _getScheduledMessages(options) {
        return this._client.chat.scheduledMessages.list(options);
    }
    _openView(options) {
        return this._client.views.open(Object.assign(Object.assign({}, options), { view: Object.assign(Object.assign({}, options.view), { privateMetadata: JSON.stringify({
                    original: options.view.privateMetadata,
                    channelId: this._event.rawEvent.channel.id,
                }) }) }));
    }
    _publishView(options) {
        return this._client.views.publish(options);
    }
    _updateView(options) {
        return this._client.views.update(options);
    }
    _pushView(options) {
        return this._client.views.push(options);
    }
}
exports.default = SlackContext;
//# sourceMappingURL=SlackContext.js.map