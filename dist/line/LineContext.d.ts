/// <reference types="node" />
import { EventEmitter } from 'events';
import { LineClient, LineTypes } from 'messaging-api-line';
import Context from '../context/Context';
import Session from '../session/Session';
import { RequestContext } from '../types';
import LineEvent from './LineEvent';
declare type Options = {
    client: LineClient;
    event: LineEvent;
    session?: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
    customAccessToken?: string;
    shouldBatch?: boolean;
    sendMethod?: string;
    emitter?: EventEmitter | null;
};
declare class LineContext extends Context<LineClient, LineEvent> {
    _customAccessToken: string | null;
    _isReplied: boolean;
    _shouldBatch: boolean;
    _replyMessages: LineTypes.Message[];
    _pushMessages: LineTypes.Message[];
    _sendMethod: string;
    constructor({ client, event, session, initialState, requestContext, customAccessToken, shouldBatch, sendMethod, emitter, }: Options);
    get platform(): 'line';
    get accessToken(): string;
    useAccessToken(accessToken: string): void;
    get isReplied(): boolean;
    handlerDidEnd(): Promise<void>;
    typing(milliseconds: number): Promise<void>;
    getMessageContent(): Promise<Buffer> | undefined;
    leave(): Promise<any>;
    getUserProfile(): Promise<Record<string, any> | null>;
    getMemberProfile(userId: string): Promise<Record<string, any> | null>;
    getMemberIds(start: string): Promise<Record<string, any> | null>;
    getAllMemberIds(): Promise<string[] | null>;
    getLinkedRichMenu(): Promise<any>;
    linkRichMenu(richMenuId: string): Promise<any>;
    unlinkRichMenu(): Promise<any>;
    issueLinkToken(): Promise<any>;
    reply(messages: LineTypes.Message[], options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyText(text: string, options?: LineTypes.MessageOptions & {
        emojis?: LineTypes.Emoji[];
    }): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyImage(image: {
        originalContentUrl: string;
        previewImageUrl?: string;
    }, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyVideo(video: {
        originalContentUrl: string;
        previewImageUrl: string;
    }, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyAudio(audio: {
        originalContentUrl: string;
        duration: number;
    }, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyLocation(location: LineTypes.Location, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replySticker(sticker: Omit<LineTypes.StickerMessage, 'type'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyImagemap(altText: string, imagemap: Omit<LineTypes.ImagemapMessage, 'type' | 'altText'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyFlex(altText: string, flex: LineTypes.FlexContainer, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyTemplate(altText: string, template: LineTypes.Template, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyButtonTemplate(altText: string, buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyButtonsTemplate(altText: string, buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyConfirmTemplate(altText: string, confirmTemplate: Omit<LineTypes.ConfirmTemplate, 'type'>, options: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyCarouselTemplate(altText: string, columns: LineTypes.ColumnObject[], { imageAspectRatio, imageSize, ...options }?: {
        imageAspectRatio?: 'rectangle' | 'square';
        imageSize?: 'cover' | 'contain';
    } & LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    replyImageCarouselTemplate(altText: string, columns: LineTypes.ImageCarouselColumnObject[], options: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    push(messages: LineTypes.Message[], options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushText(text: string, options?: LineTypes.MessageOptions & {
        emojis?: LineTypes.Emoji[];
    }): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushImage(image: {
        originalContentUrl: string;
        previewImageUrl?: string;
    }, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushVideo(video: {
        originalContentUrl: string;
        previewImageUrl: string;
    }, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushAudio(audio: {
        originalContentUrl: string;
        duration: number;
    }, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushLocation(location: LineTypes.Location, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushSticker(sticker: Omit<LineTypes.StickerMessage, 'type'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushImagemap(altText: string, imagemap: Omit<LineTypes.ImagemapMessage, 'type' | 'altText'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushFlex(altText: string, flex: LineTypes.FlexContainer, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushTemplate(altText: string, template: LineTypes.Template, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushButtonTemplate(altText: string, buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushButtonsTemplate(altText: string, buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushConfirmTemplate(altText: string, confirmTemplate: Omit<LineTypes.ConfirmTemplate, 'type'>, options: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushCarouselTemplate(altText: string, columns: LineTypes.ColumnObject[], { imageAspectRatio, imageSize, ...options }?: {
        imageAspectRatio?: 'rectangle' | 'square';
        imageSize?: 'cover' | 'contain';
    } & LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    pushImageCarouselTemplate(altText: string, columns: LineTypes.ImageCarouselColumnObject[], options: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    send(messages: LineTypes.Message[], options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendText(text: string, options?: LineTypes.MessageOptions & {
        emojis?: LineTypes.Emoji[];
    }): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendImage(image: {
        originalContentUrl: string;
        previewImageUrl?: string;
    }, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendVideo(video: {
        originalContentUrl: string;
        previewImageUrl: string;
    }, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendAudio(audio: {
        originalContentUrl: string;
        duration: number;
    }, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendLocation(location: LineTypes.Location, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendSticker(sticker: Omit<LineTypes.StickerMessage, 'type'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendImagemap(altText: string, imagemap: Omit<LineTypes.ImagemapMessage, 'type' | 'altText'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendFlex(altText: string, flex: LineTypes.FlexContainer, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendTemplate(altText: string, template: LineTypes.Template, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendButtonTemplate(altText: string, buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendButtonsTemplate(altText: string, buttonTemplate: Omit<LineTypes.ButtonsTemplate, 'type'>, options?: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendConfirmTemplate(altText: string, confirmTemplate: Omit<LineTypes.ConfirmTemplate, 'type'>, options: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendCarouselTemplate(altText: string, columns: LineTypes.ColumnObject[], { imageAspectRatio, imageSize, ...options }?: {
        imageAspectRatio?: 'rectangle' | 'square';
        imageSize?: 'cover' | 'contain';
    } & LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
    sendImageCarouselTemplate(altText: string, columns: LineTypes.ImageCarouselColumnObject[], options: LineTypes.MessageOptions): Promise<LineTypes.MutationSuccessResponse> | undefined;
}
export default LineContext;
//# sourceMappingURL=LineContext.d.ts.map