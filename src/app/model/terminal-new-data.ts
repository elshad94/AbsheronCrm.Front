export interface TerminalNewData {
    terminalWays: TerminalWay[],
    expenses: TerminalNewOrderExpense[],
    transportTypeId: number,
    transportTypeText: string
}

export interface TerminalNewOrderExpense {
    id: number,
    isSelected: boolean,
    text: string
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
    qaimeNo: string,
    yuk: string    
}