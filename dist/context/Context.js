"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const debug_1 = __importDefault(require("debug"));
const warning_1 = __importDefault(require("warning"));
const debugContext = debug_1.default('bottender:context');
class Context {
    constructor({ client, event, session, initialState, requestContext, emitter, }) {
        this._isHandled = null;
        this._isSessionWritten = false;
        this._client = client;
        this._event = event;
        this._session = session || null;
        this._initialState = initialState || {};
        this._requestContext = requestContext || null;
        this._emitter = emitter || null;
        this._intent = null;
        debugContext('Context created with rawEvent:');
        debugContext(JSON.stringify(this._event.rawEvent, null, 2));
        if (this._session && !this._session._state) {
            const sess = this._session;
            sess._state = cloneDeep_1.default(this._initialState);
        }
        this.response = {
            status: 200,
            headers: {},
            body: null,
        };
    }
    get client() {
        return this._client;
    }
    get event() {
        return this._event;
    }
    get requestContext() {
        return this._requestContext;
    }
    get session() {
        return this._session;
    }
    get isHandled() {
        return this._isHandled;
    }
    get isSessionWritten() {
        return this._isSessionWritten;
    }
    set isSessionWritten(bool) {
        this._isSessionWritten = bool;
    }
    get state() {
        if (this._session) {
            return this._session._state;
        }
        warning_1.default(false, 'state: is not accessible in context without session. Falling back to an empty object.');
        return {};
    }
    setState(state) {
        if (this._session) {
            const sess = this._session;
            warning_1.default(!this._isSessionWritten, 'Calling `context.setState` after session has been written. Some changes to state will not be saved.\nDid you forget to await any async function?');
            sess._state = Object.assign(Object.assign({}, sess._state), state);
        }
        else {
            warning_1.default(false, 'setState: should not be called in context without session');
        }
    }
    resetState() {
        if (this._session) {
            const sess = this._session;
            warning_1.default(!this._isSessionWritten, 'Calling `context.resetState` after session has been written. Some changes to state will not be saved.\nDid you forget to await any async function?');
            sess._state = cloneDeep_1.default(this._initialState);
        }
        else {
            warning_1.default(false, 'resetState: should not be called in context without session');
        }
    }
    get intent() {
        return this._intent;
    }
    setIntent(intent) {
        this._intent = intent;
    }
    setAsHandled(handled = true) {
        this._isHandled = handled;
    }
    setAsNotHandled() {
        this.setAsHandled(false);
    }
    emitError(err) {
        if (this._emitter) {
            this._emitter.emit('error', err, this);
        }
    }
    handlerDidEnd() { }
}
exports.default = Context;
//# sourceMappingURL=Context.js.map