"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const help = () => {
    console.log(`
    bottender messenger <command> <action>

    ${chalk_1.default.dim('Commands:')}

      profile                 <action>    Manage Messenger profile
      webhook                 <action>    Manage webhook
      persona                 <action>    Manage persona

    ${chalk_1.default.dim('Actions:')}

      set           Set the property you request
      del, delete   Delete the property you request
      help          Show more detail usage for the command

    ${chalk_1.default.dim('Examples:')}

    ${chalk_1.default.dim('-')} Set the messenger profile

      ${chalk_1.default.cyan('$ bottender messenger profile set')}
  `);
};
exports.default = help;
//# sourceMappingURL=help.js.map