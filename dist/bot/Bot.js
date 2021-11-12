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
const events_1 = require("events");
const debug_1 = __importDefault(require("debug"));
const invariant_1 = __importDefault(require("invariant"));
const p_map_1 = __importDefault(require("p-map"));
const messaging_api_common_1 = require("messaging-api-common");
const CacheBasedSessionStore_1 = __importDefault(require("../session/CacheBasedSessionStore"));
const MemoryCacheStore_1 = __importDefault(require("../cache/MemoryCacheStore"));
const debugRequest = debug_1.default('bottender:request');
const debugResponse = debug_1.default('bottender:response');
const debugSessionRead = debug_1.default('bottender:session:read');
const debugSessionWrite = debug_1.default('bottender:session:write');
const debugAction = debug_1.default('bottender:action');
const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;
function createMemorySessionStore() {
    const cache = new MemoryCacheStore_1.default(500);
    return new CacheBasedSessionStore_1.default(cache, MINUTES_IN_ONE_YEAR);
}
function run(action) {
    return function Run(context, props = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let nextDialog = action;
            invariant_1.default(typeof nextDialog === 'function', 'Invalid entry action. You may have forgotten to export your entry action in your `index.js` or `src/index.js`.');
            debugAction(`Current Action: ${nextDialog.name || 'Anonymous'}`);
            nextDialog = yield nextDialog(context, props);
            while (typeof nextDialog === 'function') {
                debugAction(`Current Action: ${nextDialog.name || 'Anonymous'}`);
                nextDialog = yield nextDialog(context, {});
            }
            return nextDialog;
        });
    };
}
exports.run = run;
class Bot {
    constructor({ connector, sessionStore = createMemorySessionStore(), sync = false, }) {
        this._initialState = {};
        this._plugins = [];
        this._sessions = sessionStore;
        this._initialized = false;
        this._connector = connector;
        this._handler = null;
        this._errorHandler = null;
        this._sync = sync;
        this._emitter = new events_1.EventEmitter();
    }
    get connector() {
        return this._connector;
    }
    get sessions() {
        return this._sessions;
    }
    get handler() {
        return this._handler;
    }
    get emitter() {
        return this._emitter;
    }
    onEvent(handler) {
        invariant_1.default(handler, 'onEvent: Can not pass `undefined`, `null` or any falsy value as handler');
        this._handler = 'build' in handler ? handler.build() : handler;
        return this;
    }
    onError(handler) {
        invariant_1.default(handler, 'onError: Can not pass `undefined`, `null` or any falsy value as error handler');
        this._errorHandler = 'build' in handler ? handler.build() : handler;
        return this;
    }
    setInitialState(initialState) {
        this._initialState = initialState;
        return this;
    }
    use(plugin) {
        this._plugins.push(plugin);
        return this;
    }
    initSessionStore() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._initialized) {
                yield this._sessions.init();
                this._initialized = true;
            }
        });
    }
    createRequestHandler() {
        if (this._handler == null) {
            throw new Error('Bot: Missing event handler function. You should assign it using onEvent(...)');
        }
        if (!this._emitter.listenerCount('error')) {
            this._emitter.on('error', console.error);
        }
        return (inputBody, requestContext) => __awaiter(this, void 0, void 0, function* () {
            if (!inputBody) {
                throw new Error('Bot.createRequestHandler: Missing argument.');
            }
            debugRequest('Incoming request body:');
            debugRequest(JSON.stringify(inputBody, null, 2));
            yield this.initSessionStore();
            const body = messaging_api_common_1.camelcaseKeysDeep(inputBody);
            const events = this._connector.mapRequestToEvents(body);
            const contexts = yield p_map_1.default(events, (event) => __awaiter(this, void 0, void 0, function* () {
                const { platform } = this._connector;
                const sessionKey = this._connector.getUniqueSessionKey(events.length === 1 ? body : event, requestContext);
                let sessionId;
                let session;
                if (sessionKey) {
                    sessionId = `${platform}:${sessionKey}`;
                    session =
                        (yield this._sessions.read(sessionId)) ||
                            Object.create(null);
                    debugSessionRead(`Read session: ${sessionId}`);
                    debugSessionRead(JSON.stringify(session, null, 2));
                    Object.defineProperty(session, 'id', {
                        configurable: false,
                        enumerable: true,
                        writable: false,
                        value: session.id || sessionId,
                    });
                    if (!session.platform)
                        session.platform = platform;
                    Object.defineProperty(session, 'platform', {
                        configurable: false,
                        enumerable: true,
                        writable: false,
                        value: session.platform,
                    });
                    yield this._connector.updateSession(session, events.length === 1 ? body : event);
                }
                return this._connector.createContext({
                    event,
                    session,
                    initialState: this._initialState,
                    requestContext,
                    emitter: this._emitter,
                });
            }), {
                concurrency: 5,
            });
            yield Promise.all(contexts.map((context) => __awaiter(this, void 0, void 0, function* () { return Promise.all(this._plugins.map(ext => ext(context))); })));
            if (this._handler == null) {
                throw new Error('Bot: Missing event handler function. You should assign it using onEvent(...)');
            }
            const handler = this._handler;
            const errorHandler = this._errorHandler;
            const promises = Promise.all(contexts.map((context) => Promise.resolve()
                .then(() => run(handler)(context, {}))
                .then(() => {
                if (context.handlerDidEnd) {
                    return context.handlerDidEnd();
                }
            })
                .catch(err => {
                if (errorHandler) {
                    return run(errorHandler)(context, { error: err });
                }
                throw err;
            })
                .catch(err => {
                context.emitError(err);
                throw err;
            })));
            if (this._sync) {
                try {
                    yield promises;
                    yield Promise.all(contexts.map((context) => __awaiter(this, void 0, void 0, function* () {
                        context.isSessionWritten = true;
                        const { session } = context;
                        if (session) {
                            session.lastActivity = Date.now();
                            debugSessionWrite(`Write session: ${session.id}`);
                            debugSessionWrite(JSON.stringify(session, null, 2));
                            yield this._sessions.write(session.id, session);
                        }
                    })));
                }
                catch (err) {
                    console.error(err);
                }
                const response = contexts[0].response;
                if (response && typeof response === 'object') {
                    debugResponse('Outgoing response:');
                    debugResponse(JSON.stringify(response, null, 2));
                }
                return response;
            }
            promises
                .then(() => __awaiter(this, void 0, void 0, function* () {
                yield Promise.all(contexts.map((context) => __awaiter(this, void 0, void 0, function* () {
                    context.isSessionWritten = true;
                    const { session } = context;
                    if (session) {
                        session.lastActivity = Date.now();
                        debugSessionWrite(`Write session: ${session.id}`);
                        debugSessionWrite(JSON.stringify(session, null, 2));
                        yield this._sessions.write(session.id, session);
                    }
                })));
            }))
                .catch(console.error);
        });
    }
}
exports.default = Bot;
//# sourceMappingURL=Bot.js.map