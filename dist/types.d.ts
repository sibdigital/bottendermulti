import { LineClient } from 'messaging-api-line';
import { MessengerClient } from 'messaging-api-messenger';
import { SlackOAuthClient } from 'messaging-api-slack';
import { TelegramClient } from 'messaging-api-telegram';
import { ViberClient } from 'messaging-api-viber';
import ConsoleEvent, { ConsoleRawEvent } from './console/ConsoleEvent';
import Context from './context/Context';
import LineEvent from './line/LineEvent';
import MessengerEvent from './messenger/MessengerEvent';
import SessionStore from './session/SessionStore';
import SlackEvent from './slack/SlackEvent';
import TelegramEvent from './telegram/TelegramEvent';
import TwilioClient from './whatsapp/TwilioClient';
import ViberEvent from './viber/ViberEvent';
import WhatsappEvent from './whatsapp/WhatsappEvent';
import { ConsoleClient } from './console/ConsoleClient';
import { LineRequestBody } from './line/LineConnector';
import { MessengerRequestBody } from './messenger/MessengerConnector';
import { SlackRequestBody } from './slack/SlackConnector';
import { TelegramRequestBody } from './telegram/TelegramConnector';
import { ViberRequestBody } from './viber/ViberConnector';
import { WhatsappRequestBody } from './whatsapp/WhatsappConnector';
export declare type Client = ConsoleClient | MessengerClient | LineClient | SlackOAuthClient | TelegramClient | ViberClient | TwilioClient;
export declare type Event = ConsoleEvent | MessengerEvent | LineEvent | SlackEvent | TelegramEvent | ViberEvent | WhatsappEvent;
export declare type Body = ConsoleRawEvent | MessengerRequestBody | LineRequestBody | SlackRequestBody | TelegramRequestBody | ViberRequestBody | WhatsappRequestBody;
export declare type AnyContext = Context<any, any>;
export declare type Action<C extends AnyContext, P extends Record<string, any> = {}, RAP extends Record<string, any> = {}> = (context: C, props: Props<C> & P) => void | Action<C, RAP> | Promise<Action<C, RAP> | void>;
export declare type Props<C extends AnyContext> = {
    next?: Action<C, any>;
    error?: Error;
};
export declare type Plugin<C extends AnyContext> = (context: C) => void;
export declare enum Channel {
    Messenger = "messenger",
    Line = "line",
    Slack = "slack",
    Telegram = "telegram",
    Viber = "viber",
    Whatsapp = "whatsapp"
}
export declare enum SessionDriver {
    Memory = "memory",
    File = "file",
    Redis = "redis",
    Mongo = "mongo"
}
export declare type SessionConfig = {
    driver: string;
    expiresIn?: number;
    stores: {
        memory?: {
            maxSize?: number;
        };
        file?: {
            dirname?: string;
        };
        redis?: {
            port?: number;
            host?: string;
            password?: string;
            db?: number;
        };
        mongo?: {
            url?: string;
            collectionName?: string;
        };
    } | {
        [P in Exclude<string, SessionDriver>]: SessionStore;
    };
};
export declare type BottenderConfig = {
    plugins?: Plugin<any>[];
    session?: SessionConfig;
    initialState?: Record<string, any>;
    channels?: {
        [Channel.Messenger]: {
            enabled: boolean;
            path: string;
            accessToken: string;
            verifyToken: string;
            appId: string;
            appSecret: string;
        };
        [Channel.Line]: {
            enabled: boolean;
            path: string;
            accessToken: string;
            channelSecret: string;
        };
        [Channel.Telegram]: {
            enabled: boolean;
            path: string;
            accessToken: string;
        };
        [Channel.Slack]: {
            enabled: boolean;
            path: string;
            accessToken: string;
            verificationToken?: string;
            signingSecret?: string;
        };
        [Channel.Viber]: {
            enabled: boolean;
            path: string;
            accessToken: string;
            sender: {
                name: string;
            };
        };
        [Channel.Whatsapp]: {
            enabled: boolean;
            path: string;
            accountSid: string;
            authToken: string;
        };
    };
};
export declare type RequestContext = {
    method: string;
    path: string;
    query: Record<string, string>;
    headers: Record<string, string>;
};
//# sourceMappingURL=types.d.ts.map