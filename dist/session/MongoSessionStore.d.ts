import { Collection, Db } from 'mongodb';
import Session from './Session';
import SessionStore from './SessionStore';
declare type MongoOption = string | {
    url?: string;
    collectionName?: string;
};
export default class MongoSessionStore implements SessionStore {
    _url: string;
    _collectionName: string;
    _expiresIn: number;
    _connection?: Db;
    constructor(options: MongoOption, expiresIn?: number);
    init(): Promise<MongoSessionStore>;
    read(key: string): Promise<Session | null>;
    all(): Promise<Session[]>;
    write(key: string, sess: Session): Promise<void>;
    destroy(key: string): Promise<void>;
    _expired(sess: Session): boolean;
    get _sessions(): Collection<any>;
}
export {};
//# sourceMappingURL=MongoSessionStore.d.ts.map