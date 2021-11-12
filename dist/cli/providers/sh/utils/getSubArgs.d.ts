import { Options, Result, Spec } from 'arg';
declare const getSubArgs: <T extends Spec, R extends Spec>(argv: Result<R>, argsOptions: T, argOptions?: Options) => {
    _: string[];
} & { [K in keyof T]?: (T[K] extends import("arg").Handler<any> ? ReturnType<T[K]> : T[K] extends [import("arg").Handler<any>] ? ReturnType<T[K][0]>[] : never) | undefined; } & Pick<Result<R>, Exclude<keyof R, "_">>;
export default getSubArgs;
//# sourceMappingURL=getSubArgs.d.ts.map