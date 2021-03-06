import { LineClient } from 'messaging-api-line';
import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';
import { LineRequestBody } from './LineConnector';
import LineContext from './LineContext';
import LineEvent from './LineEvent';
export default class LineBot extends Bot<LineRequestBody, LineClient, LineEvent, LineContext> {
    constructor({ accessToken, channelSecret, sessionStore, origin, sync, mapDestinationToAccessToken, shouldBatch, sendMethod, skipLegacyProfile, }: {
        accessToken: string;
        channelSecret: string;
        sessionStore?: SessionStore;
        sync?: boolean;
        mapDestinationToAccessToken?: (destination: string) => Promise<string>;
        shouldBatch?: boolean;
        sendMethod?: string;
        origin?: string;
        skipLegacyProfile?: boolean;
    });
}
//# sourceMappingURL=LineBot.d.ts.map