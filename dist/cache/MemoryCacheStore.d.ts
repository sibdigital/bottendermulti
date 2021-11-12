import LRU from 'lru-cache';
import CacheStore, { CacheValue } from './CacheStore';
export default class MemoryCacheStore implements CacheStore {
    _lru: LRU<string, any>;
    constructor(max?: number);
    get(key: string): Promise<CacheValue | null>;
    all(): Promise<CacheValue[]>;
    put(key: string, value: CacheValue, minutes: number): Promise<void>;
    forget(key: string): Promise<void>;
    flush(): Promise<void>;
    getPrefix(): string;
}
//# sourceMappingURL=MemoryCacheStore.d.ts.map