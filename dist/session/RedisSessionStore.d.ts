import CacheBasedSessionStore from './CacheBasedSessionStore';
import SessionStore from './SessionStore';
declare type RedisOption = number | string | {
    port?: number;
    host?: string;
    family?: number;
    password?: string;
    db?: number;
};
export default class RedisSessionStore extends CacheBasedSessionStore implements SessionStore {
    constructor(arg: RedisOption, expiresIn?: number);
}
export {};
//# sourceMappingURL=RedisSessionStore.d.ts.map