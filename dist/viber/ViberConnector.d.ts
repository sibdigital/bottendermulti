/// <reference types="node" />
import { EventEmitter } from 'events';
import { ViberClient, ViberTypes } from 'messaging-api-viber';
import Session from '../session/Session';
import { Connector } from '../bot/Connector';
import { RequestContext } from '../types';
import ViberContext from './ViberContext';
import ViberEvent, { ViberRawEvent } from './ViberEvent';
export declare type ViberRequestBody = ViberRawEvent;
declare type ConstructorOptionsWithoutClient = {
    accessToken: string;
    sender: ViberTypes.Sender;
    origin?: string;
    skipLegacyProfile?: boolean;
};
declare type ConstructorOptionsWithClient = {
    client: ViberClient;
    skipLegacyProfile?: boolean;
};
declare type ConstructorOptions = ConstructorOptionsWithoutClient | ConstructorOptionsWithClient;
export default class ViberConnector implements Connector<ViberRequestBody, ViberClient> {
    _accessToken: string;
    _client: ViberClient;
    _skipLegacyProfile: boolean;
    constructor(options: ConstructorOptions);
    _getRawEventFromRequest(body: ViberRequestBody): ViberRawEvent;
    get platform(): string;
    get client(): ViberClient;
    getUniqueSessionKey(body: ViberRequestBody): string;
    updateSession(session: Session, body: ViberRequestBody): Promise<void>;
    mapRequestToEvents(body: ViberRequestBody): ViberEvent[];
    createContext(params: {
        event: ViberEvent;
        session: Session | null;
        initialState?: Record<string, any> | null;
        requestContext?: RequestContext;
        emitter?: EventEmitter | null;
    }): ViberContext;
    verifySignature(rawBody: string, signature: string): boolean;
    preprocess({ method, headers, rawBody, }: {
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
                            'x-viber-content-signature': any;
                        };
                    };
                };
            };
        };
    };
}
export {};
//# sourceMappingURL=ViberConnector.d.ts.map