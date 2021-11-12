import arg from 'arg';
declare const getArgs: (argv: string[], argsOptions: arg.Spec, argOptions: arg.Options) => arg.Result<{
    '--help': BooleanConstructor;
    '-h': string;
    '--version': BooleanConstructor;
    '-v': string;
}>;
export default getArgs;
//# sourceMappingURL=getArgs.d.ts.map