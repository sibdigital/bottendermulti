import IORedis from 'ioredis';
import CacheStore, { CacheValue } from './CacheStore';
export default class RedisCacheStore implements CacheStore {
    _redis: IORedis.Redis;
    _prefix: string;
    constructor(...args: any);
    get(key: string): Promise<CacheValue | null>;
    all(): Promise<CacheValue[]>;
    put(key: string, value: CacheValue, minutes: number): Promise<void>;
    forget(key: string): Promise<void>;
    flush(): Promise<void>;
    getRedis(): IORedis.Redis;
    getPrefix(): string;
    setPrefix(prefix: string): void;
    _serialize(value: CacheValue): number | string;
    _unserialize(value: number | string): CacheValue;
}
//# sourceMappingURL=RedisCacheStore.d.ts.map