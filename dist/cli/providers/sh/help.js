"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const help = () => {
    console.log(`
    bottender <command>

    ${chalk_1.default.dim('Commands:')}

      ${chalk_1.default.dim('Platform')}

        messenger   <command>   Manage your Messenger command
        telegram    <command>   Manage your Telegram command
        line        <command>   Manage your LINE command
        viber       <command>   Manage your Viber command

      ${chalk_1.default.dim('Global')}

        init                    Init a bot skeleton
        help                    Show this help

    ${chalk_1.default.dim('Examples:')}

    ${chalk_1.default.dim('-')} Init a bot

      ${chalk_1.default.cyan('$ bottender init')}

    ${chalk_1.default.dim('-')} Get the help

      ${chalk_1.default.cyan('$ bottender help')}
      ${chalk_1.default.cyan('$ bottender messenger help')}

    ${chalk_1.default.dim('-')} Manage the Messenger command

      ${chalk_1.default.cyan('$ bottender messenger webhook set')}
  `);
};
exports.default = help;
//# sourceMappingURL=help.js.map