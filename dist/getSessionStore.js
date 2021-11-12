"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warning_1 = __importDefault(require("warning"));
const getBottenderConfig_1 = __importDefault(require("./shared/getBottenderConfig"));
function getSessionStore() {
    const { session } = getBottenderConfig_1.default();
    const sessionDriver = (session && session.driver) || 'memory';
    const storesConfig = (session && session.stores) || {};
    switch (sessionDriver) {
        case 'memory': {
            const MemorySessionStore = require('./session/MemorySessionStore')
                .default;
            return new MemorySessionStore(storesConfig.memory || {}, session && session.expiresIn);
        }
        case 'file': {
            const FileSessionStore = require('./session/FileSessionStore').default;
            return new FileSessionStore(storesConfig.file || {}, session && session.expiresIn);
        }
        case 'mongo': {
            const MongoSessionStore = require('./session/MongoSessionStore').default;
            return new MongoSessionStore(storesConfig.mongo || {}, session && session.expiresIn);
        }
        case 'redis': {
            const RedisSessionStore = require('./session/RedisSessionStore').default;
            return new RedisSessionStore(storesConfig.redis || {}, session && session.expiresIn);
        }
        default: {
            const customSessionStore = storesConfig[sessionDriver];
            if (customSessionStore) {
                return customSessionStore;
            }
            warning_1.default(false, `Received unknown driver: ${sessionDriver}, so fallback it to \`memory\` driver.`);
            const MemorySessionStore = require('./session/MemorySessionStore')
                .default;
            return new MemorySessionStore(storesConfig.memory || {}, session && session.expiresIn);
        }
    }
}
exports.default = getSessionStore;
//# sourceMappingURL=getSessionStore.js.map