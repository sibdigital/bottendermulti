/// <reference types="node" />
import { EventEmitter } from 'events';
import { SlackOAuthClient, SlackTypes } from 'messaging-api-slack';
import Context from '../context/Context';
import Session from '../session/Session';
import { RequestContext } from '../types';
import SlackEvent from './SlackEvent';
declare type Options = {
    client: SlackOAuthClient;
    event: SlackEvent;
    session?: Session | null;
    initialState?: Record<string, any> | null;
    requestContext?: RequestContext;
    emitter?: EventEmitter | null;
};
export default class SlackContext extends Context<SlackOAuthClient, SlackEvent> {
    chat: {
        postMessage: (options: Omit<SlackTypes.PostMessageOptions, 'channel'>) => Promise<any>;
        postEphemeral: (options: Omit<Omit<SlackTypes.PostEphemeralOptions, 'channel'>, 'user'>) => Promise<any>;
        update: (options: SlackTypes.UpdateMessageOptions) => Promise<any>;
        delete: (options: Omit<SlackTypes.DeleteMessageOptions, 'channel'>) => Promise<any>;
        meMessage: (options: Omit<SlackTypes.MeMessageOptions, 'channel'>) => Promise<any>;
        getPermalink: (options: Omit<SlackTypes.GetPermalinkOptions, 'channel'>) => Promise<any>;
        scheduleMessage: (options: Omit<SlackTypes.ScheduleMessageOptions, 'channel'>) => Promise<any>;
        deleteScheduledMessage: (options: Omit<SlackTypes.DeleteScheduledMessageOptions, 'channel'>) => Promise<any>;
        scheduledMessages: {
            list: (options: SlackTypes.GetScheduledMessagesOptions) => Promise<any>;
        };
    };
    views: {
        open: (options: SlackTypes.OpenViewOptions) => Promise<any>;
        publish: (options: SlackTypes.PublishViewOptions) => Promise<any>;
        push: (options: SlackTypes.PushViewOptions) => Promise<any>;
        update: (options: SlackTypes.UpdateViewOptions) => Promise<any>;
    };
    constructor({ client, event, session, initialState, requestContext, emitter, }: Options);
    get platform(): 'slack';
    typing(milliseconds: number): Promise<void>;
    _getChannelIdFromSession(callerMethodName?: string): string | null;
    postMessage(message: {
        text?: string;
        attachments?: SlackTypes.Attachment[] | string;
        blocks?: SlackTypes.MessageBlock[] | string;
    } | string, options?: {}): Promise<any>;
    _postMessage(options: Omit<SlackTypes.PostMessageOptions, 'channel'>): Promise<any>;
    postEphemeral(message: {
        text?: string;
        attachments?: SlackTypes.Attachment[] | string;
        blocks?: SlackTypes.MessageBlock[] | string;
    } | string, options?: {}): Promise<any>;
    _postEphemeral(options: Omit<Omit<SlackTypes.PostEphemeralOptions, 'channel'>, 'user'>): Promise<any>;
    sendText(text: string): Promise<any>;
    _updateMessage(options: SlackTypes.UpdateMessageOptions): Promise<any>;
    _deleteMessage(options: Omit<SlackTypes.DeleteMessageOptions, 'channel'>): Promise<any>;
    _meMessage(options: Omit<SlackTypes.MeMessageOptions, 'channel'>): Promise<any>;
    _getPermalink(options: Omit<SlackTypes.GetPermalinkOptions, 'channel'>): Promise<any>;
    _scheduleMessage(options: Omit<SlackTypes.ScheduleMessageOptions, 'channel'>): Promise<any>;
    _deleteScheduledMessage(options: Omit<SlackTypes.DeleteScheduledMessageOptions, 'channel'>): Promise<any>;
    _getScheduledMessages(options: SlackTypes.GetScheduledMessagesOptions): Promise<any>;
    _openView(options: SlackTypes.OpenViewOptions): Promise<any>;
    _publishView(options: SlackTypes.PublishViewOptions): Promise<any>;
    _updateView(options: SlackTypes.UpdateViewOptions): Promise<any>;
    _pushView(options: SlackTypes.PushViewOptions): Promise<any>;
}
export {};
//# sourceMappingURL=SlackContext.d.ts.map