"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const help = () => {
    console.log(`
    bottender viber <command> <action> [options]

    ${chalk_1.default.dim('Commands:')}

      webhook   <action>    Manage webhook

    ${chalk_1.default.dim('Actions:')}

      set                   Set the property you request
      del, delete           Delete the webhook

    ${chalk_1.default.dim('Options:')}

      -w, --webhook         Webhook callback URL
      --ngrok-port          ngrok port(default: 4040)

    ${chalk_1.default.dim('Examples:')}

    ${chalk_1.default.dim('-')} Set viber webhook

      ${chalk_1.default.cyan('$ bottender viber webhook set -w http://example.com')}
  `);
};
exports.default = help;
//# sourceMappingURL=help.js.map