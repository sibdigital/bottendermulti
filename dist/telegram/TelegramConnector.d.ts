/// <reference types="node" />
import { EventEmitter } from 'events';
import { TelegramClient } from 'messaging-api-telegram';
import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';
import TelegramContext from './TelegramContext';
import TelegramEvent, { TelegramRawEvent } from './TelegramEvent';
export declare type TelegramRequestBody = TelegramRawEvent;
declare type ConstructorOptionsWithoutClient = {
    accessToken: string;
    origin?: string;
    skipLegacyProfile?: boolean;
};
declare type ConstructorOptionsWithClient = {
    client: TelegramClient;
    skipLegacyProfile?: boolean;
};
declare type ConstructorOptions = ConstructorOptionsWithoutClient | ConstructorOptionsWithClient;
export default class TelegramConnector implements Connector<TelegramRequestBody, TelegramClient> {
    _client: TelegramClient;
    _skipLegacyProfile: boolean;
    constructor(options: ConstructorOptions);
    _getRawEventFromRequest(body: TelegramRequestBody): TelegramRawEvent;
    get platform(): string;
    get client(): TelegramClient;
    getUniqueSessionKey(body: TelegramRequestBody): string;
    updateSession(session: Session, body: TelegramRequestBody): Promise<void>;
    mapRequestToEvents(body: TelegramRequestBody): TelegramEvent[];
    createContext(params: {
        event: TelegramEvent;
        session: Session | null;
        initialState?: Record<string, any> | null;
        requestContext?: RequestContext;
        emitter?: EventEmitter | null;
    }): TelegramContext;
    preprocess(): {
        shouldNext: true;
    };
}
export {};
//# sourceMappingURL=TelegramConnector.d.ts.map