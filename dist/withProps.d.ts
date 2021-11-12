import { Action, AnyContext } from './types';
declare function withProps<C extends AnyContext, P extends Record<string, any>>(action: Action<C, P>, props: P): Action<C, any>;
export default withProps;
//# sourceMappingURL=withProps.d.ts.map