import { Event } from '../context/Event';
export declare type Sender = {
    id: string;
};
export declare type Recipient = {
    id: string;
};
declare type QuickReply = {
    payload: string;
};
declare type MediaAttachmentPayload = {
    url: string;
};
declare type LocationAttachmentPayload = {
    coordinates: {
        lat: number;
        long: number;
    };
};
declare type AttachmentPayload = MediaAttachmentPayload | LocationAttachmentPayload;
declare type FallbackAttachment = {
    type: 'fallback';
    payload: null;
    title: string;
    URL: string;
};
declare type MediaAttachment = {
    type: string;
    payload: AttachmentPayload;
};
declare type Attachment = MediaAttachment | FallbackAttachment;
declare type Tag = {
    source: string;
};
declare type ReplyTo = {
    mid: string;
};
export declare type Message = {
    mid: string;
    isEcho?: boolean;
    text?: string;
    stickerId?: number;
    quickReply?: QuickReply;
    attachments?: Attachment[];
    tags?: Tag[];
    replyTo?: ReplyTo;
    appId?: number;
    metadata?: string;
};
export declare type Delivery = {
    mids: string[];
    watermark: number;
    seq?: number;
};
export declare type Read = {
    watermark: number;
    seq?: number;
};
export declare type Referral = {
    ref: string;
    source: string;
    type: string;
    originDomain?: string;
};
export declare type Postback = {
    title: string;
    payload?: string;
    referral?: Referral;
};
export declare type GamePlay = {
    gameId: string;
    playerId: string;
    contextType: 'SOLO' | 'THREAD' | 'GROUP';
    contextId: string;
    score: number;
    payload: string;
};
export declare type Optin = {
    ref: string;
    userRef?: string;
} | {
    type: 'one_time_notif_req';
    payload: string;
    oneTimeNotifToken: string;
};
export declare type Payment = {
    payload: string;
    requestedUserInfo: Record<string, any>;
    paymentCredential: Record<string, any>;
    amount: {
        currency: string;
        amount: string;
    };
    shippingOptionId: string;
};
export declare type CheckoutUpdate = {
    payload: string;
    shippingAddress: {
        id: number;
        street1: string;
        street2: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    };
};
export declare type PreCheckout = {
    payload: string;
    requestedUserInfo: {
        shippingAddress: {
            name: string;
            street1: string;
            street2: string;
            city: string;
            state: string;
            country: string;
            postalCode: string;
        };
        contactName: string;
    };
    amount: {
        currency: string;
        amount: string;
    };
};
export declare type PolicyEnforcement = {
    action: string;
    reason: string;
};
export declare type AppRoles = Record<string, string[]>;
export declare type PassThreadControl = {
    newOwnerAppId: string;
    metadata: string;
};
export declare type TakeThreadControl = {
    previousOwnerAppId: string;
    metadata: string;
};
export declare type RequestThreadControl = {
    requestedOwnerAppId: number;
    metadata: string;
};
export declare type BrandedCamera = {
    contentIds: string[];
    event: string;
};
export declare type AccountLinking = {
    status: 'linked';
    authorizationCode: string;
} | {
    status: 'unlinked';
};
export declare type Reaction = {
    reaction: 'smile' | 'angry' | 'sad' | 'wow' | 'love' | 'like' | 'dislike' | 'other';
    emoji: string;
    action: 'react' | 'unreact';
    mid: string;
};
export declare type MessengerRawEvent = {
    sender?: Sender;
    recipient?: Recipient;
    timestamp?: number;
    message?: Message;
    read?: Read;
    delivery?: Delivery;
    postback?: Postback;
    gamePlay?: GamePlay;
    optin?: Optin;
    payment?: Payment;
    checkoutUpdate?: CheckoutUpdate;
    preCheckout?: PreCheckout;
    'policy-enforcement'?: PolicyEnforcement;
    appRoles?: AppRoles;
    passThreadControl?: PassThreadControl;
    takeThreadControl?: TakeThreadControl;
    requestThreadControl?: RequestThreadControl;
    referral?: Referral;
    brandedCamera?: BrandedCamera;
    accountLinking?: AccountLinking;
    reaction?: Reaction;
};
declare type MessengerEventOptions = {
    isStandby?: boolean;
    pageId?: string | null;
};
export default class MessengerEvent implements Event<MessengerRawEvent> {
    _rawEvent: MessengerRawEvent;
    _isStandby: boolean;
    _pageId: string | null;
    constructor(rawEvent: MessengerRawEvent, options?: MessengerEventOptions);
    get rawEvent(): MessengerRawEvent;
    get isMessage(): boolean;
    get message(): Message | null;
    get isText(): boolean;
    get text(): string | null;
    get hasAttachment(): boolean;
    get attachments(): Attachment[] | null;
    get isImage(): boolean;
    get image(): MediaAttachmentPayload | null;
    get isAudio(): boolean;
    get audio(): MediaAttachmentPayload | null;
    get isVideo(): boolean;
    get video(): MediaAttachmentPayload | null;
    get isLocation(): boolean;
    get location(): LocationAttachmentPayload | null;
    get isFile(): boolean;
    get file(): MediaAttachmentPayload | null;
    get isFallback(): boolean;
    get fallback(): FallbackAttachment | null;
    get isSticker(): boolean;
    get sticker(): string | null;
    get isLikeSticker(): boolean;
    get isQuickReply(): boolean;
    get quickReply(): QuickReply | null;
    get isEcho(): boolean;
    get isPostback(): boolean;
    get postback(): Postback | null;
    get isGamePlay(): boolean;
    get gamePlay(): GamePlay | null;
    get isOptin(): boolean;
    get optin(): Optin | null;
    get isPayment(): boolean;
    get payment(): Payment | null;
    get isCheckoutUpdate(): boolean;
    get checkoutUpdate(): CheckoutUpdate | null;
    get isPreCheckout(): boolean;
    get preCheckout(): PreCheckout | null;
    get isRead(): boolean;
    get read(): Read | null;
    get isDelivery(): boolean;
    get delivery(): Delivery | null;
    get isPayload(): boolean;
    get payload(): string | null;
    get isPolicyEnforcement(): boolean;
    get policyEnforcement(): PolicyEnforcement | null;
    get isAppRoles(): boolean;
    get appRoles(): AppRoles | null;
    get isStandby(): boolean;
    get isPassThreadControl(): boolean;
    get passThreadControl(): PassThreadControl | null;
    get isTakeThreadControl(): boolean;
    get takeThreadControl(): TakeThreadControl | null;
    get isRequestThreadControl(): boolean;
    get isRequestThreadControlFromPageInbox(): boolean;
    get requestThreadControl(): RequestThreadControl | null;
    get isFromCustomerChatPlugin(): boolean;
    get isReferral(): boolean;
    get referral(): Referral | null;
    get ref(): string | null;
    get pageId(): string | null;
    get isBrandedCamera(): boolean;
    get brandedCamera(): BrandedCamera | null;
    get isAccountLinking(): boolean;
    get accountLinking(): AccountLinking | null;
    get isReaction(): boolean;
    get reaction(): Reaction | null;
}
export {};
//# sourceMappingURL=MessengerEvent.d.ts.map