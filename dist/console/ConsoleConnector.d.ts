/// <reference types="node" />
import { EventEmitter } from 'events';
import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';
import ConsoleContext from './ConsoleContext';
import ConsoleEvent, { ConsoleRawEvent } from './ConsoleEvent';
import { ConsoleClient } from './ConsoleClient';
declare type ConsoleRequestBody = ConsoleRawEvent;
declare type ConstructorOptions = {
    client?: ConsoleClient;
    fallbackMethods?: boolean;
    mockPlatform?: string;
};
export default class ConsoleConnector implements Connector<ConsoleRequestBody, ConsoleClient> {
    _client: ConsoleClient;
    _fallbackMethods: boolean;
    _platform: string;
    constructor({ client, fallbackMethods, mockPlatform, }?: ConstructorOptions);
    get platform(): string;
    get client(): ConsoleClient;
    getUniqueSessionKey(): string;
    updateSession(session: Session): Promise<void>;
    mapRequestToEvents(body: ConsoleRequestBody): ConsoleEvent[];
    createContext(params: {
        event: ConsoleEvent;
        session: Session | null;
        initialState?: Record<string, any> | null;
        requestContext?: RequestContext;
        emitter: EventEmitter | null;
    }): ConsoleContext;
}
export {};
//# sourceMappingURL=ConsoleConnector.d.ts.map