import { Action, AnyContext } from '../types';
import { RoutePredicate } from '../router';
import TelegramContext from './TelegramContext';
declare type Route = <C extends AnyContext>(action: Action<TelegramContext, any>) => {
    predicate: RoutePredicate<C>;
    action: Action<TelegramContext, any>;
};
declare type Telegram = Route & {
    any: Route;
    message: Route;
    editedMessage: Route;
    channelPost: Route;
    editedChannelPost: Route;
    inlineQuery: Route;
    chosenInlineResult: Route;
    callbackQuery: Route;
    shippingQuery: Route;
    preCheckoutQuery: Route;
    poll: Route;
};
declare const telegram: Telegram;
export default telegram;
//# sourceMappingURL=routes.d.ts.map