import { Event } from '../context/Event';
declare type Message = {
    text: string;
};
declare type MessageEvent = {
    message: Message;
};
declare type PayloadEvent = {
    payload: string;
};
export declare type ConsoleRawEvent = MessageEvent | PayloadEvent;
export default class ConsoleEvent implements Event<ConsoleRawEvent> {
    _rawEvent: ConsoleRawEvent;
    constructor(rawEvent: ConsoleRawEvent);
    get rawEvent(): ConsoleRawEvent;
    get isMessage(): boolean;
    get message(): Message | null;
    get isText(): boolean;
    get text(): string | null;
    get isPayload(): boolean;
    get payload(): string | null;
}
export {};
//# sourceMappingURL=ConsoleEvent.d.ts.map