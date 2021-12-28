export interface TerminalNewData {
    terminalWays: TerminalWay[],
    expenses: [
        {
            id: number,
            isSelected: boolean,
            text: string
        }
    ],
    transportTypeId: number,
    transportTypeText: string
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