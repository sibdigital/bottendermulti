import { Action, AnyContext } from '../types';
import { RoutePredicate } from '../router';
import MessengerContext from './MessengerContext';
declare type Route = <C extends AnyContext>(action: Action<MessengerContext, any>) => {
    predicate: RoutePredicate<C>;
    action: Action<MessengerContext, any>;
};
declare type Messenger = Route & {
    any: Route;
    message: Route;
    accountLinking: Route & {
        linked: Route;
        unlinked: Route;
    };
    checkoutUpdate: Route;
    delivery: Route;
    echo: Route;
    gamePlay: Route;
    passThreadControl: Route;
    takeThreadControl: Route;
    requestThreadControl: Route;
    appRoles: Route;
    optin: Route;
    payment: Route;
    policyEnforcement: Route;
    postback: Route;
    preCheckout: Route;
    read: Route;
    referral: Route;
    standby: Route;
    reaction: Route & {
        react: Route;
        unreact: Route;
    };
};
declare const messenger: Messenger;
export default messenger;
//# sourceMappingURL=routes.d.ts.map