import { ViberClient, ViberTypes } from 'messaging-api-viber';
import Context from '../context/Context';
import ViberEvent from './ViberEvent';
declare class ViberContext extends Context<ViberClient, ViberEvent> {
    get platform(): 'viber';
    typing(milliseconds: number): Promise<void>;
    sendText(text: string, options?: ViberTypes.MessageOptions): Promise<any>;
    getUserDetails(): Promise<ViberTypes.UserDetails | null>;
    getOnlineStatus(): Promise<ViberTypes.UserOnlineStatus | null>;
    sendMessage(message: ViberTypes.Message): Promise<any>;
    sendPicture(picture: ViberTypes.Picture, options?: ViberTypes.MessageOptions): Promise<any>;
    sendVideo(video: ViberTypes.Video, options?: ViberTypes.MessageOptions): Promise<any>;
    sendFile(file: ViberTypes.File, options?: ViberTypes.MessageOptions): Promise<any>;
    sendContact(contact: ViberTypes.Contact, options?: ViberTypes.MessageOptions): Promise<any>;
    sendLocation(location: ViberTypes.Location, options?: ViberTypes.MessageOptions): Promise<any>;
    sendURL(url: string, options?: ViberTypes.MessageOptions): Promise<any>;
    sendSticker(stickerId: number, options?: ViberTypes.MessageOptions): Promise<any>;
    sendCarouselContent(richMedia: ViberTypes.RichMedia, options?: ViberTypes.MessageOptions): Promise<any>;
}
export default ViberContext;
//# sourceMappingURL=ViberContext.d.ts.map