import { MessengerClient } from 'messaging-api-messenger';
import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';
import { MessengerRequestBody } from './MessengerConnector';
import MessengerContext from './MessengerContext';
import MessengerEvent from './MessengerEvent';
export default class MessengerBot extends Bot<MessengerRequestBody, MessengerClient, MessengerEvent, MessengerContext> {
    constructor({ accessToken, appId, appSecret, sessionStore, sync, mapPageToAccessToken, verifyToken, batchConfig, origin, skipAppSecretProof, skipLegacyProfile, }: {
        accessToken: string;
        appId: string;
        appSecret: string;
        sessionStore?: SessionStore;
        sync?: boolean;
        mapPageToAccessToken?: (pageId: string) => Promise<string>;
        verifyToken?: string;
        batchConfig?: Record<string, any>;
        origin?: string;
        skipAppSecretProof?: boolean;
        skipLegacyProfile?: boolean;
    });
}
//# sourceMappingURL=MessengerBot.d.ts.map