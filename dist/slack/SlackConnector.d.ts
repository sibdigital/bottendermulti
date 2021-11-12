/// <reference types="node" />
import { EventEmitter } from 'events';
import { SlackOAuthClient } from 'messaging-api-slack';
import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';
import SlackContext from './SlackContext';
import SlackEvent, { EventTypes, Message, SlackRawEvent } from './SlackEvent';
export declare type SlackUser = {
    id: string;
};
declare type EventsAPIBody = {
    token: string;
    teamId: string;
    apiAppId: string;
    type: EventTypes;
    event: Message;
    authedUsers: string[];
    eventId: string;
    eventTime: number;
};
export declare type SlackRequestBody = EventsAPIBody | {
    payload: string;
};
declare type CommonConstructorOptions = {
    skipLegacyProfile?: boolean;
    verificationToken?: string;
    signingSecret?: string;
    includeBotMessages?: boolean;
};
declare type ConstructorOptionsWithoutClient = {
    accessToken: string;
    origin?: string;
} & CommonConstructorOptions;
declare type ConstructorOptionsWithClient = {
    client: SlackOAuthClient;
} & CommonConstructorOptions;
declare type ConstructorOptions = ConstructorOptionsWithoutClient | ConstructorOptionsWithClient;
export default class SlackConnector implements Connector<SlackRequestBody, SlackOAuthClient> {
    _client: SlackOAuthClient;
    _verificationToken: string;
    _signingSecret: string;
    _skipLegacyProfile: boolean;
    _includeBotMessages: boolean;
    constructor(options: ConstructorOptions);
    _getRawEventFromRequest(body: SlackRequestBody): SlackRawEvent;
    _isBotEventRequest(body: SlackRequestBody): boolean;
    get platform(): string;
    get client(): SlackOAuthClient;
    getUniqueSessionKey(body: SlackRequestBody): string;
    updateSession(session: Session, body: SlackRequestBody): Promise<void>;
    mapRequestToEvents(body: SlackRequestBody): SlackEvent[];
    createContext(params: {
        event: SlackEvent;
        session: Session | null;
        initialState?: Record<string, any> | null;
        requestContext?: RequestContext;
        emitter?: EventEmitter | null;
    }): SlackContext;
    verifySignature(tokenFromBody: string): boolean;
    verifySignatureBySigningSecret({ rawBody, signature, timestamp, }: {
        rawBody: string;
        signature: string;
        timestamp: number;
    }): boolean;
    preprocess({ method, headers, body, rawBody, }: {
        method: string;
        headers: Record<string, any>;
        query: Record<string, any>;
        rawBody: string;
        body: Record<string, any>;
    }): {
        shouldNext: boolean;
        response?: undefined;
    } | {
        shouldNext: boolean;
        response: {
            status: number;
            body: any;
        };
    };
}
export {};
//# sourceMappingURL=SlackConnector.d.ts.map