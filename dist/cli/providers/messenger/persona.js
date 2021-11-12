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
const cli_table3_1 = __importDefault(require("cli-table3"));
const chalk_1 = __importDefault(require("chalk"));
const invariant_1 = __importDefault(require("invariant"));
const messaging_api_messenger_1 = require("messaging-api-messenger");
const getChannelConfig_1 = __importDefault(require("../../../shared/getChannelConfig"));
const getSubArgs_1 = __importDefault(require("../sh/utils/getSubArgs"));
const types_1 = require("../../../types");
const log_1 = require("../../../shared/log");
const help = () => {
    console.log(`
  bottender messenger persona <command> [option]

  ${chalk_1.default.dim('Commands:')}

    list              List all personas.
    create            Create a new persona with name and profile picture URL.
    get               Get persona by persona ID.
    del, delete       Delete persona by persona ID.

  ${chalk_1.default.dim('Options:')}

    --name            Specify persona's name when create
    --pic             Specify persona's profile image URL when create
    --id              Specify persona's ID to get or delete

  ${chalk_1.default.dim('Examples:')}

  ${chalk_1.default.dim('-')} Create a new persona

    ${chalk_1.default.cyan('$ bottender messenger persona create --name <PERSONA_NAME> --pic <PROFILE_IMAGE_URL>')}

  ${chalk_1.default.dim('-')} Get persona by ID

    ${chalk_1.default.cyan('$ bottender messenger persona get --id <PERSONA_ID>')}

  ${chalk_1.default.dim('-')} Delete persona with specific access token

    ${chalk_1.default.cyan('$ bottender messenger persona delete --id <PERSONA_ID>')}
`);
};
function createPersona(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = getSubArgs_1.default(ctx.argv, {
            '--name': String,
            '--pic': String,
        });
        const personaName = argv['--name'];
        const personaUrl = argv['--pic'];
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Messenger);
            const { accessToken } = config;
            invariant_1.default(accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            invariant_1.default(personaName, '`name` is required but not found. Use --name <name> to specify persona name');
            invariant_1.default(personaUrl, '`pic` is required but not found. Use --pic <URL> to specify persona profile picture URL');
            const client = messaging_api_messenger_1.MessengerClient.connect({
                accessToken,
            });
            const persona = {
                name: personaName,
                profilePictureUrl: personaUrl,
            };
            const personaID = yield client.createPersona(persona);
            log_1.print(`Successfully create ${log_1.bold('persona')} ${log_1.bold(personaID.id)}`);
        }
        catch (err) {
            log_1.error(`Failed to create ${log_1.bold('persona')}`);
            if (err.response) {
                log_1.error(`status: ${log_1.bold(err.response.status)}`);
                if (err.response.data) {
                    log_1.error(`data: ${log_1.bold(JSON.stringify(err.response.data, null, 2))}`);
                }
            }
            else {
                log_1.error(err.message);
            }
            return process.exit(1);
        }
    });
}
exports.createPersona = createPersona;
function listPersona(_) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Messenger);
            const { accessToken } = config;
            invariant_1.default(accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            const client = messaging_api_messenger_1.MessengerClient.connect({
                accessToken,
            });
            const personas = yield client.getAllPersonas();
            if (personas.length !== 0) {
                log_1.print('Personas');
                const table = new cli_table3_1.default({
                    head: ['id', 'name', 'image URL'],
                    colWidths: [30, 30, 30],
                });
                personas.forEach(item => {
                    table.push([item.id, item.name, item.profilePictureUrl]);
                });
                console.log(table.toString());
            }
            else {
                log_1.print('No personas are found.');
            }
        }
        catch (err) {
            log_1.error(`Failed to list ${log_1.bold('personas')}`);
            if (err.response) {
                log_1.error(`status: ${log_1.bold(err.response.status)}`);
                if (err.response.data) {
                    log_1.error(`data: ${log_1.bold(JSON.stringify(err.response.data, null, 2))}`);
                }
            }
            else {
                log_1.error(err.message);
            }
            return process.exit(1);
        }
    });
}
exports.listPersona = listPersona;
function getPersona(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = getSubArgs_1.default(ctx.argv, {
            '--id': String,
        });
        const personaId = argv['--id'];
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Messenger);
            const { accessToken } = config;
            invariant_1.default(accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            invariant_1.default(personaId, '`id` is required but not found. Use --id <id> to specify persona id');
            const client = messaging_api_messenger_1.MessengerClient.connect({
                accessToken,
            });
            const persona = yield client.getPersona(personaId);
            if (persona !== undefined) {
                log_1.print(`Information of persona ${log_1.bold(personaId)}:`);
                log_1.print(`Name: ${log_1.bold(persona.name)}`);
                log_1.print(`Profile picture: ${log_1.bold(persona.profilePictureUrl)}`);
            }
            else {
                log_1.print(`Cannot get persona of ID ${log_1.bold(personaId)}`);
            }
        }
        catch (err) {
            log_1.error(`Failed to get ${log_1.bold('persona')} of ID ${log_1.bold(personaId)}`);
            if (err.response) {
                log_1.error(`status: ${log_1.bold(err.response.status)}`);
                if (err.response.data) {
                    log_1.error(`data: ${log_1.bold(JSON.stringify(err.response.data, null, 2))}`);
                }
            }
            else {
                log_1.error(err.message);
            }
            return process.exit(1);
        }
    });
}
exports.getPersona = getPersona;
function deletePersona(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = getSubArgs_1.default(ctx.argv, {
            '--id': String,
        });
        const personaId = argv['--id'];
        try {
            const config = getChannelConfig_1.default(types_1.Channel.Messenger);
            const { accessToken } = config;
            invariant_1.default(accessToken, '`accessToken` is not found in the `bottender.config.js` file');
            invariant_1.default(personaId, '`id` is required but not found. Use --id <id> to specify persona id');
            const client = messaging_api_messenger_1.MessengerClient.connect({
                accessToken,
            });
            const res = yield client.deletePersona(personaId);
            if (res.success === true || res.success === 'true') {
                log_1.print(`Sucessfully delete persona of ID ${log_1.bold(personaId)}`);
            }
            else {
                log_1.print(`Cannot get persona of ID ${log_1.bold(personaId)}`);
            }
        }
        catch (err) {
            log_1.error(`Failed to delete ${log_1.bold('persona')} of ID ${log_1.bold(personaId)}`);
            if (err.response) {
                log_1.error(`status: ${log_1.bold(err.response.status)}`);
                if (err.response.data) {
                    log_1.error(`data: ${log_1.bold(JSON.stringify(err.response.data, null, 2))}`);
                }
            }
            else {
                log_1.error(err.message);
            }
            return process.exit(1);
        }
    });
}
exports.deletePersona = deletePersona;
function main(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const subcommand = ctx.argv._[2];
        switch (subcommand) {
            case 'create':
                return createPersona(ctx);
            case 'list':
                return listPersona(ctx);
            case 'get':
                return getPersona(ctx);
            case 'delete':
            case 'del':
                return deletePersona(ctx);
            default:
                log_1.error(`Please specify a valid subcommand: create, list, get, delete`);
                help();
        }
    });
}
exports.default = main;
//# sourceMappingURL=persona.js.map