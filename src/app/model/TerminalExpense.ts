export interface TerminalExpense {
    id: number,
    isSelected: boolean,
    text: string,
    price?: number,
    eX_SVAT: number,
    isReadOnly?: boolean,
    checkCounter?: number
}
