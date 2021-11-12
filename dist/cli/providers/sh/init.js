"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const init = () => {
    const cp = child_process_1.default.exec('npx create-bottender-app');
    if (cp) {
        if (cp.stdout) {
            cp.stdout.on('data', console.log);
        }
        if (cp.stderr) {
            cp.stderr.on('data', console.log);
        }
        cp.on('exit', (code) => {
            process.exit(code);
        });
    }
};
exports.default = init;
//# sourceMappingURL=init.js.map