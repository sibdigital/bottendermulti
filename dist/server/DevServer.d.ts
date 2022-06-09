import Server from './Server';
import { BottenderConfig } from "../types";
declare class DevServer extends Server {
    prepare(config: BottenderConfig): Promise<void>;
}
export default DevServer;
//# sourceMappingURL=DevServer.d.ts.map