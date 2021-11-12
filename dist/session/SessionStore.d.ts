import Session from './Session';
declare type SessionStore = {
    init(): Promise<ThisType<SessionStore>>;
    read(key: string): Promise<Session | null>;
    all(): Promise<Session[]>;
    write(key: string, sess: Session): Promise<void>;
    destroy(key: string): Promise<void>;
};
export default SessionStore;
//# sourceMappingURL=SessionStore.d.ts.map