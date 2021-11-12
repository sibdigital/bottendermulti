/// <reference types="node" />
import { EventEmitter } from 'events';
import { MessengerClient } from 'messaging-api-messenger';
import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';
import MessengerContext from './MessengerContext';
import MessengerEvent, { AppRoles, Message, MessengerRawEvent, PassThreadControl, PolicyEnforcement, Postback, Recipient, Sender, TakeThreadControl } from './MessengerEvent';
declare type Entry = {
    [key in 'messaging' | 'standby' | 'changes']: {
        sender: Sender;
        recipient: Recipient;
        timestamp: number;
        postback?: Postback;
        message?: Message;
        field?: string;
        value?: Record<string, any>;
    }[];
};
declare type EntryRequestBody = {
    type: string;
    entry: Entry[];
};
declare type PolicyEnforcementRequestBody = {
    recipient: Recipient;
    timestamp: number;
    'policy-enforcement': PolicyEnforcement;
};
declare type AppRolesRequestBody = {
    recipient: Recipient;
    timestamp: number;
    appRoles: AppRoles;
};
declare type PassThreadControlRequestBody = {
    sender: Sender;
    recipient: Recipient;
    timestamp: number;
    passThreadControl: PassThreadControl;
};
declare type TakeThreadControlRequestBody = {
    sender: Sender;
    recipient: Recipient;
    timestamp: number;
    takeThreadControl: TakeThreadControl;
};
export declare type MessengerRequestBody = EntryRequestBody | PolicyEnforcementRequestBody | AppRolesRequestBody | PassThreadControlRequestBody | TakeThreadControlRequestBody;
declare type CommonConstructorOptions = {
    appId: string;
    appSecret: string;
    verifyToken?: string;
    batchConfig?: Record<string, any>;
    skipLegacyProfile?: boolean;
    mapPageToAccessToken?: (pageId: string) => Promise<string>;
};
declare type ConstructorOptionsWithoutClient = {
    accessToken?: string;
    origin?: string;
    skipAppSecretProof?: boolean;
} & CommonConstructorOptions;
declare type ConstructorOptionsWithClient = {
    client: MessengerClient;
} & CommonConstructorOptions;
declare type ConstructorOptions = ConstructorOptionsWithoutClient | ConstructorOptionsWithClient;
export default class MessengerConnector implements Connector<MessengerRequestBody, MessengerClient> {
    _client: MessengerClient;
    _appId: string;
    _appSecret: string;
    _skipLegacyProfile: boolean;
    _mapPageToAccessToken: ((pageId: string) => Promise<string>) | null;
    _verifyToken: string | null;
    _batchConfig: Record<string, any> | null;
    _batchQueue: Record<string, any> | null;
    constructor(options: ConstructorOptions);
    _getRawEventsFromRequest(body: MessengerRequestBody): MessengerRawEvent[];
    _getPageIdFromRawEvent(rawEvent: MessengerRawEvent): string | null;
    _isStandby(body: MessengerRequestBody): boolean;
    _profilePicExpired(user: {
        profilePic: string;
    }): boolean;
    get platform(): string;
    get client(): MessengerClient;
    get verifyToken(): string | null;
    getUniqueSessionKey(bodyOrEvent: MessengerRequestBody | MessengerEvent): string | null;
    updateSession(session: Session, bodyOrEvent: MessengerRequestBody | MessengerEvent): Promise<void>;
    mapRequestToEvents(body: MessengerRequestBody): MessengerEvent[];
    createContext(params: {
        event: MessengerEvent;
        session?: Session;
        initialState?: Record<string, any>;
        requestContext?: RequestContext;
        emitter?: EventEmitter;
    }): Promise<MessengerContext>;
    verifySignature(rawBody: string, signature: string): boolean;
    preprocess({ method, headers, query, rawBody, }: {
        method: string;
        headers: Record<string, any>;
        query: Record<string, any>;
        rawBody: string;
        body: Record<string, any>;
    }): {
        shouldNext: boolean;
        response: {
            status: number;
            body: any;
        };
    } | {
        shouldNext: boolean;
        response?: undefined;
    };
}
export {};
//# sourceMappingURL=MessengerConnector.d.ts.map