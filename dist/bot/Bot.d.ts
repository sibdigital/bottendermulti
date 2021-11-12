/// <reference types="node" />
import { EventEmitter } from 'events';
import Context from '../context/Context';
import SessionStore from '../session/SessionStore';
import { Action, AnyContext, Body, Client, Event, Plugin, RequestContext } from '../types';
import { Connector } from './Connector';
declare type Builder<C extends AnyContext> = {
    build: () => Action<C, any>;
};
export declare function run<C extends AnyContext>(action: Action<C, any>): Action<C, any>;
declare type RequestHandler<B> = (body: B, requestContext?: RequestContext) => void | Promise<void>;
export default class Bot<B extends Body, C extends Client, E extends Event, Ctx extends Context<C, E>> {
    _sessions: SessionStore;
    _initialized: boolean;
    _connector: Connector<B, C>;
    _handler: Action<Ctx, any> | null;
    _errorHandler: Action<Ctx, any> | null;
    _initialState: Record<string, any>;
    _plugins: Function[];
    _sync: boolean;
    _emitter: EventEmitter;
    constructor({ connector, sessionStore, sync, }: {
        connector: Connector<B, C>;
        sessionStore?: SessionStore;
        sync?: boolean;
    });
    get connector(): Connector<B, C>;
    get sessions(): SessionStore;
    get handler(): Action<Ctx, E> | null;
    get emitter(): EventEmitter;
    onEvent(handler: Action<Ctx, any> | Builder<Ctx>): Bot<B, C, E, Ctx>;
    onError(handler: Action<Ctx, any> | Builder<Ctx>): Bot<B, C, E, Ctx>;
    setInitialState(initialState: Record<string, any>): Bot<B, C, E, Ctx>;
    use(plugin: Plugin<Ctx>): Bot<B, C, E, Ctx>;
    initSessionStore(): Promise<void>;
    createRequestHandler(): RequestHandler<B>;
}
export {};
//# sourceMappingURL=Bot.d.ts.map