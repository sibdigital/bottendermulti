import { Event } from '../context/Event';
declare type ViberUser = {
    id: string;
    name: string;
    avatar: string;
    country: string;
    language: string;
    apiVersion: number;
};
declare type SubscribedEvent = {
    event: 'subscribed';
    timestamp: number;
    user: ViberUser;
    messageToken: number;
};
declare type UnsubscribedEvent = {
    event: 'unsubscribed';
    timestamp: number;
    userId: string;
    messageToken: number;
};
declare type ConversationStartedEvent = {
    event: 'conversation_started';
    timestamp: number;
    messageToken: number;
    type: 'open';
    context: string;
    user: ViberUser;
    subscribed: false;
};
declare type DeliveredEvent = {
    event: 'delivered';
    timestamp: number;
    messageToken: number;
    userId: string;
};
declare type SeenEvent = {
    event: 'seen';
    timestamp: number;
    messageToken: number;
    userId: string;
};
declare type FailedEvent = {
    event: 'failed';
    timestamp: number;
    messageToken: number;
    userId: string;
    desc: string;
};
declare type ViberMessage = {
    type: 'text' | 'picture' | 'video' | 'file' | 'sticker' | 'contact' | 'url' | 'location';
    text?: string;
    media?: string;
    location?: {
        lat: string;
        lot: string;
    };
    contact?: {
        name: string;
        phoneNumber: string;
    };
    trackingData?: string;
    fileName?: string;
    fileSize?: number;
    duration?: number;
    stickerId?: number;
};
declare type MessageEvent = {
    event: 'message';
    timestamp: number;
    messageToken: number;
    sender: ViberUser;
    message: ViberMessage;
};
export declare type ViberRawEvent = SubscribedEvent | UnsubscribedEvent | ConversationStartedEvent | DeliveredEvent | SeenEvent | FailedEvent | MessageEvent;
export default class ViberEvent implements Event<ViberRawEvent> {
    _rawEvent: ViberRawEvent;
    constructor(rawEvent: ViberRawEvent);
    get rawEvent(): ViberRawEvent;
    get isMessage(): boolean;
    get message(): ViberMessage | null;
    get isText(): boolean;
    get text(): string | null;
    get isPicture(): boolean;
    get picture(): string | null;
    get isVideo(): boolean;
    get video(): string | null;
    get isFile(): boolean;
    get file(): string | null;
    get isSticker(): boolean;
    get sticker(): number | null;
    get isContact(): boolean;
    get contact(): Record<string, any> | null;
    get isURL(): boolean;
    get url(): string | null;
    get isLocation(): boolean;
    get location(): Record<string, any> | null;
    get isSubscribed(): boolean;
    get subscribed(): SubscribedEvent | null;
    get isUnsubscribed(): boolean;
    get unsubscribed(): UnsubscribedEvent | null;
    get isConversationStarted(): boolean;
    get conversationStarted(): ConversationStartedEvent | null;
    get isDelivered(): boolean;
    get delivered(): DeliveredEvent | null;
    get isSeen(): boolean;
    get seen(): SeenEvent | null;
    get isFailed(): boolean;
    get failed(): FailedEvent | null;
}
export {};
//# sourceMappingURL=ViberEvent.d.ts.map