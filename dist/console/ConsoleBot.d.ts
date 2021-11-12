import Bot from '../bot/Bot';
import Session from '../session/Session';
import SessionStore from '../session/SessionStore';
import ConsoleEvent, { ConsoleRawEvent } from './ConsoleEvent';
import { ConsoleClient } from './ConsoleClient';
import { ConsoleContext } from '..';
export default class ConsoleBot extends Bot<ConsoleRawEvent, ConsoleClient, ConsoleEvent, ConsoleContext> {
    constructor({ sessionStore, fallbackMethods, mockPlatform, }?: {
        sessionStore?: SessionStore;
        fallbackMethods?: boolean;
        mockPlatform?: string;
    });
    getSession(): Promise<Session>;
    createRuntime(): void;
}
//# sourceMappingURL=ConsoleBot.d.ts.map