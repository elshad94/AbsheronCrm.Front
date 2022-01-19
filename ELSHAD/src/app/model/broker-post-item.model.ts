export interface BrokerPostItem {
  notes?:           string;
  orderStatusId:   number;
  transportTypeId: number;
  TransportNumber:     string;
  expenses:        Expense[];
  fileDetails:     FileDetailItem[];
}

export interface Expense {
  id: number;
}

export interface FileDetailItem {
  fileId:    number;
  docTypeId: number;
}



