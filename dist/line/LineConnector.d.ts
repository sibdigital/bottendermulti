/// <reference types="node" />
import { EventEmitter } from 'events';
import { LineClient } from 'messaging-api-line';
import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';
import LineContext from './LineContext';
import LineEvent, { LineRawEvent } from './LineEvent';
export declare type LineRequestBody = {
    destination: string;
    events: LineRawEvent[];
};
declare type CommonConstructorOptions = {
    mapDestinationToAccessToken?: (destination: string) => Promise<string>;
    shouldBatch?: boolean;
    sendMethod?: string;
    skipLegacyProfile?: boolean;
};
declare type ConstructorOptionsWithoutClient = {
    accessToken: string;
    channelSecret: string;
    origin?: string;
} & CommonConstructorOptions;
declare type ConstructorOptionsWithClient = {
    client: LineClient;
} & CommonConstructorOptions;
declare type ConstructorOptions = ConstructorOptionsWithoutClient | ConstructorOptionsWithClient;
export default class LineConnector implements Connector<LineRequestBody, LineClient> {
    _client: LineClient;
    _channelSecret: string;
    _skipLegacyProfile: boolean;
    _mapDestinationToAccessToken: ((destination: string) => Promise<string>) | null;
    _shouldBatch: boolean;
    _sendMethod: string;
    constructor(options: ConstructorOptions);
    _isWebhookVerifyEvent(event: LineRawEvent): boolean;
    isWebhookVerifyRequest(body: LineRequestBody): boolean;
    get platform(): string;
    get client(): LineClient;
    getUniqueSessionKey(bodyOrEvent: LineRequestBody | LineEvent): string;
    updateSession(session: Session, bodyOrEvent: LineRequestBody | LineEvent): Promise<void>;
    mapRequestToEvents(body: LineRequestBody): LineEvent[];
    createContext(params: {
        event: LineEvent;
        session?: Session | null;
        initialState?: Record<string, any> | null;
        requestContext?: RequestContext;
        emitter?: EventEmitter | null;
    }): Promise<LineContext>;
    verifySignature(rawBody: string, signature: string): boolean;
    preprocess({ method, headers, rawBody, body, }: {
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
            body: {
                error: {
                    message: string;
                    request: {
                        rawBody: string;
                        headers: {
                            'x-line-signature': any;
                        };
                    };
                };
            };
        };
    } | {
        shouldNext: boolean;
        response: {
            status: number;
            body: string;
        };
    };
}
export {};
//# sourceMappingURL=LineConnector.d.ts.map