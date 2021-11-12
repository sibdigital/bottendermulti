import { SlackOAuthClient } from 'messaging-api-slack';
import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';
import { SlackRequestBody } from './SlackConnector';
import SlackContext from './SlackContext';
import SlackEvent from './SlackEvent';
export default class SlackBot extends Bot<SlackRequestBody, SlackOAuthClient, SlackEvent, SlackContext> {
    _accessToken: string;
    constructor({ accessToken, sessionStore, sync, verificationToken, signingSecret, origin, skipLegacyProfile, includeBotMessages, }: {
        accessToken: string;
        sessionStore?: SessionStore;
        sync?: boolean;
        verificationToken?: string;
        signingSecret?: string;
        origin?: string;
        skipLegacyProfile?: boolean;
        includeBotMessages?: boolean;
    });
    createRtmRuntime(): void;
}
//# sourceMappingURL=SlackBot.d.ts.map