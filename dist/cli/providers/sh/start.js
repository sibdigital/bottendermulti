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
const initializeServer_1 = __importDefault(require("../../../initializeServer"));
const getSubArgs_1 = __importDefault(require("./utils/getSubArgs"));
const start = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const argv = getSubArgs_1.default(ctx.argv, {
        '--console': Boolean,
        '--port': Number,
        '-c': '--console',
        '-p': '--port',
    });
    const isConsole = argv['--console'] || false;
    const port = argv['--port'] || process.env.PORT || 5000;
    const server = initializeServer_1.default({ isConsole });
    if (server) {
        server.listen(port, () => {
            console.log(`server is running on ${port} port...`);
        });
    }
});
exports.default = start;
//# sourceMappingURL=start.js.map