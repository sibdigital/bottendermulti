import { Event } from '../context/Event';
declare type TelegramUser = {
    id: number;
    firstName: string;
    lastName?: string;
    username?: string;
    languageCode?: string;
};
declare type Photo = {
    fileId: string;
    width: number;
    height: number;
}[];
declare type Audio = {
    fileId: string;
    width: number;
    height: number;
};
declare type Document = {
    fileId: string;
};
declare type Sticker = {
    fileId: string;
    width: number;
    height: number;
};
declare type Video = {
    fileId: string;
    width: number;
    height: number;
    duration: number;
};
declare type Voice = {
    fileId: string;
    duration: number;
};
declare type VideoNote = {
    fileId: string;
    length: number;
    duration: number;
};
declare type Contact = {
    phoneNumber: string;
    firstName: string;
};
declare type Location = {
    longitude: number;
    latitude: number;
};
declare type Venue = {
    location: Location;
    title: string;
    address: string;
};
declare type File = {
    fileId: string;
};
declare type Game = {
    title: string;
    description: string;
    photo: {
        fileId: string;
        width: number;
        height: number;
    }[];
};
declare type Message = {
    messageId: number;
    from: TelegramUser;
    chat: {
        id: number;
        firstName: string;
        lastName: string;
        type: 'private' | 'group';
    };
    date: number;
    text: string;
    entities: {
        type: 'bot_command';
        offset: number;
        length: number;
    }[];
    replyToMessage?: Message;
    photo?: Photo;
    game?: Game;
    audio?: Audio;
    document?: Document;
    sticker?: Sticker;
    video?: Video;
    voice?: Voice;
    videoNote?: VideoNote;
    contact?: Contact;
    location?: Location;
    venue?: Venue;
    file?: File;
};
declare type InlineQuery = {
    id: string;
    from: TelegramUser;
    location?: Location;
    query: string;
    offset: string;
};
declare type ChosenInlineResult = {
    resultId: string;
    from: TelegramUser;
    location?: Location;
    inlineMessageId?: string;
    query: string;
};
declare type CallbackQuery = {
    from: TelegramUser;
    message: Message;
    chatInstance: string;
    data: string;
};
declare type ShippingAddress = {
    countryCode: string;
    state: string;
    city: string;
    streetLine1: string;
    streetLine2: string;
    postCode: string;
};
declare type ShippingQuery = {
    id: string;
    from: TelegramUser;
    invoicePayload: string;
    shippingAddress: ShippingAddress;
};
declare type OrderInfo = {
    name?: string;
    phoneNumber?: string;
    email?: string;
    shippingAddress?: ShippingAddress;
};
declare type PreCheckoutQuery = {
    id: string;
    from: TelegramUser;
    currency: string;
    totalAmount: number;
    invoicePayload: string;
    shippingOptionId?: string;
    orderInfo?: OrderInfo;
};
declare type PollOption = {
    text: string;
    voterCount: number;
};
declare type Poll = {
    id: string;
    question: string;
    options: PollOption[];
    isClosed: boolean;
};
export declare type TelegramRawEvent = {
    updateId: number;
    message?: Message;
    editedMessage?: Message;
    channelPost?: Message;
    editedChannelPost?: Message;
    inlineQuery?: InlineQuery;
    chosenInlineResult?: ChosenInlineResult;
    callbackQuery?: CallbackQuery;
    shippingQuery?: ShippingQuery;
    preCheckoutQuery?: PreCheckoutQuery;
    poll?: Poll;
};
export default class TelegramEvent implements Event<TelegramRawEvent> {
    _rawEvent: TelegramRawEvent;
    constructor(rawEvent: TelegramRawEvent);
    get rawEvent(): TelegramRawEvent;
    get isMessage(): boolean;
    get message(): Message | null;
    get isText(): boolean;
    get text(): string | null;
    get isReplyToMessage(): boolean;
    get replyToMessage(): Message | null;
    get isAudio(): boolean;
    get audio(): Audio | null;
    get isDocument(): boolean;
    get document(): Document | null;
    get isGame(): boolean;
    get game(): Game | null;
    get isPhoto(): boolean;
    get photo(): Photo | null;
    get isSticker(): boolean;
    get sticker(): Sticker | null;
    get isVideo(): boolean;
    get video(): Video | null;
    get isVoice(): boolean;
    get voice(): Voice | null;
    get isVideoNote(): boolean;
    get videoNote(): VideoNote | null;
    get isContact(): boolean;
    get contact(): Contact | null;
    get isLocation(): boolean;
    get location(): Location | null;
    get isVenue(): boolean;
    get venue(): Venue | null;
    get isEditedMessage(): boolean;
    get editedMessage(): Message | null;
    get isChannelPost(): boolean;
    get channelPost(): Message | null;
    get isEditedChannelPost(): boolean;
    get editedChannelPost(): Message | null;
    get isInlineQuery(): boolean;
    get inlineQuery(): InlineQuery | null;
    get isChosenInlineResult(): boolean;
    get chosenInlineResult(): ChosenInlineResult | null;
    get isCallbackQuery(): boolean;
    get callbackQuery(): CallbackQuery | null;
    get isPayload(): boolean;
    get payload(): string | null;
    get isShippingQuery(): boolean;
    get shippingQuery(): ShippingQuery | null;
    get isPreCheckoutQuery(): boolean;
    get preCheckoutQuery(): PreCheckoutQuery | null;
    get isPoll(): boolean;
    get poll(): Poll | null;
}
export {};
//# sourceMappingURL=TelegramEvent.d.ts.map