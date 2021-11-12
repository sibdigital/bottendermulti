import { MessengerTypes } from 'messaging-api-messenger';
import { CliContext } from '../..';
export declare const help: () => void;
export declare const trimDomain: (profile: MessengerTypes.MessengerProfile) => MessengerTypes.MessengerProfile;
export declare function getMessengerProfile(_: CliContext): Promise<void>;
export declare function setMessengerProfile(ctx: CliContext): Promise<void>;
export declare function deleteMessengerProfile(_: CliContext): Promise<void>;
export default function main(ctx: CliContext): Promise<void>;
//# sourceMappingURL=profile.d.ts.map