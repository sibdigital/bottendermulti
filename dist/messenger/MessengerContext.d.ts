/// <reference types="node" />
import { EventEmitter } from 'events';
import { MessengerClient, MessengerTypes } from 'messaging-api-messenger';
import Context from '../context/Context';
import Session from '../session/Session';
import { RequestContext } from '../types';
import MessengerEvent from './MessengerEvent';
declare type Options = {
    appId?: string;
    client: MessengerClient;
    event: MessengerEvent;
    session?: Session;
    initialState?: Record<string, any>;
    requestContext?: RequestContext;
    customAccessToken?: string;
    batchQueue?: Record<string, any> | null;
    emitter?: EventEmitter;
};
declare class MessengerContext extends Context<MessengerClient, MessengerEvent> {
    _appId: string | null;
    _customAccessToken: string | null;
    _personaId: string | null;
    _batchQueue: Record<string, any> | null;
    constructor({ appId, client, event, session, initialState, requestContext, customAccessToken, batchQueue, emitter, }: Options);
    get platform(): 'messenger';
    get accessToken(): string | null;
    _callClientMethod(method: string, args: any[]): any;
    _getMethodOptions<O extends object>(options: O): {
        accessToken?: string;
    } & O;
    _getSenderActionMethodOptions<O extends object>(options: O): {
        accessToken?: string;
        personaId?: string;
    } & O;
    _getSendMethodOptions<O extends {
        tag?: MessengerTypes.MessageTag;
    }>(options: O): {
        accessToken?: string;
        personaId?: string;
        messagingType: MessengerTypes.MessagingType;
    } & O;
    usePersona(personaId: string): void;
    useAccessToken(accessToken: string): void;
    typing(milliseconds: number): Promise<void>;
    sendText(text: string, options?: MessengerTypes.SendOption): Promise<any>;
    getUserProfile(options: {
        fields?: MessengerTypes.UserProfileField[];
    }): Promise<MessengerTypes.User | null>;
    sendSenderAction(senderAction: MessengerTypes.SenderAction, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendSenderActionResponse | undefined>;
    typingOn(options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendSenderActionResponse | undefined>;
    typingOff(options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendSenderActionResponse | undefined>;
    markSeen(options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendSenderActionResponse | undefined>;
    passThreadControl(targetAppId: number, metadata?: string): Promise<any>;
    passThreadControlToPageInbox(metadata?: string): Promise<any>;
    takeThreadControl(metadata?: string): Promise<any>;
    requestThreadControl(metadata?: string): Promise<any>;
    getThreadOwner(): Promise<any>;
    isThreadOwner(): Promise<boolean>;
    associateLabel(labelId: number): Promise<any>;
    dissociateLabel(labelId: number): Promise<any>;
    getAssociatedLabels(): Promise<any>;
    sendMessage(message: MessengerTypes.Message, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendAttachment(attachment: MessengerTypes.Attachment, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendImage(image: string | MessengerTypes.FileData | MessengerTypes.MediaAttachmentPayload, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendAudio(audio: string | MessengerTypes.FileData | MessengerTypes.MediaAttachmentPayload, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendVideo(video: string | MessengerTypes.FileData | MessengerTypes.MediaAttachmentPayload, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendFile(file: string | MessengerTypes.FileData | MessengerTypes.MediaAttachmentPayload, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendTemplate(payload: MessengerTypes.TemplateAttachmentPayload, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendGenericTemplate(elements: MessengerTypes.TemplateElement[], options: {
        imageAspectRatio?: 'horizontal' | 'square';
    } & MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendButtonTemplate(text: string, buttons: MessengerTypes.TemplateButton[], options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendMediaTemplate(elements: MessengerTypes.MediaElement[], options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendReceiptTemplate(attrs: MessengerTypes.ReceiptAttributes, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendAirlineBoardingPassTemplate(attrs: MessengerTypes.AirlineBoardingPassAttributes, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendAirlineCheckinTemplate(attrs: MessengerTypes.AirlineCheckinAttributes, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendAirlineItineraryTemplate(attrs: MessengerTypes.AirlineItineraryAttributes, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendAirlineUpdateTemplate(attrs: MessengerTypes.AirlineUpdateAttributes, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
    sendOneTimeNotifReqTemplate(attrs: MessengerTypes.OneTimeNotifReqAttributes, options?: MessengerTypes.SendOption): Promise<MessengerTypes.SendMessageSuccessResponse | undefined>;
}
export default MessengerContext;
//# sourceMappingURL=MessengerContext.d.ts.map