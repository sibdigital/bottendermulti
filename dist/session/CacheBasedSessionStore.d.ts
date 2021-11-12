import CacheStore from '../cache/CacheStore';
import Session from './Session';
import SessionStore from './SessionStore';
export default class CacheBasedSessionStore implements SessionStore {
    _cache: CacheStore;
    _expiresIn: number;
    constructor(cache: CacheStore, expiresIn?: number);
    init(): Promise<CacheBasedSessionStore>;
    read(key: string): Promise<Session | null>;
    all(): Promise<Session[]>;
    write(key: string, sess: Session): Promise<void>;
    destroy(key: string): Promise<void>;
}
//# sourceMappingURL=CacheBasedSessionStore.d.ts.map