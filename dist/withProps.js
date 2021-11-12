"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const partial_1 = __importDefault(require("lodash/partial"));
function withProps(action, props) {
    Object.freeze(props);
    const actionWithProps = partial_1.default(action, partial_1.default.placeholder, props);
    Object.defineProperty(actionWithProps, 'name', {
        value: action.name || 'Anonymous',
    });
    return actionWithProps;
}
exports.default = withProps;
//# sourceMappingURL=withProps.js.map