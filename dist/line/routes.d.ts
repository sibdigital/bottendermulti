import { Action, AnyContext } from '../types';
import { RoutePredicate } from '../router';
import LineContext from './LineContext';
declare type Route = <C extends AnyContext>(action: Action<LineContext, any>) => {
    predicate: RoutePredicate<C>;
    action: Action<LineContext, any>;
};
declare type Line = Route & {
    any: Route;
    message: Route;
    follow: Route;
    unfollow: Route;
    join: Route;
    leave: Route;
    memberJoined: Route;
    memberLeft: Route;
    postback: Route;
    beacon: Route & {
        enter: Route;
        banner: Route;
        stay: Route;
    };
    accountLink: Route;
    things: Route & {
        link: Route;
        unlink: Route;
        scenarioResult: Route;
    };
};
declare const line: Line;
export default line;
//# sourceMappingURL=routes.d.ts.map