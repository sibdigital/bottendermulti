import { Action, AnyContext } from '../types';
import { RoutePredicate } from '../router';
import WhatsappContext from './WhatsappContext';
declare type Route = <C extends AnyContext>(action: Action<WhatsappContext, any>) => {
    predicate: RoutePredicate<C>;
    action: Action<WhatsappContext, any>;
};
declare type Whatsapp = Route & {
    any: Route;
    message: Route;
    media: Route;
    received: Route;
    sent: Route;
    delivered: Route;
    read: Route;
};
declare const whatsapp: Whatsapp;
export default whatsapp;
//# sourceMappingURL=routes.d.ts.map