import { FileData } from './returnFileFileData';

export default interface TerminalUpdateRequestData {
    notes: string,
    statusId?: 4 | 5,
    transportTypeId?: number,
    xidmetler:
        {
            nvNo: string,
            expenseId: number,
            qiymet: number,
            edv: number,
            miqdar: number
        }[],
    files?: FileData[],
    total?: number
}
