/// <reference types="node" />
import { EventEmitter } from 'events';
import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';
import TwilioClient from './TwilioClient';
import WhatsappContext from './WhatsappContext';
import WhatsappEvent from './WhatsappEvent';
export declare type WhatsappRequestBody = any;
declare type ConstructorOptionsWithoutClient = {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
    origin?: string;
};
declare type ConstructorOptionsWithClient = {
    client: TwilioClient;
    origin?: string;
};
declare type ConstructorOptions = ConstructorOptionsWithoutClient | ConstructorOptionsWithClient;
export default class WhatsappConnector implements Connector<WhatsappRequestBody, TwilioClient> {
    _client: TwilioClient;
    constructor(options: ConstructorOptions);
    get platform(): string;
    get client(): TwilioClient;
    getUniqueSessionKey(body: WhatsappRequestBody): string;
    updateSession(session: Session, body: WhatsappRequestBody): Promise<void>;
    mapRequestToEvents(body: WhatsappRequestBody): WhatsappEvent[];
    createContext(params: {
        event: WhatsappEvent;
        session: Session | null;
        initialState?: Record<string, any> | null;
        requestContext?: RequestContext;
        emitter?: EventEmitter | null;
    }): WhatsappContext;
    verifySignature({ body, url, headers, }: {
        headers: Record<string, any>;
        url: string;
        body: Record<string, any>;
    }): boolean;
    preprocess({ url, headers, rawBody, body, }: {
        method: string;
        url: string;
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
                            'x-twilio-signature': any;
                        };
                    };
                };
            };
        };
    };
}
export {};
//# sourceMappingURL=WhatsappConnector.d.ts.map