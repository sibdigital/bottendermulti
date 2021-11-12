import { Instance } from 'jfs';
import Session from './Session';
import SessionStore from './SessionStore';
declare type FileOption = string | {
    dirname?: string;
};
export default class FileSessionStore implements SessionStore {
    _jfs: Instance<Record<string, any>>;
    _expiresIn: number;
    constructor(arg: FileOption, expiresIn?: number);
    init(): Promise<FileSessionStore>;
    read(key: string): Promise<Session | null>;
    all(): Promise<Session[]>;
    write(key: string, sess: Session): Promise<void>;
    destroy(key: string): Promise<void>;
    getJFS(): Instance<Record<string, any>>;
    _expired(sess: Session): boolean;
}
export {};
//# sourceMappingURL=FileSessionStore.d.ts.map