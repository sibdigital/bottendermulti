import { Event } from '../context/Event';
declare type UserSource = {
    type: 'user';
    userId: string;
};
declare type GroupSource = {
    type: 'group';
    groupId: string;
    userId?: string;
};
declare type RoomSource = {
    type: 'room';
    roomId: string;
    userId?: string;
};
declare type Source = UserSource | GroupSource | RoomSource;
declare type TextMessage = {
    id: string;
    type: 'text';
    text: string;
};
declare type ContentProviderLine = {
    type: 'line';
};
declare type ContentProviderExternal = {
    type: 'external';
    originalContentUrl: string;
    previewImageUrl?: string;
};
declare type ImageMessage = {
    id: string;
    type: 'image';
    contentProvider: ContentProviderLine | ContentProviderExternal;
};
declare type VideoMessage = {
    id: string;
    type: 'video';
    duration: number;
    contentProvider: ContentProviderLine | ContentProviderExternal;
};
declare type AudioMessage = {
    id: string;
    type: 'audio';
    duration: number;
    contentProvider: ContentProviderLine | ContentProviderExternal;
};
declare type FileMessage = {
    id: string;
    type: 'file';
    fileName: string;
    fileSize: number;
};
declare type LocationMessage = {
    id: string;
    type: 'location';
    title: string;
    address: string;
    latitude: number;
    longitude: number;
};
declare type StickerMessage = {
    id: string;
    type: 'sticker';
    packageId: string;
    stickerId: string;
};
declare type Message = TextMessage | ImageMessage | VideoMessage | AudioMessage | FileMessage | LocationMessage | StickerMessage;
declare type MessageEvent = {
    replyToken: string;
    type: 'message';
    mode: 'active' | 'standby';
    timestamp: number;
    source: Source;
    message: Message;
};
declare type FollowEvent = {
    replyToken: string;
    type: 'follow';
    mode: 'active' | 'standby';
    timestamp: number;
    source: Source;
};
declare type UnfollowEvent = {
    type: 'unfollow';
    mode: 'active' | 'standby';
    timestamp: number;
    source: Source;
};
declare type JoinEvent = {
    replyToken: string;
    type: 'join';
    mode: 'active' | 'standby';
    timestamp: number;
    source: GroupSource | RoomSource;
};
declare type LeaveEvent = {
    type: 'leave';
    mode: 'active' | 'standby';
    timestamp: number;
    source: GroupSource | RoomSource;
};
declare type MemberJoinedEvent = {
    replyToken: string;
    type: 'memberJoined';
    mode: 'active' | 'standby';
    timestamp: number;
    source: GroupSource | RoomSource;
    joined: {
        members: UserSource[];
    };
};
declare type MemberLeftEvent = {
    type: 'memberLeft';
    mode: 'active' | 'standby';
    timestamp: number;
    source: GroupSource | RoomSource;
    left: {
        members: UserSource[];
    };
};
declare type PostbackEvent = {
    replyToken: string;
    type: 'postback';
    mode: 'active' | 'standby';
    timestamp: number;
    source: Source;
    postback: Postback;
};
declare type PostbackParams = {
    date: string;
} | {
    time: string;
} | {
    datetime: string;
};
declare type Postback = {
    data: string;
    params?: PostbackParams;
};
declare type BeaconEvent = {
    replyToken: string;
    type: 'beacon';
    mode: 'active' | 'standby';
    timestamp: number;
    source: Source;
    beacon: Beacon;
};
declare type Beacon = {
    hwid: string;
    type: 'enter' | 'banner' | 'stay';
    dm?: string;
};
declare type AccountLinkEvent = {
    replyToken: string;
    type: 'accountLink';
    mode: 'active' | 'standby';
    timestamp: number;
    source: Source;
    link: AccountLink;
};
declare type AccountLink = {
    result: 'ok' | 'failed';
    nonce: string;
};
declare type ThingsEvent = {
    replyToken: string;
    type: 'things';
    mode: 'active' | 'standby';
    timestamp: number;
    source: Source;
    things: Things;
};
declare type Things = {
    deviceId: string;
    type: 'link' | 'unlink' | 'scenarioResult';
    result?: any;
};
declare type LineEventOptions = {
    destination?: string;
};
export declare type LineRawEvent = MessageEvent | FollowEvent | UnfollowEvent | JoinEvent | LeaveEvent | MemberJoinedEvent | MemberLeftEvent | PostbackEvent | BeaconEvent | AccountLinkEvent | ThingsEvent;
export default class LineEvent implements Event<LineRawEvent> {
    _rawEvent: LineRawEvent;
    _destination: string | undefined;
    constructor(rawEvent: LineRawEvent, options?: LineEventOptions);
    get rawEvent(): LineRawEvent;
    get destination(): string | null;
    get replyToken(): string | null;
    get source(): Source;
    get isMessage(): boolean;
    get message(): Message | null;
    get isText(): boolean;
    get text(): string | null;
    get isImage(): boolean;
    get image(): Message | null;
    get isVideo(): boolean;
    get video(): Message | null;
    get isAudio(): boolean;
    get audio(): Message | null;
    get isLocation(): boolean;
    get location(): Message | null;
    get isSticker(): boolean;
    get sticker(): Message | null;
    get isFollow(): boolean;
    get follow(): Source | null;
    get isUnfollow(): boolean;
    get unfollow(): Source | null;
    get isJoin(): boolean;
    get join(): Source | null;
    get isLeave(): boolean;
    get leave(): Source | null;
    get isPostback(): boolean;
    get postback(): Postback | null;
    get isPayload(): boolean;
    get payload(): string | null;
    get date(): string | null;
    get time(): string | null;
    get datetime(): string | null;
    get isBeacon(): boolean;
    get beacon(): Beacon | null;
    get isAccountLink(): boolean;
    get accountLink(): AccountLink | null;
    get isMemberJoined(): boolean;
    get memberJoined(): {
        members: UserSource[];
    } | null;
    get isMemberLeft(): boolean;
    get memberLeft(): {
        members: UserSource[];
    } | null;
    get isThings(): boolean;
    get isThingsLink(): boolean;
    get isThingsUnlink(): boolean;
    get isThingsScenarioResult(): boolean;
    get isDeviceLink(): boolean;
    get isDeviceUnlink(): boolean;
    get things(): Things | null;
}
export {};
//# sourceMappingURL=LineEvent.d.ts.map