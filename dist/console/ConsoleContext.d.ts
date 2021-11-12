/// <reference types="node" />
import { EventEmitter } from 'events';
import Context from '../context/Context';
import Session from '../session/Session';
import { RequestContext } from '../types';
import ConsoleEvent from './ConsoleEvent';
import { ConsoleClient } from './ConsoleClient';
declare type Options = {
    client: ConsoleClient;
    event: ConsoleEvent;
    session: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
    fallbackMethods: boolean;
    mockPlatform: string;
    emitter: EventEmitter | null;
};
export default class ConsoleContext extends Context<ConsoleClient, ConsoleEvent> {
    _fallbackMethods: boolean;
    _mockPlatform: string;
    constructor({ client, event, session, initialState, requestContext, fallbackMethods, mockPlatform, emitter, }: Options);
    get platform(): string;
    typing(milliseconds: number): Promise<void>;
    sendText(text: string, ...args: any[]): Promise<void>;
    _methodMissing(method: string, args: any[]): Promise<void>;
}
export {};
//# sourceMappingURL=ConsoleContext.d.ts.map