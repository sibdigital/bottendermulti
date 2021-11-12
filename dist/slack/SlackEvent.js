"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pascal_case_1 = require("pascal-case");
class SlackEvent {
    constructor(rawEvent) {
        this._rawEvent = rawEvent;
    }
    get rawEvent() {
        return this._rawEvent;
    }
    get isMessage() {
        return this._rawEvent.type === 'message';
    }
    get isChannelsMessage() {
        if (!this.isMessage || !this.message)
            return false;
        const message = this.message;
        return message.channel.startsWith('C');
    }
    get isGroupsMessage() {
        if (!this.isMessage || !this.message)
            return false;
        const message = this.message;
        return message.channel.startsWith('G');
    }
    get isImMessage() {
        if (!this.isMessage || !this.message)
            return false;
        const message = this.message;
        return message.channel.startsWith('D');
    }
    get isMpimMessage() {
        if (!this.isMessage || !this.message)
            return false;
        const message = this.message;
        return message.channel.startsWith('G');
    }
    get message() {
        if (!this.isMessage)
            return null;
        const message = this._rawEvent;
        return message;
    }
    get isText() {
        return this.isMessage;
    }
    get text() {
        if (this.isText) {
            return this._rawEvent.text;
        }
        if (this.isCommand) {
            return this._rawEvent.text;
        }
        return null;
    }
    get isInteractiveMessage() {
        return this._rawEvent.type === 'interactive_message';
    }
    get isBlockAction() {
        return this._rawEvent.type === 'block_actions';
    }
    get isViewSubmission() {
        return this._rawEvent.type === 'view_submission';
    }
    get isViewClosed() {
        return this._rawEvent.type === 'view_closed';
    }
    get isBlockActionOrInteractiveMessage() {
        return this.isBlockAction || this.isInteractiveMessage;
    }
    get callbackId() {
        if (this.isBlockActionOrInteractiveMessage) {
            return this._rawEvent.callbackId;
        }
        return null;
    }
    get action() {
        if (this.isBlockActionOrInteractiveMessage) {
            return this._rawEvent.actions[0];
        }
        return null;
    }
    get isBotMessage() {
        return this._rawEvent.subtype === 'bot_message';
    }
    get isCommand() {
        return !!this._rawEvent.command;
    }
    get command() {
        return this._rawEvent.command || null;
    }
}
exports.default = SlackEvent;
const Events = [
    'app_uninstalled',
    'channel_archive',
    'channel_created',
    'channel_deleted',
    'channel_history_changed',
    'channel_rename',
    'channel_unarchive',
    'dnd_updated',
    'dnd_updated_user',
    'email_domain_changed',
    'emoji_changed',
    'file_change',
    'file_comment_added',
    'file_comment_deleted',
    'file_comment_edited',
    'file_created',
    'file_deleted',
    'file_public',
    'file_shared',
    'file_unshared',
    'grid_migration_finished',
    'grid_migration_started',
    'group_archive',
    'group_close',
    'group_history_changed',
    'group_open',
    'group_rename',
    'group_unarchive',
    'im_close',
    'im_created',
    'im_history_changed',
    'im_open',
    'link_shared',
    'member_joined_channel',
    'member_left_channel',
    'pin_added',
    'pin_removed',
    'reaction_added',
    'reaction_removed',
    'star_added',
    'star_removed',
    'subteam_created',
    'subteam_members_changed',
    'subteam_self_added',
    'subteam_self_removed',
    'subteam_updated',
    'team_domain_change',
    'team_join',
    'team_rename',
    'tokens_revoked',
    'url_verification',
    'user_change',
];
Events.forEach(event => {
    Object.defineProperty(SlackEvent.prototype, `is${pascal_case_1.pascalCase(event)}`, {
        enumerable: false,
        configurable: true,
        get() {
            return this._rawEvent.type === event;
        },
    });
});
//# sourceMappingURL=SlackEvent.js.map