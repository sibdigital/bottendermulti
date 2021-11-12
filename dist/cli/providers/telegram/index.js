"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    title: 'Telegram',
    subcommands: new Set(['help', 'webhook']),
    get webhook() {
        return require('./webhook').default;
    },
    get help() {
        return require('./help').default;
    },
};
//# sourceMappingURL=index.js.map