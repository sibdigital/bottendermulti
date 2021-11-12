import { TelegramClient } from 'messaging-api-telegram';
import Bot from '../bot/Bot';
import SessionStore from '../session/SessionStore';
import { TelegramRequestBody } from './TelegramConnector';
import TelegramContext from './TelegramContext';
import TelegramEvent from './TelegramEvent';
declare type PollingOptions = {
    offset?: number;
    limit?: number;
    timeout?: number;
    allowed_updates?: string[];
};
export default class TelegramBot extends Bot<TelegramRequestBody, TelegramClient, TelegramEvent, TelegramContext> {
    _offset: number | null;
    _shouldGetUpdates: boolean;
    constructor({ accessToken, sessionStore, sync, origin, }: {
        accessToken: string;
        sessionStore?: SessionStore;
        sync?: boolean;
        origin?: string;
    });
    get offset(): number | null;
    createLongPollingRuntime(options?: PollingOptions): Promise<void>;
    stop(): void;
}
export {};
//# sourceMappingURL=TelegramBot.d.ts.map