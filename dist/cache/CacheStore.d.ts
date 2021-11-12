export declare type CacheValue = number | Record<string, any>;
declare type CacheStore = {
    get(key: string): Promise<CacheValue | null>;
    all(): Promise<CacheValue[]>;
    put(key: string, value: CacheValue, minutes: number): Promise<void>;
    forget(key: string): Promise<void>;
    flush(): Promise<void>;
    getPrefix(): string;
};
export default CacheStore;
//# sourceMappingURL=CacheStore.d.ts.map