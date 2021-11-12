import { Action, AnyContext } from '../types';
import { RoutePredicate } from '../router';
import ViberContext from './ViberContext';
declare type Route = <C extends AnyContext>(action: Action<ViberContext, any>) => {
    predicate: RoutePredicate<C>;
    action: Action<ViberContext, any>;
};
declare type Viber = Route & {
    any: Route;
    message: Route;
    subscribed: Route;
    unsubscribed: Route;
    conversationStarted: Route;
    delivered: Route;
    seen: Route;
    failed: Route;
};
declare const viber: Viber;
export default viber;
//# sourceMappingURL=routes.d.ts.map