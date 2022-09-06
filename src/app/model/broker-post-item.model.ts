export interface BrokerPostItem {
  notes?:           string;
  orderStatusId:   number;
  transportTypeId: number;
  TransportNumber: string;
  pincode:string;
  brPaymentTypeId:number;
  brCustomsBorderOfficeId:number;
  brCustomsOfficeId:number;
  brWarehouse:string;
  freightAmount:number;
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



