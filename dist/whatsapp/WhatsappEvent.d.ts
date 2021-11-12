import { Event } from '../context/Event';
import { MessageDelivered, MessageRead, MessageReceived, MessageSent, WhatsappRawEvent } from './WhatsappTypes';
export default class WhatsappEvent implements Event<WhatsappRawEvent> {
    _rawEvent: WhatsappRawEvent;
    constructor(rawEvent: WhatsappRawEvent);
    get rawEvent(): WhatsappRawEvent;
    get isMessage(): boolean;
    get message(): MessageReceived | null;
    get isText(): boolean;
    get text(): string | null;
    get isMedia(): boolean;
    get media(): {
        contentType: string;
        url: string;
    } | null;
    get isReceived(): boolean;
    get received(): MessageReceived | null;
    get isSent(): boolean;
    get sent(): MessageSent | null;
    get isDelivered(): boolean;
    get delivered(): MessageDelivered | null;
    get isRead(): boolean;
    get read(): MessageRead | null;
}
//# sourceMappingURL=WhatsappEvent.d.ts.map