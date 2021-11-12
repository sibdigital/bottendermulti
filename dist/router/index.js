"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("../line/routes"));
exports.line = routes_1.default;
const routes_2 = __importDefault(require("../messenger/routes"));
exports.messenger = routes_2.default;
const routes_3 = __importDefault(require("../slack/routes"));
exports.slack = routes_3.default;
const routes_4 = __importDefault(require("../telegram/routes"));
exports.telegram = routes_4.default;
const routes_5 = __importDefault(require("../viber/routes"));
exports.viber = routes_5.default;
const routes_6 = __importDefault(require("../whatsapp/routes"));
exports.whatsapp = routes_6.default;
function router(routes) {
    return function Router(context, props = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const r of routes) {
                const match = yield r.predicate(context);
                if (match) {
                    const derivedProps = match && typeof match === 'object' ? match : {};
                    return r.action.bind(null, context, Object.assign(Object.assign({}, props), derivedProps));
                }
            }
            return props.next;
        });
    };
}
exports.router = router;
function route(pattern, action) {
    if (pattern === '*') {
        return {
            predicate: () => true,
            action,
        };
    }
    return {
        predicate: pattern,
        action,
    };
}
exports.route = route;
function text(pattern, action) {
    if (typeof pattern === 'string') {
        if (pattern === '*') {
            return {
                predicate: (context) => context.event.isText,
                action,
            };
        }
        return {
            predicate: (context) => context.event.text === pattern,
            action,
        };
    }
    if (pattern instanceof RegExp) {
        return {
            predicate: (context) => {
                const match = pattern.exec(context.event.text);
                return match
                    ? {
                        match,
                    }
                    : false;
            },
            action,
        };
    }
    if (Array.isArray(pattern)) {
        return {
            predicate: (context) => pattern.includes(context.event.text),
            action,
        };
    }
    return {
        predicate: () => false,
        action,
    };
}
exports.text = text;
function payload(pattern, action) {
    if (typeof pattern === 'string') {
        if (pattern === '*') {
            return {
                predicate: (context) => context.event.isPayload,
                action,
            };
        }
        return {
            predicate: (context) => context.event.payload === pattern,
            action,
        };
    }
    if (pattern instanceof RegExp) {
        return {
            predicate: (context) => {
                const match = pattern.exec(context.event.payload);
                return match
                    ? {
                        match,
                    }
                    : false;
            },
            action,
        };
    }
    if (Array.isArray(pattern)) {
        return {
            predicate: (context) => pattern.includes(context.event.payload),
            action,
        };
    }
    return {
        predicate: () => false,
        action,
    };
}
exports.payload = payload;
function platform(pattern, action) {
    if (typeof pattern === 'string') {
        if (pattern === '*') {
            return {
                predicate: () => true,
                action,
            };
        }
        return {
            predicate: (context) => context.platform === pattern,
            action,
        };
    }
    if (pattern instanceof RegExp) {
        return {
            predicate: (context) => {
                return pattern.exec(context.platform);
            },
            action,
        };
    }
    if (Array.isArray(pattern)) {
        return {
            predicate: (context) => pattern.includes(context.platform),
            action,
        };
    }
    return {
        predicate: () => false,
        action,
    };
}
exports.platform = platform;
exports.default = router;
//# sourceMappingURL=index.js.map