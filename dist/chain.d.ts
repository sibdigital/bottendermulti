import { Action, AnyContext, Props } from './types';
declare function chain<C extends AnyContext>(actions: Action<C, any>[]): (context: C, props?: Props<C>) => Action<C, any, {}>;
export default chain;
//# sourceMappingURL=chain.d.ts.map