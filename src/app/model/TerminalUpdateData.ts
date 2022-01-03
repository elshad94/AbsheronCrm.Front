import { TerminalExpense } from './TerminalExpense';

export interface TerminalXidmet {
  orderTerminalId: number,
  expenseId: number,
  miqdar: number,
  qiymet: number,
  cemi: number,
  edv: number,
  cemiEdvle: number,
  nvNo: string
}

export interface TerminalFile {
  id: number,
  nvNo: string,
  uri: string
}

export interface TerminalDataForUpdate {
  xidmetler: TerminalXidmet[],
  transPortTypeId: number,
  fullRefCode: string,
  emptyRefCode: string,
  endTotal: number,
  total: number,
  notes: string,
  expenses: TerminalExpense[],
  filelar: TerminalFile[],
  customer: string,
  orderDate: Date,
  orderNo: string
}
