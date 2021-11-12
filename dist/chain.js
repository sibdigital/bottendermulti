"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chain(actions) {
    if (!Array.isArray(actions))
        throw new TypeError('Chain stack must be an array!');
    for (const action of actions) {
        if (typeof action !== 'function')
            throw new TypeError('Chain must be composed of actions!');
    }
    return function Chain(context, props = {}) {
        const reversedAction = actions.slice().reverse();
        const boundActions = reversedAction.reduce((acc, curr) => {
            if (acc.length === 0) {
                return [
                    curr.bind(null, context, Object.assign({}, props)),
                ];
            }
            return [
                curr.bind(null, context, Object.assign(Object.assign({}, props), { next: acc[0] })),
                ...acc,
            ];
        }, []);
        return boundActions[0];
    };
}
exports.default = chain;
//# sourceMappingURL=chain.js.map