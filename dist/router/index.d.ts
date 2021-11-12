import line from '../line/routes';
import messenger from '../messenger/routes';
import slack from '../slack/routes';
import telegram from '../telegram/routes';
import viber from '../viber/routes';
import whatsapp from '../whatsapp/routes';
import { Action, AnyContext, Props } from '../types';
declare type MatchPattern = string | Array<string> | RegExp;
declare type RoutePattern<C extends AnyContext> = '*' | RoutePredicate<C>;
export declare type RoutePredicate<C extends AnyContext> = (context: C) => boolean | Record<string, any> | Promise<boolean | Record<string, any>>;
declare type Route<C extends AnyContext, AC extends AnyContext = C> = {
    predicate: RoutePredicate<C>;
    action: Action<AC, any>;
};
declare function router<C extends AnyContext>(routes: Route<C, any>[]): (context: C, props?: Props<C>) => Promise<Action<C, any, {}> | (() => void | Action<any, {}, {}> | Promise<void | Action<any, {}, {}>>) | undefined>;
declare function route<C extends AnyContext, AC extends AnyContext = C>(pattern: RoutePattern<C>, action: Action<AC, any>): {
    predicate: RoutePredicate<C>;
    action: Action<AC, any, {}>;
};
declare function text<C extends AnyContext>(pattern: MatchPattern, action: Action<C, any>): {
    predicate: (context: C) => any;
    action: Action<C, any, {}>;
};
declare function payload<C extends AnyContext>(pattern: MatchPattern, action: Action<C, any>): {
    predicate: (context: C) => any;
    action: Action<C, any, {}>;
};
declare function platform<C extends AnyContext>(pattern: MatchPattern, action: Action<C, any>): {
    predicate: (context: C) => boolean;
    action: Action<C, any, {}>;
} | {
    predicate: (context: C) => RegExpExecArray | null;
    action: Action<C, any, {}>;
};
export default router;
export { router, route, text, payload, platform, line, messenger, slack, telegram, viber, whatsapp, };
//# sourceMappingURL=index.d.ts.map