import { AxiosInstance } from 'axios';
import { OnRequestFunction } from 'messaging-api-common';
declare type ClientConfig = {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
    origin?: string;
};
export default class TwilioClient {
    static connect(config: ClientConfig): TwilioClient;
    _onRequest: OnRequestFunction | undefined;
    _axios: AxiosInstance;
    _authToken: string;
    _phoneNumber: string;
    constructor(config: ClientConfig);
    get axios(): AxiosInstance;
    get authToken(): string;
    createMessage(message: {
        from?: string;
        body: string;
        to: string;
        maxPrice?: number;
        provideFeedback?: boolean;
        validityPeriod?: number;
        forceDelivery?: boolean;
        smartEncoded?: boolean;
        persistentAction?: string[];
        mediaUrl?: string[];
    }): Promise<{
        [x: string]: any;
    }>;
}
export {};
//# sourceMappingURL=TwilioClient.d.ts.map