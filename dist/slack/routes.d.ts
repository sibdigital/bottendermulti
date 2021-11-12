import { Action, AnyContext } from '../types';
import { RoutePredicate } from '../router';
import SlackContext from './SlackContext';
import { EventTypes, InteractionTypes } from './SlackEvent';
declare type Route = <C extends AnyContext>(action: Action<SlackContext, any>) => {
    predicate: RoutePredicate<C>;
    action: Action<SlackContext, any>;
};
declare type Slack = Route & {
    any: Route;
    message: Route;
    event: <C extends AnyContext>(eventType: EventTypes | InteractionTypes, action: Action<SlackContext, any>) => {
        predicate: RoutePredicate<C>;
        action: Action<SlackContext, any>;
    };
    command: <C extends AnyContext>(commandText: string, action: Action<SlackContext, any>) => {
        predicate: RoutePredicate<C>;
        action: Action<SlackContext, any>;
    };
};
declare const slack: Slack;
export default slack;
//# sourceMappingURL=routes.d.ts.map