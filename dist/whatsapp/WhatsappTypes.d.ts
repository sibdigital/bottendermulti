export declare type MessageReceivedCommon = {
    messageSid: string;
    smsMessageSid: string;
    smsSid: string;
    smsStatus: 'received';
    accountSid: string;
    from: string;
    to: string;
    body: string;
    numSegments: string;
    apiVersion: '2010-04-01';
    fromCity?: string;
    fromState?: string;
    fromZip?: string;
    fromCountry?: string;
    toCity?: string;
    toState?: string;
    toZip?: string;
    toCountry?: string;
};
export declare type TextMessageReceived = MessageReceivedCommon & {
    numMedia: '0';
};
export declare type MediaMessageReceived = MessageReceivedCommon & {
    numMedia: '1';
    mediaContentType0: string;
    mediaUrl0: string;
};
export declare type MessageReceived = TextMessageReceived | MediaMessageReceived;
export declare type MessageStatusCommon<S extends string> = {
    smsStatus: S;
    messageStatus: S;
    smsSid: string;
    channelToAddress: string;
    to: string;
    channelPrefix: 'whatsapp';
    messageSid: string;
    accountSid: string;
    from: string;
    apiVersion: '2010-04-01';
    channelInstallSid: string;
};
export declare type MessageSent = MessageStatusCommon<'sent'> & {
    structuredMessage: 'false';
};
export declare type MessageDelivered = MessageStatusCommon<'delivered'> & {
    eventType: 'DELIVERED';
};
export declare type MessageRead = MessageStatusCommon<'read'> & {
    eventType: 'READ';
};
export declare type WhatsappRawEvent = MessageReceived | MessageSent | MessageDelivered | MessageRead;
//# sourceMappingURL=WhatsappTypes.d.ts.map