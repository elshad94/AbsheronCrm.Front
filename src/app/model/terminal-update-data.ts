import { TerminalWay } from './terminal-new-data';
import { TerminalExpense } from './TerminalExpense';

export interface TerminalUpdateData {
    transportTypeId: number,
    terminalWays: TerminalWay[],
    expenses: TerminalExpense[]
}
