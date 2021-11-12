import Server, { ServerOptions } from './server/Server';
declare type BottenderServerOptions = ServerOptions & {
    dev?: boolean;
};
declare function bottender(options: BottenderServerOptions): Server;
export default bottender;
//# sourceMappingURL=bottender.d.ts.map