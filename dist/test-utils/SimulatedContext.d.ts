import Context from '../context/Context';
import { Client, Event } from '../types';
export default class SimulatedContext<C extends Client, E extends Event> extends Context<C, E> {
    _platform: string;
    constructor(options: any);
    get platform(): string;
    sendText(): void;
}
//# sourceMappingURL=SimulatedContext.d.ts.map