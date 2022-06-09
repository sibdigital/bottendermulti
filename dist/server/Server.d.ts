/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import Bot from '../bot/Bot';
import { BottenderConfig } from '../types';
export declare type ServerOptions = {
    useConsole?: boolean;
    dev?: boolean;
};
declare class Server {
    _channelBots: {
        webhookPath: string;
        bot: Bot<any, any, any, any>;
    }[];
    useConsole: boolean;
    constructor({ useConsole }?: {
        useConsole?: boolean | undefined;
    });
    private handleRequest;
    prepare(config: BottenderConfig): Promise<void>;
    getRequestHandler(): (req: IncomingMessage, res: ServerResponse) => Promise<void>;
    protected run(req: IncomingMessage, res: ServerResponse): Promise<void>;
}
export default Server;
//# sourceMappingURL=Server.d.ts.map