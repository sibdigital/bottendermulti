import CacheBasedSessionStore from './CacheBasedSessionStore';
import SessionStore from './SessionStore';
declare type MemoryOption = number | {
    maxSize?: number;
};
export default class MemorySessionStore extends CacheBasedSessionStore implements SessionStore {
    constructor(arg?: MemoryOption, expiresIn?: number);
}
export {};
//# sourceMappingURL=MemorySessionStore.d.ts.map