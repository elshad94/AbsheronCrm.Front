import { TerminalExpense } from './TerminalExpense';

export interface TerminalNewData {
    terminalWays: TerminalWay[],
    expenses: TerminalExpense[],
    transportTypeId: number,
    transportTypeText: string,
    customer: string,
    orderDate: Date
}

export interface TerminalNewDataRequest {
    // 1 - vaqon, 2 - konteynr
    nvNoTypeId: NvNoTypeId,
    vaqonIds?: number[],
    konteynrIds?: string[]
}

export type NvNoTypeId = 1 | 2

export interface TerminalWay {
    nvNo: string,
    qaimeNo?: string,
    yuk?: string,
    amount: number,
    isSelected?: boolean,
    expenseIds?: number[],
    id?: number,
    fullRefCode: string,
    emptyRefCode: string
}
