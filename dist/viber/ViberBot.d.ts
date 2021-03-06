import { ViberClient, ViberTypes } from 'messaging-api-viber';
import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';
import { ViberRequestBody } from './ViberConnector';
import ViberContext from './ViberContext';
import ViberEvent from './ViberEvent';
export default class ViberBot extends Bot<ViberRequestBody, ViberClient, ViberEvent, ViberContext> {
    constructor({ accessToken, sender, sessionStore, sync, origin, }: {
        accessToken: string;
        sender: ViberTypes.Sender;
        sessionStore?: SessionStore;
        sync?: boolean;
        origin?: string;
    });
}
//# sourceMappingURL=ViberBot.d.ts.map