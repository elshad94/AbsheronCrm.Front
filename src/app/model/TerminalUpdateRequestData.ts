export default interface TerminalUpdateRequestData {
    fullRefCode: string,
    emptyRefCode: string,
    notes: string,
    statusId?: 4 | 5,
    transportTypeId?: number,
    xidmetler:
        {
            nvNo: string,
            qaime: string,
            expenseId: number,
            qiymet: number,
            edv: number,
            miqdar: number
        }[],
    files?: [
        {
            fileId: number,
            nvNo: string
        }
    ]
}