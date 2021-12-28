import { TerminalWay } from './terminal-new-data';
import { TerminalExpense } from './TerminalExpense';

export interface TerminalUpdateData {
    terminalWays: TerminalWay[],
    expenses: TerminalExpense[]
}