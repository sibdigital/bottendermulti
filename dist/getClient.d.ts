import { LineClient } from 'messaging-api-line';
import { MessengerClient } from 'messaging-api-messenger';
import { SlackOAuthClient } from 'messaging-api-slack';
import { TelegramClient } from 'messaging-api-telegram';
import { ViberClient } from 'messaging-api-viber';
import TwilioClient from './whatsapp/TwilioClient';
declare function getClient<C extends string>(channel: C): C extends 'messenger' ? MessengerClient : C extends 'line' ? LineClient : C extends 'slack' ? SlackOAuthClient : C extends 'telegram' ? TelegramClient : C extends 'viber' ? ViberClient : C extends 'whatsapp' ? TwilioClient : any;
export default getClient;
//# sourceMappingURL=getClient.d.ts.map