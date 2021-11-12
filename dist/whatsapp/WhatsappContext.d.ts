import Context from '../context/Context';
import TwilioClient from './TwilioClient';
import WhatsappEvent from './WhatsappEvent';
declare class WhatsappContext extends Context<TwilioClient, WhatsappEvent> {
    get platform(): 'whatsapp';
    sendText(text: string, options?: {
        maxPrice?: number;
        provideFeedback?: boolean;
        validityPeriod?: number;
        forceDelivery?: boolean;
        smartEncoded?: boolean;
        persistentAction?: string[];
        mediaUrl?: string[];
    }): Promise<any>;
}
export default WhatsappContext;
//# sourceMappingURL=WhatsappContext.d.ts.map