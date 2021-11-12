/// <reference types="node" />
import { EventEmitter } from 'events';
import Session from '../session/Session';
import { Client, Event, RequestContext } from '../types';
declare type Options<C extends Client, E extends Event> = {
    client: C;
    event: E;
    session?: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
    emitter?: EventEmitter | null;
};
declare type Response = {
    status: number;
    headers: Record<string, string>;
    body: any;
};
export default abstract class Context<C extends Client, E extends Event> {
    abstract get platform(): string;
    abstract sendText(text: string, options?: Record<string, any>): any;
    _isHandled: boolean | null;
    _isSessionWritten: boolean;
    _client: C;
    _event: E;
    _session: Session | null;
    _initialState?: Record<string, any> | null;
    _requestContext: RequestContext | null;
    _emitter: EventEmitter | null;
    _intent: string | null;
    response: Response;
    constructor({ client, event, session, initialState, requestContext, emitter, }: Options<C, E>);
    get client(): C;
    get event(): Record<string, any>;
    get requestContext(): RequestContext | null;
    get session(): Session | null;
    get isHandled(): boolean | null;
    get isSessionWritten(): boolean;
    set isSessionWritten(bool: boolean);
    get state(): Record<string, any>;
    setState(state: Record<string, any>): void;
    resetState(): void;
    get intent(): string | null;
    setIntent(intent: string): void;
    setAsHandled(handled?: boolean): void;
    setAsNotHandled(): void;
    emitError(err: Error): void;
    handlerDidEnd(): any;
}
export {};
//# sourceMappingURL=Context.d.ts.map