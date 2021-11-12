import express from 'express';
import { BottenderConfig } from './types';
declare function initializeServer({ isConsole, config, }?: {
    isConsole?: boolean;
    config?: BottenderConfig;
}): express.Application | void;
export default initializeServer;
//# sourceMappingURL=initializeServer.d.ts.map